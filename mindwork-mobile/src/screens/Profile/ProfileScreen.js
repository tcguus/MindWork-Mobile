import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { colors, spacing } from '../../theme';
import Logo from '../../../assets/MindWork-logo.jpg'; // Certifique-se que o caminho está certo

export default function ProfileScreen() {
  const { authData, signOut } = useAuth();
  const user = authData?.user;

  function handleLogout() {
    Alert.alert('Sair', 'Deseja realmente sair do aplicativo?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: signOut, style: 'destructive' }
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={60} color={colors.primary} />
        </View>
        <Text style={styles.name}>{user?.fullName || 'Usuário'}</Text>
        <Text style={styles.email}>{user?.email || 'email@mindwork.com'}</Text>
        
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>
            {user?.role === 'Manager' ? 'Gestor' : 'Colaborador'}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Configurações</Text>

        <TouchableOpacity style={styles.optionItem}>
          <View style={styles.optionLeft}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
            <Text style={styles.optionText}>Notificações</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.neutral} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <View style={styles.optionLeft}>
            <Ionicons name="lock-closed-outline" size={24} color={colors.text} />
            <Text style={styles.optionText}>Alterar Senha</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.neutral} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <View style={styles.optionLeft}>
            <Ionicons name="help-circle-outline" size={24} color={colors.text} />
            <Text style={styles.optionText}>Ajuda e Suporte</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.neutral} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair da Conta</Text>
        <Ionicons name="log-out-outline" size={20} color={colors.error} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    alignItems: 'center',
    padding: spacing.large,
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 4
  },
  avatarContainer: {
    width: 100, height: 100,
    borderRadius: 50,
    backgroundColor: colors.secondary,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: spacing.medium,
    borderWidth: 2, borderColor: colors.primary
  },
  name: { fontSize: 22, fontWeight: 'bold', color: colors.primary },
  email: { fontSize: 14, color: colors.neutral, marginBottom: 10 },
  roleBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12, paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: { color: colors.secondary, fontSize: 12, fontWeight: 'bold' },
  
  content: { padding: spacing.large, flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: colors.primary, marginBottom: spacing.medium },
  optionItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#E0E0E0'
  },
  optionLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  optionText: { fontSize: 16, color: colors.text },
  
  logoutButton: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10,
    margin: spacing.large,
    padding: 15,
    backgroundColor: '#FADBD8', // Vermelho bem claro
    borderRadius: 12,
    borderWidth: 1, borderColor: colors.error
  },
  logoutText: { color: colors.error, fontWeight: 'bold', fontSize: 16 },
  
  footer: { alignItems: 'center', paddingBottom: 20 },
  footerLogo: { width: 30, height: 30, resizeMode: 'contain', opacity: 0.5 },
  versionText: { color: colors.neutral, fontSize: 12, marginTop: 5 }
});