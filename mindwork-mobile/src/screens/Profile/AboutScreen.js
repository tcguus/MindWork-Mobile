import React from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing } from '../../theme';
import Logo from '../../../assets/MindWork-logo.jpg';

export default function AboutScreen() {
    const developers = [
        { name: 'Gustavo Camargo', rm: 'RM555562' },
        { name: 'Rodrigo Souza', rm: 'RM555451' },
        { name: 'Leornardo Cesar', rm: 'RM558373' }

    ];

    const handleOpenLink = () => {
        Linking.openURL('https://github.com/tcguus/MindWork-Mobile');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={Logo} style={styles.logo} />
                <Text style={styles.appName}>MindWork Mobile</Text>
                <Text style={styles.version}>Versão 1.0.0</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Desenvolvido por:</Text>
                {developers.map((dev, index) => (
                    <View key={index} style={styles.devRow}>
                        <Text style={styles.devName}>{dev.name}</Text>
                        <Text style={styles.devRm}>{dev.rm}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Sobre o Projeto</Text>
                <Text style={styles.description}>
                    O MindWork é uma solução integrada para monitoramento e promoção da saúde mental no ambiente corporativo.
                    Este aplicativo faz parte da Global Solution "Future of Work".
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Hash do Commit (Ref):</Text>
                <Text style={styles.hash}>7f3a1b9</Text>
            </View>
            <TouchableOpacity style={styles.githubButton} onPress={handleOpenLink}>
                <Text style={styles.githubText}>Ver Repositório no GitHub</Text>
            </TouchableOpacity>
            <Text style={styles.copy}>© 2025 MindWork Inc.</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: spacing.large, backgroundColor: colors.background, alignItems: 'center' },
    logoContainer: { alignItems: 'center', marginBottom: 30 },
    logo: { width: 100, height: 100, resizeMode: 'contain', marginBottom: 10 },
    appName: { fontSize: 24, fontWeight: 'bold', color: colors.primary },
    version: { fontSize: 14, color: colors.neutral },
    card: {
        width: '100%', backgroundColor: colors.surface,
        borderRadius: 12, padding: spacing.medium, marginBottom: spacing.medium,
        elevation: 2
    },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: colors.primary, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#EEE', paddingBottom: 5 },
    devRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
    devName: { fontSize: 14, color: colors.text, fontWeight: '500' },
    devRm: { fontSize: 14, color: colors.neutral },
    description: { fontSize: 14, color: colors.text, lineHeight: 20, textAlign: 'justify' },
    infoContainer: { marginTop: 10, alignItems: 'center' },
    label: { fontSize: 12, color: colors.neutral },
    hash: { fontSize: 14, fontWeight: 'bold', color: colors.accent, fontFamily: 'monospace' },
    githubButton: { marginTop: 20, padding: 10 },
    githubText: { color: colors.primary, textDecorationLine: 'underline' },
    copy: { marginTop: 30, fontSize: 12, color: colors.neutral }
});