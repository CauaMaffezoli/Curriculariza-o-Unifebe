import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Colors} from '../theme';

const MONTHS = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro',
];
const DAYS_SHORT = ['D','S','T','Q','Q','S','S'];


const MENSTRUAL_DAYS = [8, 9, 10, 11, 12, 13, 14];

const CalendarScreen: React.FC = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  const isToday = (day: number) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  const isMenstrual = (day: number) => MENSTRUAL_DAYS.includes(day);

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendário</Text>
        <Text style={styles.subtitle}>Acompanhe seu ciclo menstrual</Text>
      </View>

      <View style={styles.calendarCard}>
        {/* Month navigation */}
        <View style={styles.monthNav}>
          <TouchableOpacity onPress={prevMonth} style={styles.navBtn}>
            <Text style={styles.navArrow}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.monthTitle}>
            {MONTHS[currentMonth]} {currentYear}
          </Text>
          <TouchableOpacity onPress={nextMonth} style={styles.navBtn}>
            <Text style={styles.navArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Day headers */}
        <View style={styles.daysRow}>
          {DAYS_SHORT.map((d, i) => (
            <Text key={i} style={styles.dayHeader}>{d}</Text>
          ))}
        </View>

        {/* Calendar grid */}
        <View style={styles.grid}>
          {cells.map((day, index) => (
            <View key={index} style={styles.cell}>
              {day !== null && (
                <View
                  style={[
                    styles.dayCircle,
                    isMenstrual(day) && styles.menstrualCircle,
                    isToday(day) && styles.todayCircle,
                  ]}>
                  <Text
                    style={[
                      styles.dayText,
                      isMenstrual(day) && styles.menstrualText,
                      isToday(day) && styles.todayText,
                    ]}>
                    {day}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legendCard}>
        <View style={styles.legendRow}>
          <View style={styles.legendDot} />
          <View>
            <Text style={styles.legendTitle}>Período menstrual</Text>
            <Text style={styles.legendSub}>
              Dias {MENSTRUAL_DAYS[0]}-{MENSTRUAL_DAYS[MENSTRUAL_DAYS.length - 1]} deste mês
            </Text>
          </View>
        </View>
      </View>

      {/* Tip */}
      <View style={styles.tipCard}>
        <Text style={styles.tipText}>
          <Text style={styles.tipBold}>Dica: </Text>
          Registre seus sintomas diariamente para ter um melhor acompanhamento do seu ciclo.
        </Text>
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
  calendarCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 16,
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navArrow: {
    fontSize: 24,
    color: Colors.textSecondary,
    fontWeight: '300',
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  daysRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menstrualCircle: {
    backgroundColor: Colors.menstrual,
  },
  todayCircle: {
    backgroundColor: Colors.today,
    borderWidth: 2,
    borderColor: Colors.today,
  },
  dayText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '400',
  },
  menstrualText: {
    color: Colors.menstrualDark,
    fontWeight: '600',
  },
  todayText: {
    color: Colors.white,
    fontWeight: '700',
  },
  legendCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.menstrualDark,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  legendSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  tipCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.tipBorder,
  },
  tipText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  tipBold: {
    fontWeight: '700',
    color: Colors.bluePrimary,
  },
});

export default CalendarScreen;
