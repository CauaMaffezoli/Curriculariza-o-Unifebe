import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {Colors} from '../theme';

const symptoms = [
  {id: '1', label: 'Cólica', icon: '😣'},
  {id: '2', label: 'Dor de cabeça', icon: '🤕'},
  {id: '3', label: 'Inchaço', icon: '💧'},
  {id: '4', label: 'Cansaço', icon: '😴'},
  {id: '5', label: 'Náusea', icon: '🤢'},
  {id: '6', label: 'Irritabilidade', icon: '😤'},
  {id: '7', label: 'Ansiedade', icon: '😰'},
  {id: '8', label: 'Acne', icon: '😖'},
  {id: '9', label: 'Dor nas costas', icon: '😩'},
  {id: '10', label: 'Sangramento', icon: '🩸'},
  {id: '11', label: 'Corrimento', icon: '💊'},
  {id: '12', label: 'Bem-estar', icon: '😊'},
];

const moods = ['😊', '😐', '😔', '😤', '😴'];

const SymptomsScreen: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [mood, setMood] = useState<string>('😊');
  const [saved, setSaved] = useState(false);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id],
    );
  };

  const handleSave = () => {
    setSaved(true);
    Alert.alert(
      'Sintomas registrados!',
      'Seus sintomas de hoje foram salvos com sucesso.',
      [{text: 'OK', onPress: () => setSaved(false)}],
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Sintomas</Text>
        <Text style={styles.subtitle}>Como você está se sentindo hoje?</Text>
      </View>

      {/* Mood */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Humor do dia</Text>
        <View style={styles.moodRow}>
          {moods.map(m => (
            <TouchableOpacity
              key={m}
              style={[styles.moodBtn, mood === m && styles.moodBtnActive]}
              onPress={() => setMood(m)}>
              <Text style={styles.moodEmoji}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Symptoms grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sintomas</Text>
        <View style={styles.grid}>
          {symptoms.map(sym => (
            <TouchableOpacity
              key={sym.id}
              style={[styles.symptomBtn, selected.includes(sym.id) && styles.symptomBtnActive]}
              onPress={() => toggle(sym.id)}>
              <Text style={styles.symptomIcon}>{sym.icon}</Text>
              <Text
                style={[
                  styles.symptomLabel,
                  selected.includes(sym.id) && styles.symptomLabelActive,
                ]}>
                {sym.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Salvar registros do dia</Text>
      </TouchableOpacity>

      <View style={{height: 30}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  moodRow: {
    flexDirection: 'row',
    gap: 12,
  },
  moodBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  moodBtnActive: {
    borderColor: Colors.primary,
    backgroundColor: '#F3E8FF',
  },
  moodEmoji: {
    fontSize: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  symptomBtn: {
    width: '30%',
    backgroundColor: Colors.white,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  symptomBtnActive: {
    borderColor: Colors.primary,
    backgroundColor: '#F3E8FF',
  },
  symptomIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  symptomLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  symptomLabelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  saveBtn: {
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
  },
  saveBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default SymptomsScreen;
