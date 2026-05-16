import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Colors} from '../theme';

const {width, height} = Dimensions.get('window');

interface Props {
  onLogin: () => void;
  onRegister: () => void;
}

const WelcomeScreen: React.FC<Props> = ({onLogin, onRegister}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>♥</Text>
          </View>
        </View>

        <Text style={styles.title}>Minha Saúde Feminina</Text>
        <Text style={styles.subtitle}>
          Acompanhe sua saúde, registre sintomas e tenha informações confiáveis
          sempre à mão
        </Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.btnPrimary} onPress={onLogin}>
            <Text style={styles.btnPrimaryText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSecondary} onPress={onRegister}>
            <Text style={styles.btnSecondaryText}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: width * 0.85,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 32,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  logoIcon: {
    fontSize: 44,
    color: Colors.white,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 48,
  },
  buttonsContainer: {
    width: '100%',
    gap: 12,
  },
  btnPrimary: {
    width: '100%',
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
  btnPrimaryText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  btnSecondary: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  btnSecondaryText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WelcomeScreen;
