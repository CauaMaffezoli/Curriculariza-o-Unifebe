import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Colors} from '../theme';
import {useUser} from '../contexts/UserContext';

const tips = [
  'Beba pelo menos 2 litros de água por dia. A hidratação adequada é fundamental para o equilíbrio hormonal e bem-estar geral.',
  'Pratique pelo menos 30 minutos de atividade física diariamente para melhorar sua saúde hormonal.',
  'Durma entre 7 e 9 horas por noite. O sono adequado é essencial para a regulação do ciclo menstrual.',
  'Inclua alimentos ricos em ferro na sua dieta durante o período menstrual para repor as perdas.',
  'Consulte sua ginecologista regularmente, mesmo quando estiver se sentindo bem.',
];

interface Props {
  onNavigate: (screen: string) => void;
}

const HomeScreen: React.FC<Props> = ({onNavigate}) => {
  const {user} = useUser();
  const todayTip = tips[new Date().getDate() % tips.length];

  const quickAccess = [
    {id: 'Calendário', icon: '📅', color: '#EC4899', bg: '#FDF2F8'},
    {id: 'Sintomas', icon: '📈', color: '#8B5CF6', bg: '#F5F3FF'},
    {id: 'Conteúdos', icon: '📋', color: '#8B5CF6', bg: '#F5F3FF'},
    {id: 'Lembretes', icon: '🔔', color: '#EC4899', bg: '#FDF2F8'},
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>
          {user?.name || 'Usuária'}! 👋
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Acesso rápido</Text>

      <View style={styles.grid}>
        {quickAccess.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[styles.gridItem, {backgroundColor: Colors.white}]}
            onPress={() => onNavigate(item.id)}>
            <View style={[styles.iconCircle, {backgroundColor: item.bg}]}>
              <Text style={styles.iconText}>{item.icon}</Text>
            </View>
            <Text style={styles.gridLabel}>{item.id}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>Dica do dia</Text>
        <Text style={styles.tipText}>{todayTip}</Text>
      </View>

      <View style={{height: 20}} />
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
    marginBottom: 28,
  },
  greeting: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  gridItem: {
    width: '47%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconText: {
    fontSize: 26,
  },
  gridLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  tipCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});

export default HomeScreen;
