import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import { colors, spacing } from '../../theme';

export default function HistoryScreen({ navigation }) {
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    async function fetchHistory() {
        try {
            console.log("--- BUSCANDO HISTÓRICO ---");
            const response = await api.get('/selfassessments/my?pageNumber=1&pageSize=20');

            console.log("STATUS:", response.status);
            if (Array.isArray(response.data)) {
                console.log("Formato detectado: Array Direto");
                setAssessments(response.data);
            }
            else if (response.data && Array.isArray(response.data.data)) {
                console.log("Formato detectado: Paginado (.data)");
                setAssessments(response.data.data);
            }
            else if (response.data && Array.isArray(response.data.items)) {
                console.log("Formato detectado: Paginado (.items)");
                setAssessments(response.data.items);
            }
            else {
                console.log("AVISO: Formato de lista não identificado. Verifique o log acima.");
                setAssessments([]);
            }

        } catch (error) {
            console.log('Erro ao buscar histórico:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchHistory();
        }, [])
    );

    const getMoodIcon = (mood) => {
        const icons = {
            1: 'thunderstorm-outline',
            2: 'rainy-outline',
            3: 'cloud-outline',
            4: 'partly-sunny-outline',
            5: 'sunny'
        };
        return icons[mood] || 'help-circle-outline';
    };

    const getMoodColor = (mood) => {
        if (mood <= 2) return colors.neutral;
        if (mood === 3) return colors.primary;
        return '#F39C12';
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('AssessmentDetails', { assessment: item })}
        >
            <View style={styles.cardHeader}>
                <View style={styles.dateContainer}>
                    <Ionicons name="calendar-outline" size={16} color={colors.neutral} />
                    <Text style={styles.dateText}>
                        {new Date(item.createdAt).toLocaleDateString('pt-BR', {
                            day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                        })}
                    </Text>
                </View>
                <Ionicons
                    name={getMoodIcon(item.mood)}
                    size={32}
                    color={getMoodColor(item.mood)}
                />
            </View>
            <View style={styles.divider} />
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Estresse</Text>
                    <View style={[styles.badge, item.stress > 3 && styles.badgeAlert]}>
                        <Text style={[styles.badgeText, item.stress > 3 && styles.badgeTextAlert]}>{item.stress}/5</Text>
                    </View>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Carga</Text>
                    <View style={[styles.badge, item.workload > 3 && styles.badgeAlert]}>
                        <Text style={[styles.badgeText, item.workload > 3 && styles.badgeTextAlert]}>{item.workload}/5</Text>
                    </View>
                </View>
            </View>
            {item.notes && (
                <Text style={styles.notes} numberOfLines={1}>
                    "{item.notes}"
                </Text>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={assessments}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchHistory(); }} />
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Ionicons name="file-tray-outline" size={60} color="#CCC" />
                            <Text style={styles.emptyText}>Nenhuma avaliação encontrada.</Text>
                            <Text style={styles.emptySubText}>Puxe para atualizar ou crie uma nova.</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    listContent: { padding: spacing.medium },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: spacing.medium,
        marginBottom: spacing.medium,
        elevation: 2,
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    dateContainer: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    dateText: { color: colors.neutral, fontSize: 14 },
    divider: { height: 1, backgroundColor: '#EEE', marginVertical: 8 },
    statsContainer: { flexDirection: 'row', gap: 20, marginBottom: 8 },
    statItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    statLabel: { fontSize: 14, color: colors.text, fontWeight: '600' },
    badge: { backgroundColor: '#E0E0E0', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
    badgeAlert: { backgroundColor: '#FADBD8' },
    badgeText: { fontSize: 12, fontWeight: 'bold', color: colors.text },
    badgeTextAlert: { color: colors.error },
    notes: { fontStyle: 'italic', color: colors.neutral, fontSize: 13, marginTop: 5 },
    emptyContainer: { alignItems: 'center', marginTop: 50 },
    emptyText: { marginTop: 10, color: colors.neutral, fontSize: 16, fontWeight: 'bold' },
    emptySubText: { color: colors.neutral, fontSize: 14 },
});