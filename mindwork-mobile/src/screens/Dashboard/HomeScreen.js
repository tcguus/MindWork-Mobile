import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { colors, spacing } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
    const { authData } = useAuth();
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    async function fetchDashboardData() {
        try {
            const response = await api.get('/ai/recommendations/me');
            setRecommendations(response.data);
        } catch (error) {
            console.log('Erro ao buscar recomendações:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchDashboardData();
        }, [])
    );

    const onRefresh = () => {
        setRefreshing(true);
        fetchDashboardData();
    };

    const firstName = authData?.user?.fullName?.split(' ')[0] || 'Colaborador';

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
                }
            >
                <View style={styles.header}>
                    <Text style={styles.greeting}>Olá, {firstName}!</Text>
                    <Text style={styles.date}>{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</Text>
                </View>
                <View style={styles.actionCard}>
                    <View>
                        <Text style={styles.actionTitle}>Como você está?</Text>
                        <Text style={styles.actionSubtitle}>Faça seu check-in diário.</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('NewAssessment')}
                    >
                        <Text style={styles.actionButtonText}>Avaliar</Text>
                        <Ionicons name="arrow-forward" size={20} color={colors.primary} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionTitle}>Dicas para você</Text>

                {loading ? (
                    <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
                ) : (
                    <View>
                        {recommendations.length > 0 ? (
                            recommendations.map((rec, index) => (
                                <View key={index} style={styles.recommendationCard}>
                                    <View style={styles.recHeader}>
                                        <Ionicons name="bulb-outline" size={24} color={colors.accent} />
                                        <Text style={styles.recCategory}>{rec.category || 'Sugestão'}</Text>
                                    </View>
                                    <Text style={styles.recTitle}>{rec.title}</Text>
                                    <Text style={styles.recDescription}>{rec.description}</Text>
                                </View>
                            ))
                        ) : (
                            <View style={styles.emptyState}>
                                <Ionicons name="happy-outline" size={48} color={colors.neutral} />
                                <Text style={styles.emptyText}>Tudo tranquilo por aqui!</Text>
                                <Text style={styles.emptySubText}>Faça avaliações para receber dicas personalizadas.</Text>
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        padding: spacing.large,
    },
    header: {
        marginBottom: spacing.large,
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.primary,
    },
    date: {
        fontSize: 16,
        color: colors.neutral,
        textTransform: 'capitalize',
    },
    actionCard: {
        backgroundColor: colors.primary,
        borderRadius: 16,
        padding: spacing.medium,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.large,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    actionTitle: {
        color: colors.background,
        fontSize: 18,
        fontWeight: 'bold',
    },
    actionSubtitle: {
        color: '#DDE',
        fontSize: 14,
    },
    actionButton: {
        backgroundColor: colors.background,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        gap: 5
    },
    actionButtonText: {
        color: colors.primary,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: spacing.medium,
    },
    recommendationCard: {
        backgroundColor: colors.surface,
        padding: spacing.medium,
        borderRadius: 12,
        marginBottom: spacing.medium,
        borderLeftWidth: 4,
        borderLeftColor: colors.accent,
        elevation: 2,
    },
    recHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8
    },
    recCategory: {
        fontSize: 12,
        color: colors.accent,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    recTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 4,
    },
    recDescription: {
        fontSize: 14,
        color: colors.neutral,
        lineHeight: 20,
    },

    emptyState: {
        alignItems: 'center',
        padding: 20,
        opacity: 0.7
    },
    emptyText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.neutral,
        marginTop: 10,
    },
    emptySubText: {
        fontSize: 14,
        color: colors.neutral,
        textAlign: 'center',
    }
});