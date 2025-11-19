import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import { colors } from '../theme';

// Importaremos as telas reais conforme formos criando.
// Por enquanto, vamos importar a Home e usar placeholders nas outras.
import HomeScreen from '../screens/Dashboard/HomeScreen';
import { View, Text } from 'react-native';

const Placeholder = ({ title }) => (
  <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: colors.background}}>
    <Text style={{color: colors.primary}}>{title}</Text>
  </View>
);

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.secondary, // Texto/ícone do header bege claro
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.neutral,
        drawerLabelStyle: { fontWeight: 'bold' },
        sceneContainerStyle: { backgroundColor: colors.background }
      }}
    >
      <Drawer.Screen name="Dashboard" component={HomeScreen} options={{ title: 'Início' }} />
      <Drawer.Screen name="NewAssessment" component={() => <Placeholder title="Nova Avaliação" />} options={{ title: 'Nova Avaliação' }} />
      <Drawer.Screen name="History" component={() => <Placeholder title="Histórico" />} options={{ title: 'Histórico' }} />
      <Drawer.Screen name="Profile" component={() => <Placeholder title="Perfil" />} options={{ title: 'Meu Perfil' }} />
      <Drawer.Screen name="About" component={() => <Placeholder title="Sobre" />} options={{ title: 'Sobre o App' }} />
    </Drawer.Navigator>
  );
}