import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { colors, spacing } from '../../theme';
import api from '../../services/api';

export default function RegisterScreen({ navigation }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Collaborator'); 
    const [loading, setLoading] = useState(false);

    async function handleRegister() {
        if (!fullName || !email || !password) {
            return Alert.alert('Erro', 'Preencha todos os campos.');
        }

        setLoading(true);
        try {
            await api.post('/auth/register', {
                fullName,
                email,
                password,
                role
            });

            Alert.alert('Sucesso', 'Conta criada! Faça login para continuar.', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 409) {
                Alert.alert('Atenção', 'Este e-mail já está cadastrado. Tente fazer login.');
            } else {
                Alert.alert('Erro', 'Não foi possível criar a conta. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Crie sua conta</Text>
            <Text style={styles.subtitle}>Junte-se ao MindWork</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Nome Completo</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: João Silva"
                    value={fullName}
                    onChangeText={setFullName}
                />
                <Text style={styles.label}>E-mail Corporativo</Text>
                <TextInput
                    style={styles.input}
                    placeholder="joao@empresa.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="******"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <Text style={styles.label}>Eu sou:</Text>
                <View style={styles.roleContainer}>
                    <TouchableOpacity
                        style={[styles.roleButton, role === 'Collaborator' && styles.roleSelected]}
                        onPress={() => setRole('Collaborator')}
                    >
                        <Text style={[styles.roleText, role === 'Collaborator' && styles.roleTextSelected]}>Colaborador</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.roleButton, role === 'Manager' && styles.roleSelected]}
                        onPress={() => setRole('Manager')}
                    >
                        <Text style={[styles.roleText, role === 'Manager' && styles.roleTextSelected]}>Gestor</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                    {loading ? <ActivityIndicator color={colors.secondary} /> : <Text style={styles.buttonText}>CADASTRAR</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkButton}>
                    <Text style={styles.linkText}>Já tenho conta. <Text style={{ fontWeight: 'bold' }}>Voltar.</Text></Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, justifyContent: 'center', padding: spacing.large, backgroundColor: colors.background },
    title: { fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: 5 },
    subtitle: { fontSize: 16, color: colors.neutral, marginBottom: 30 },
    form: { width: '100%' },
    label: { color: colors.primary, marginBottom: 5, fontWeight: '600' },
    input: { backgroundColor: colors.surface, padding: 12, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#DDD' },
    button: { backgroundColor: colors.primary, padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    buttonText: { color: colors.secondary, fontWeight: 'bold', fontSize: 16 },
    linkButton: { marginTop: 20, alignItems: 'center' },
    linkText: { color: colors.primary },
    roleContainer: { flexDirection: 'row', marginBottom: 20, gap: 10 },
    roleButton: { flex: 1, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: colors.primary, alignItems: 'center' },
    roleSelected: { backgroundColor: colors.primary },
    roleText: { color: colors.primary },
    roleTextSelected: { color: colors.background, fontWeight: 'bold' }
});