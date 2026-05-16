import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {Colors} from '../theme';
import {useUser} from '../contexts/UserContext';

const lifePhases = [
  'Adolescência',
  'Adulta jovem',
  'Gestante',
  'Pós-parto',
  'Menopausa',
  'Pós-menopausa',
];

interface Props {
  onBack: () => void;
  onSuccess: () => void;
}

const RegisterScreen: React.FC<Props> = ({onBack, onSuccess}) => {
  const {login} = useUser();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lifePhase, setLifePhase] = useState('');
  const [showPhases, setShowPhases] = useState(false);

  const handleRegister = () => {
    if (!name || !age || !email || !password || !lifePhase) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }
    login({name, age, email, lifePhase});
    onSuccess();
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.subtitle}>Preencha seus dados para começar</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome completo"
          placeholderTextColor={Colors.textLight}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Idade</Text>
        <TextInput
          style={styles.input}
          placeholder="Sua idade"
          placeholderTextColor={Colors.textLight}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          placeholderTextColor={Colors.textLight}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor={Colors.textLight}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Fase da vida</Text>
        <TouchableOpacity
          style={styles.selectInput}
          onPress={() => setShowPhases(!showPhases)}>
          <Text
            style={
              lifePhase ? styles.selectText : styles.selectPlaceholder
            }>
            {lifePhase || 'Selecione sua fase'}
          </Text>
          <Text style={styles.chevron}>▾</Text>
        </TouchableOpacity>

        {showPhases && (
          <View style={styles.dropdown}>
            {lifePhases.map(phase => (
              <TouchableOpacity
                key={phase}
                style={styles.dropdownItem}
                onPress={() => {
                  setLifePhase(phase);
                  setShowPhases(false);
                }}>
                <Text style={styles.dropdownText}>{phase}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.btnPrimary} onPress={handleRegister}>
          <Text style={styles.btnText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
  },
  backBtn: {
    marginTop: 16,
    marginBottom: 24,
    width: 36,
    height: 36,
    justifyContent: 'center',
  },
  backText: {
    fontSize: 24,
    color: Colors.text,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 28,
  },
  form: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectInput: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    fontSize: 15,
    color: Colors.text,
  },
  selectPlaceholder: {
    fontSize: 15,
    color: Colors.textLight,
  },
  chevron: {
    color: Colors.textSecondary,
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    marginTop: 4,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  dropdownText: {
    fontSize: 15,
    color: Colors.text,
  },
  btnPrimary: {
    marginTop: 28,
    marginBottom: 32,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default RegisterScreen;
