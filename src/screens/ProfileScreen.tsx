import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import {Colors} from '../theme';
import {useUser} from '../contexts/UserContext';

interface Props {
  onLogout: () => void;
}

const ProfileScreen: React.FC<Props> = ({onLogout}) => {
  const {user, updateUser} = useUser();
  const [showEdit, setShowEdit] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [age, setAge] = useState(user?.age || '');
  const [email, setEmail] = useState(user?.email || '');
  const [lifePhase, setLifePhase] = useState(user?.lifePhase || '');

  const handleSave = () => {
    updateUser({name, age, email, lifePhase});
    setShowEdit(false);
  };

  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja realmente sair da sua conta?', [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Sair', style: 'destructive', onPress: onLogout},
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.subtitle}>Gerencie suas informações</Text>
      </View>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarIcon}>👤</Text>
        </View>
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Nome</Text>
          <Text style={styles.infoValue}>{user?.name || 'Não informado'}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Idade</Text>
          <Text style={styles.infoValue}>
            {user?.age ? `${user.age} anos` : 'Não informado anos'}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{user?.email || 'Não informado'}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Fase da vida</Text>
          <Text style={styles.infoValue}>{user?.lifePhase || 'Não informado'}</Text>
        </View>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => {
            setName(user?.name || '');
            setAge(user?.age || '');
            setEmail(user?.email || '');
            setLifePhase(user?.lifePhase || '');
            setShowEdit(true);
          }}>
          <Text style={styles.editBtnText}>✏️  Editar perfil</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.outlineBtn} onPress={handleLogout}>
        <Text style={styles.outlineBtnText}>→  Sair</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.outlineBtn}
        onPress={() => setShowAbout(true)}>
        <Text style={[styles.outlineBtnText, {color: Colors.primary}]}>ℹ  Sobre o App</Text>
      </TouchableOpacity>

      <View style={{height: 20}} />

      {/* Edit Modal */}
      <Modal visible={showEdit} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholderTextColor={Colors.textLight}
            />

            <Text style={styles.label}>Idade</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              placeholderTextColor={Colors.textLight}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={Colors.textLight}
            />

            <Text style={styles.label}>Fase da vida</Text>
            <TextInput
              style={styles.input}
              value={lifePhase}
              onChangeText={setLifePhase}
              placeholderTextColor={Colors.textLight}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowEdit(false)}>
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* About Modal */}
      <Modal visible={showAbout} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.aboutLogo}>
              <Text style={styles.aboutLogoIcon}>♥</Text>
            </View>
            <Text style={styles.aboutTitle}>Minha Saúde Feminina</Text>
            <Text style={styles.aboutVersion}>Versão 1.0.0</Text>
            <Text style={styles.aboutDesc}>
              Aplicativo dedicado ao acompanhamento da saúde feminina. Registre
              seu ciclo, acesse conteúdos informativos e nunca perca uma consulta
              importante.
            </Text>
            <Text style={styles.aboutFooter}>
              Desenvolvido com ♥ para o bem-estar feminino
            </Text>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => setShowAbout(false)}>
              <Text style={styles.saveBtnText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  avatarIcon: {
    fontSize: 40,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  infoRow: {
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.textLight,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  editBtn: {
    marginTop: 20,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
  },
  editBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  outlineBtn: {
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginBottom: 12,
  },
  outlineBtnText: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 8,
  },
  cancelBtn: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  saveBtn: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  saveBtnText: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: '700',
  },
  aboutLogo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  aboutLogoIcon: {
    fontSize: 32,
    color: Colors.white,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  aboutVersion: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  aboutDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  aboutFooter: {
    fontSize: 13,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
});

export default ProfileScreen;
