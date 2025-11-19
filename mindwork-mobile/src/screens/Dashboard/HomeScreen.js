import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem-vindo ao MindWork!</Text>
      <Text style={styles.instruction}>
        Use o menu superior esquerdo (☰) para navegar.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background, padding: 20 },
  welcome: { fontSize: 22, color: colors.primary, fontWeight: 'bold', marginBottom: 10 },
  instruction: { fontSize: 16, color: colors.neutral, textAlign: 'center' }
});