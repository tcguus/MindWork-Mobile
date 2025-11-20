import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    ActivityIndicator
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../theme';
import api from '../../services/api';

export default function NewAssessmentScreen({ navigation, route }) {
    const [mood, setMood] = useState(3);
    const [stress, setStress] = useState(3);
    const [workload, setWorkload] = useState(3);
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useFocusEffect(
        useCallback(() => {
            const assessmentData = route.params?.assessmentData;

            if (assessmentData) {
                setIsEditing(true);
                setCurrentId(assessmentData.id);
                setMood(assessmentData.mood);
                setStress(assessmentData.stress);
                setWorkload(assessmentData.workload);
                setNotes(assessmentData.notes || '');
                navigation.setOptions({ title: 'Editar Avaliação' });
            } else {
                setIsEditing(false);
                setCurrentId(null);
                setMood(3);
                setStress(3);
                setWorkload(3);
                setNotes('');
                navigation.setOptions({ title: 'Nova Avaliação' });
            }

            return () => {
                navigation.setParams({ assessmentData: null });
            };

        }, [route.params?.assessmentData])
    );

    const moodIconsMap = {
        1: 'thunderstorm-outline', 2: 'rainy-outline', 3: 'cloud-outline', 4: 'partly-sunny-outline', 5: 'sunny',
    };

    const moodColorsMap = {
        1: '#4A4A4A', 2: '#5A84B0', 3: colors.neutral, 4: '#F1C40F', 5: '#F39C12'
    };

    async function handleSave() {
        setLoading(true);
        try {
            const payload = { mood, stress, workload, notes };

            if (isEditing && currentId) {
                await api.put(`/selfassessments/${currentId}`, payload);
                Alert.alert('Sucesso', 'Registro atualizado!', [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('History')
                    }
                ]);
            } else {
                await api.post('/selfassessments', payload);
                Alert.alert('Sucesso', 'Registro criado!', [
                    { text: 'OK', onPress: () => navigation.navigate('History') }
                ]);
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Não foi possível salvar.');
        } finally {
            setLoading(false);
        }
    }

    const getCircleColor = (option) => {
        if (option === 5) return colors.error;
        if (option === 4) return '#F39C12';
        return colors.primary;
    };

    const RatingSelector = ({ value, onChange, type }) => {
        const options = [1, 2, 3, 4, 5];
        return (
            <View style={styles.ratingContainer}>
                {options.map((option) => {
                    const isSelected = value === option;

                    if (type === 'mood') {
                        const iconName = moodIconsMap[option];
                        const iconColor = isSelected ? moodColorsMap[option] : '#CCC';
                        return (
                            <TouchableOpacity key={option} onPress={() => onChange(option)} style={[styles.moodButton, isSelected && styles.moodButtonSelected]}>
                                <Ionicons name={iconName} size={32} color={iconColor} />
                            </TouchableOpacity>
                        );
                    }

                    return (
                        <TouchableOpacity key={option} onPress={() => onChange(option)}
                            style={[styles.circleButton, isSelected && styles.circleSelected, isSelected && { backgroundColor: getCircleColor(option) }]}>
                            <Text style={[styles.circleText, isSelected && styles.textSelected]}>{option}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.headerTitle}>
                {isEditing ? 'Editar Registro' : 'Como foi seu dia?'}
            </Text>
            <Text style={styles.headerSubtitle}>
                {isEditing ? 'Altere os dados abaixo.' : 'Registre seus indicadores.'}
            </Text>
            <View style={styles.card}>
                <Text style={styles.label}>Humor</Text>
                <RatingSelector value={mood} onChange={setMood} type="mood" />
            </View>
            <View style={styles.card}>
                <Text style={styles.label}>Estresse</Text>
                <RatingSelector value={stress} onChange={setStress} type="stress" />
            </View>
            <View style={styles.card}>
                <Text style={styles.label}>Carga</Text>
                <RatingSelector value={workload} onChange={setWorkload} type="workload" />
            </View>
            <View style={styles.card}>
                <Text style={styles.label}>Anotações</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Observações..."
                    placeholderTextColor={colors.placeholder}
                    multiline
                    numberOfLines={4}
                    value={notes}
                    onChangeText={setNotes}
                />
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color={colors.secondary} />
                ) : (
                    <Text style={styles.saveButtonText}>
                        {isEditing ? 'ATUALIZAR REGISTRO' : 'SALVAR REGISTRO'}
                    </Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: spacing.large, paddingBottom: 50, backgroundColor: colors.background },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: colors.primary, marginBottom: 5 },
    headerSubtitle: { fontSize: 14, color: colors.neutral, marginBottom: spacing.large },
    card: { backgroundColor: colors.surface, padding: spacing.medium, borderRadius: 12, marginBottom: spacing.medium, elevation: 2 },
    label: { fontSize: 16, fontWeight: 'bold', color: colors.primary, marginBottom: 10 },
    ratingContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
    moodButton: { padding: 8, borderRadius: 8 },
    moodButtonSelected: { backgroundColor: '#F0F0F0' },
    circleButton: { width: 45, height: 45, borderRadius: 22.5, borderWidth: 2, borderColor: '#DDD', justifyContent: 'center', alignItems: 'center' },
    circleSelected: { borderColor: colors.primary },
    circleText: { fontSize: 18, fontWeight: 'bold', color: colors.neutral },
    textSelected: { color: colors.background },
    input: { backgroundColor: colors.background, borderRadius: 8, padding: 10, marginTop: 10, height: 100, textAlignVertical: 'top', borderWidth: 1, borderColor: '#EEE' },
    saveButton: { backgroundColor: colors.primary, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
    saveButtonText: { color: colors.secondary, fontWeight: 'bold', fontSize: 16 },
});