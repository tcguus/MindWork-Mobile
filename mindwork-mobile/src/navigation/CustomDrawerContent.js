import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../theme';

// Importando o logo que salvamos no Passo 2
import Logo from '../../assets/MindWork-logo.jpg'; 

export default function CustomDrawerContent(props) {
  const { signOut, authData } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.userName}>
            Olá, {authData?.user?.fullName || 'Bem-vindo'}
          </Text>
        </View>
        
        <View style={styles.listContainer}>
           <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <DrawerItem 
          label="Sair do App" 
          onPress={signOut}
          labelStyle={{ color: colors.error, fontWeight: 'bold' }} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 20, alignItems: 'center', backgroundColor: colors.secondary, marginBottom: 10 },
  logo: { width: 80, height: 80, resizeMode: 'contain', marginBottom: 10 },
  userName: { color: colors.primary, fontSize: 18, fontWeight: 'bold' },
  listContainer: { flex: 1 },
  footer: { borderTopWidth: 1, borderTopColor: '#ccc', paddingBottom: 20 }
});