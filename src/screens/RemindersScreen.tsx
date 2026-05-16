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

const reminderTypes = ['Consulta', 'Exame', 'Medicamento', 'Outro'];

const RemindersScreen: React.FC = () => {
  const {reminders, addReminder, deleteReminder} = useUser();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('Consulta');

  const handleAdd = () => {
    if (!title || !date) {
      Alert.alert('Atenção', 'Preencha pelo menos o título e a data.');
      return;
    }
    addReminder({
      id: Date.now().toString(),
      title,
      date,
      time,
      type,
    });
    setTitle('');
    setDate('');
    setTime('');
    setType('Consulta');
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Lembretes</Text>
          <Text style={styles.subtitle}>Não perca consultas e exames</Text>
        </View>
        <TouchableOpacity
          style={styles.newBtn}
          onPress={() => setShowModal(true)}>
          <Text style={styles.newBtnText}>+ Novo</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {reminders.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyText}>Nenhum lembrete criado ainda</Text>
            <TouchableOpacity
              style={styles.createBtn}
              onPress={() => setShowModal(true)}>
              <Text style={styles.createBtnText}>Criar primeiro lembrete</Text>
            </TouchableOpacity>
          </View>
        ) : (
          reminders.map(reminder => (
            <View key={reminder.id} style={styles.reminderCard}>
              <View style={styles.reminderLeft}>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeBadgeText}>{reminder.type}</Text>
                </View>
                <Text style={styles.reminderTitle}>{reminder.title}</Text>
                <Text style={styles.reminderDate}>
                  📅 {reminder.date}
                  {reminder.time ? `  ⏰ ${reminder.time}` : ''}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() =>
                  Alert.alert(
                    'Excluir',
                    'Deseja remover este lembrete?',
                    [
                      {text: 'Cancelar', style: 'cancel'},
                      {
                        text: 'Excluir',
                        style: 'destructive',
                        onPress: () => deleteReminder(reminder.id),
                      },
                    ],
                  )
                }>
                <Text style={styles.deleteBtnText}>🗑</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
        <View style={{height: 20}} />
      </ScrollView>

      {/* Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Novo Lembrete</Text>

            <Text style={styles.label}>Título</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Consulta ginecologista"
              placeholderTextColor={Colors.textLight}
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.label}>Data</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              placeholderTextColor={Colors.textLight}
              value={date}
              onChangeText={setDate}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Horário (opcional)</Text>
            <TextInput
              style={styles.input}
              placeholder="HH:MM"
              placeholderTextColor={Colors.textLight}
              value={time}
              onChangeText={setTime}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Tipo</Text>
            <View style={styles.typeRow}>
              {reminderTypes.map(t => (
                <TouchableOpacity
                  key={t}
                  style={[styles.typeBtn, type === t && styles.typeBtnActive]}
                  onPress={() => setType(t)}>
                  <Text
                    style={[
                      styles.typeBtnText,
                      type === t && styles.typeBtnTextActive,
                    ]}>
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowModal(false)}>
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleAdd}>
                <Text style={styles.saveBtnText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  newBtn: {
    backgroundColor: Colors.bluePrimary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  newBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  emptyCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
    opacity: 0.4,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  createBtn: {
    backgroundColor: Colors.bluePrimary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
  },
  createBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
  reminderCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  reminderLeft: {
    flex: 1,
  },
  typeBadge: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  typeBadgeText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
  },
  reminderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  reminderDate: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  deleteBtn: {
    padding: 8,
  },
  deleteBtnText: {
    fontSize: 20,
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
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 6,
    marginTop: 12,
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
  typeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  typeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  typeBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  typeBtnText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  typeBtnTextActive: {
    color: Colors.white,
    fontWeight: '700',
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
  },
  saveBtnText: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: '700',
  },
});

export default RemindersScreen;
