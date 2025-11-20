import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    ActivityIndicator
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { colors, spacing } from '../../theme';
import Logo from '../../../assets/MindWork-logo.jpg';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();

    async function handleLogin() {
        if (!email || !password) return Alert.alert('Atenção', 'Preencha e-mail e senha.');

        setLoading(true);
        const result = await signIn(email, password);
        setLoading(false);

        if (!result.success) {
            Alert.alert('Erro', result.message);
        }
    }

    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.title}>MINDWORK</Text>
            <Text style={styles.subtitle}>Saúde mental corporativa</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="E-mail corporativo"
                    placeholderTextColor={colors.placeholder}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor={colors.placeholder}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color={colors.secondary} />
                    ) : (
                        <Text style={styles.buttonText}>ENTRAR</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.registerText}>
                        Não tem uma conta? <Text style={styles.registerLink}>Cadastre-se</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: spacing.large
    },
    logo: { width: 120, height: 120, resizeMode: 'contain', marginBottom: spacing.medium },
    title: { fontSize: 28, fontWeight: 'bold', color: colors.primary, letterSpacing: 2 },
    subtitle: { fontSize: 16, color: colors.neutral, marginBottom: 40 },
    form: { width: '100%' },
    input: {
        backgroundColor: colors.surface,
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#DDE',
        color: colors.text
    },
    button: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: { color: colors.secondary, fontWeight: 'bold', fontSize: 16 },
    registerButton: {
        marginTop: 20,
        alignItems: 'center',
        padding: 10,
    },
    registerText: {
        color: colors.neutral,
        fontSize: 15,
    },
    registerLink: {
        color: colors.primary,
        fontWeight: 'bold',
    }
});