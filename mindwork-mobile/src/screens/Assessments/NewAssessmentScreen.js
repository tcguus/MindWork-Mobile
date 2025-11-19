import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../theme';
import api from '../../services/api';

export default function NewAssessmentScreen({ navigation }) {
  const [mood, setMood] = useState(3); // Começa no neutro
  const [stress, setStress] = useState(3);
  const [workload, setWorkload] = useState(3);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  // Mapeamento de Ícones (Metáfora do Clima)
  const moodIconsMap = {
    1: 'thunderstorm-outline',  // Péssimo (Tempestade)
    2: 'rainy-outline',         // Ruim (Chuva)
    3: 'cloud-outline',         // Neutro (Nublado)
    4: 'partly-sunny-outline',  // Bom (Parcialmente sol)
    5: 'sunny',                 // Excelente (Sol)
  };

  // Cores para cada estado de humor
  const moodColorsMap = {
    1: '#4A4A4A',       // Cinza escuro/Tempestade
    2: '#5A84B0',       // Azul chuva
    3: colors.neutral,  // Cinza neutro
    4: '#F1C40F',       // Amarelo suave
    5: '#F39C12'        // Laranja Sol
  };

  async function handleSave() {
    setLoading(true);
    try {
      const payload = {
        mood,
        stress,
        workload,
        notes
      };

      await api.post('/selfassessments', payload);

      Alert.alert('Sucesso', 'Sua autoavaliação foi registrada!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível salvar sua avaliação.');
    } finally {
      setLoading(false);
    }
  }

  // Função auxiliar para cor das bolinhas (Estresse/Carga)
  const getCircleColor = (option) => {
    if (option === 5) return colors.error;  // Vermelho (Crítico)
    if (option === 4) return '#F39C12';     // Amarelo Escuro/Laranja (Alerta)
    return colors.primary;                  // Azul (Normal)
  };

  // Componente seletor reutilizável
  const RatingSelector = ({ value, onChange, type }) => {
    const options = [1, 2, 3, 4, 5];
    
    return (
      <View style={styles.ratingContainer}>
        {options.map((option) => {
          const isSelected = value === option;
          
          // --- LÓGICA PARA HUMOR (ÍCONES) ---
          if (type === 'mood') {
            const iconName = moodIconsMap[option];
            // Se selecionado usa a cor do mapa, se não usa cinza claro
            const iconColor = isSelected ? moodColorsMap[option] : '#CCC'; 
            
            return (
              <TouchableOpacity 
                key={option} 
                onPress={() => onChange(option)} 
                style={[styles.moodButton, isSelected && styles.moodButtonSelected]}
              >
                <Ionicons 
                  name={iconName} 
                  size={32} 
                  color={iconColor} 
                />
                {isSelected && <View style={{ height: 4, width: 4, borderRadius: 2, backgroundColor: iconColor, marginTop: 4}} />}
              </TouchableOpacity>
            );
          }

          // --- LÓGICA PARA ESTRESSE/CARGA (NÚMEROS) ---
          return (
            <TouchableOpacity 
              key={option} 
              onPress={() => onChange(option)}
              style={[
                styles.circleButton, 
                isSelected && styles.circleSelected,
                // Muda a cor de fundo baseado na intensidade se estiver selecionado
                isSelected && { backgroundColor: getCircleColor(option) }
              ]}
            >
              <Text style={[styles.circleText, isSelected && styles.textSelected]}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>Como foi seu dia?</Text>
      <Text style={styles.headerSubtitle}>Registre seus indicadores para acompanhar sua evolução.</Text>

      {/* SEÇÃO HUMOR */}
      <View style={styles.card}>
        <Text style={styles.label}>Humor (Clima Emocional)</Text>
        <Text style={styles.description}>De Tempestade (1) a Ensolarado (5)</Text>
        <RatingSelector value={mood} onChange={setMood} type="mood" />
      </View>

      {/* SEÇÃO ESTRESSE */}
      <View style={styles.card}>
        <Text style={styles.label}>Nível de Estresse</Text>
        <Text style={styles.description}>1 = Baixo, 5 = Muito Alto</Text>
        <RatingSelector value={stress} onChange={setStress} type="stress" />
      </View>

      {/* SEÇÃO CARGA DE TRABALHO */}
      <View style={styles.card}>
        <Text style={styles.label}>Carga de Trabalho</Text>
        <Text style={styles.description}>1 = Leve, 5 = Pesada</Text>
        <RatingSelector value={workload} onChange={setWorkload} type="workload" />
      </View>

      {/* SEÇÃO NOTAS */}
      <View style={styles.card}>
        <Text style={styles.label}>Anotações (Opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Aconteceu algo específico hoje?"
          placeholderTextColor={colors.placeholder}
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
        />
      </View>

      {/* BOTÃO SALVAR */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={colors.secondary} />
        ) : (
          <Text style={styles.saveButtonText}>SALVAR REGISTRO</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.large,
    paddingBottom: 50,
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.neutral,
    marginBottom: spacing.large,
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.medium,
    borderRadius: 12,
    marginBottom: spacing.medium,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  description: {
    fontSize: 12,
    color: colors.neutral,
    marginBottom: spacing.medium,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  moodButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  moodButtonSelected: {
    backgroundColor: '#F0F0F0',
  },
  circleButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  circleSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  circleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.neutral,
  },
  textSelected: {
    color: colors.background,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    height: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});