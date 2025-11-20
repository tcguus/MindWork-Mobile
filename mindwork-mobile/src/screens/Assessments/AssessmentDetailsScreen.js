import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../theme';
import api from '../../services/api';

export default function AssessmentDetailsScreen({ route, navigation }) {
    const { assessment } = route.params;
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        Alert.alert(
            'Excluir Avaliação',
            'Tem certeza que deseja remover este registro? Essa ação não pode ser desfeita.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        setLoading(true);
                        try {
                            await api.delete(`/selfassessments/${assessment.id}`);
                            Alert.alert('Sucesso', 'Registro removido.');
                            navigation.goBack();
                        } catch (error) {
                            console.log(error);
                            Alert.alert('Erro', 'Não foi possível excluir.');
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    }

    function handleEdit() {
        navigation.navigate('NewAssessment', { assessmentData: assessment });
    }

    const getMoodIcon = (mood) => {
        const icons = {
            1: 'thunderstorm-outline',
            2: 'rainy-outline',
            3: 'cloud-outline',
            4: 'partly-sunny-outline',
            5: 'sunny'
        };
        return icons[mood];
    };

    const getMoodLabel = (mood) => {
        const labels = {
            1: 'Péssimo (Tempestade)',
            2: 'Ruim (Chuvoso)',
            3: 'Neutro (Nublado)',
            4: 'Bom (Parcialmente Ensolarado)',
            5: 'Excelente (Ensolarado)'
        };
        return labels[mood];
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Ionicons name="calendar" size={20} color={colors.neutral} />
                <Text style={styles.dateText}>
                    {new Date(assessment.createdAt).toLocaleDateString('pt-BR', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                </Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Humor Registrado</Text>
                <View style={styles.moodContainer}>
                    <Ionicons name={getMoodIcon(assessment.mood)} size={60} color={colors.primary} />
                    <Text style={styles.moodLabel}>{getMoodLabel(assessment.mood)}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={[styles.card, styles.halfCard]}>
                    <Text style={styles.cardTitle}>Estresse</Text>
                    <View style={[styles.circle, assessment.stress > 3 && styles.circleAlert]}>
                        <Text style={[styles.circleText, assessment.stress > 3 && styles.textAlert]}>
                            {assessment.stress}
                        </Text>
                    </View>
                    <Text style={styles.legend}>Nível 1 a 5</Text>
                </View>
                <View style={[styles.card, styles.halfCard]}>
                    <Text style={styles.cardTitle}>Carga</Text>
                    <View style={[styles.circle, assessment.workload > 3 && styles.circleAlert]}>
                        <Text style={[styles.circleText, assessment.workload > 3 && styles.textAlert]}>
                            {assessment.workload}
                        </Text>
                    </View>
                    <Text style={styles.legend}>Nível 1 a 5</Text>
                </View>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Anotações</Text>
                <Text style={styles.notesText}>
                    {assessment.notes ? assessment.notes : 'Nenhuma observação registrada.'}
                </Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                    <Ionicons name="create-outline" size={20} color={colors.background} />
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color={colors.white} />
                    ) : (
                        <>
                            <Ionicons name="trash-outline" size={20} color={colors.background} />
                            <Text style={styles.buttonText}>Excluir</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: spacing.large, backgroundColor: colors.background, paddingBottom: 40 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.large, gap: 8 },
    dateText: { fontSize: 16, color: colors.neutral, textTransform: 'capitalize' },
    card: { backgroundColor: colors.surface, borderRadius: 12, padding: spacing.medium, marginBottom: spacing.medium, elevation: 2 },
    cardTitle: { fontSize: 14, color: colors.neutral, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase' },
    moodContainer: { alignItems: 'center', gap: 10 },
    moodLabel: { fontSize: 18, fontWeight: 'bold', color: colors.primary, textAlign: 'center' },
    row: { flexDirection: 'row', gap: spacing.medium },
    halfCard: { flex: 1, alignItems: 'center' },
    circle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' },
    circleAlert: { backgroundColor: '#FADBD8' },
    circleText: { fontSize: 24, fontWeight: 'bold', color: colors.text },
    textAlert: { color: colors.error },
    legend: { fontSize: 12, color: colors.neutral, marginTop: 5 },
    notesText: { fontSize: 16, color: colors.text, fontStyle: 'italic', lineHeight: 24 },
    footer: { flexDirection: 'row', gap: spacing.medium, marginTop: spacing.medium },
    editButton: { flex: 1, backgroundColor: colors.primary, padding: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
    deleteButton: { flex: 1, backgroundColor: colors.error, padding: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
    buttonText: { color: colors.background, fontWeight: 'bold', fontSize: 16 }
});