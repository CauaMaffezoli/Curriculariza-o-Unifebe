import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import {Colors} from '../theme';

const contents = [
  {
    id: '1',
    title: 'Queixas Ginecológicas',
    description: 'Informações sobre sintomas comuns',
    icon: '♥',
    iconBg: '#FDF2F8',
    iconColor: '#EC4899',
    tags: ['Vídeo', 'Áudio'],
    detail: `As queixas ginecológicas mais comuns incluem:\n\n• Corrimento vaginal: Normal em algumas fases do ciclo, mas alterações na cor, cheiro ou consistência podem indicar infecção.\n\n• Cólicas menstruais: Dores durante o período podem ser normais, mas cólicas muito intensas podem indicar endometriose ou miomas.\n\n• Sangramento irregular: Ciclos fora do padrão devem ser avaliados por uma ginecologista.\n\n• Dor durante a relação sexual: Pode indicar ressecamento vaginal, infecções ou outras condições que requerem atenção médica.\n\nConsulte sempre uma profissional de saúde para avaliação adequada.`,
  },
  {
    id: '2',
    title: 'Ciclo Menstrual',
    description: 'Entenda as fases do seu ciclo',
    icon: '📅',
    iconBg: '#F5F3FF',
    iconColor: '#8B5CF6',
    tags: ['Vídeo'],
    detail: `O ciclo menstrual tem em média 28 dias e é dividido em 4 fases:\n\n🌑 Fase Menstrual (dias 1-5)\nOcorre a descamação do endométrio. É comum sentir cólicas e fadiga.\n\n🌒 Fase Folicular (dias 1-13)\nOs folículos ovarianos amadurecem e os níveis de estrogênio aumentam.\n\n🌕 Fase Ovulatória (dia 14)\nO óvulo maduro é liberado. Período de maior fertilidade.\n\n🌘 Fase Lútea (dias 15-28)\nO corpo se prepara para possível gravidez. Se não houver fecundação, o ciclo reinicia.\n\nO ciclo pode variar de 21 a 35 dias e ainda ser considerado normal.`,
  },
  {
    id: '3',
    title: 'Prevenção',
    description: 'Exames e cuidados preventivos',
    icon: '🛡',
    iconBg: '#F5F3FF',
    iconColor: '#8B5CF6',
    tags: ['Áudio'],
    detail: `Exames preventivos essenciais para a saúde feminina:\n\n🔬 Papanicolau\nRealizado a partir dos 25 anos, detecta lesões no colo do útero. Recomendado anualmente.\n\n🖼 Mamografia\nIndispensável para mulheres acima de 40 anos. Detecta o câncer de mama precocemente.\n\n🩸 Exames de sangue\nVerifique regularmente: hormônios, glicose, colesterol, hemograma completo.\n\n🔭 Ultrassom pélvico\nAvalia ovários, útero e trompas. Detecta cistos, miomas e outras alterações.\n\n💉 Vacinação\nHPV e hepatite B são importantes para a saúde ginecológica.\n\nNão espere ter sintomas para cuidar da sua saúde!`,
  },
  {
    id: '4',
    title: 'Saúde Integral',
    description: 'Bem-estar físico e mental',
    icon: '✨',
    iconBg: '#FDF2F8',
    iconColor: '#EC4899',
    tags: ['Vídeo', 'Áudio'],
    detail: `A saúde feminina vai além do físico. Cuide de você de forma integral:\n\n🧘 Saúde Mental\nAnsieda, estresse e depressão afetam diretamente o ciclo hormonal. Busque apoio psicológico quando necessário.\n\n🏃 Atividade Física\nPelo menos 150 minutos de exercício moderado por semana melhora o humor, regula hormônios e reduz cólicas.\n\n🥗 Alimentação\nDieta equilibrada com ferro, cálcio, vitamina D e ômega-3 contribui para a saúde hormonal.\n\n😴 Sono\n7 a 9 horas de sono regulam o cortisol e os hormônios sexuais.\n\n🤝 Vínculos Sociais\nRelações saudáveis com família e amigos protegem a saúde mental e emocional.`,
  },
  {
    id: '5',
    title: 'Apoio',
    description: 'Recursos e suporte emocional',
    icon: '🤲',
    iconBg: '#F5F3FF',
    iconColor: '#8B5CF6',
    tags: ['Áudio'],
    detail: `Você não está sozinha! Recursos de apoio disponíveis:\n\n📞 CVV - Centro de Valorização da Vida\nLigue 188 - disponível 24h para apoio emocional.\n\n🏥 CAPS - Centro de Atenção Psicossocial\nServiço público de saúde mental oferecido pelo SUS em todo o país.\n\n👩‍⚕️ Grupos de Apoio\nGrupos para mulheres com endometriose, síndrome dos ovários policísticos, menopausa e outras condições.\n\n📱 Aplicativos de Bem-Estar\nMeditação guiada e técnicas de respiração podem ajudar no dia a dia.\n\n🌸 Comunidades Online\nForuns e grupos em redes sociais onde mulheres compartilham experiências e apoio mútuo.\n\nLembre-se: pedir ajuda é um ato de coragem e autocuidado.`,
  },
];

const ContentsScreen: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<typeof contents[0] | null>(null);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Conteúdos</Text>
        <Text style={styles.subtitle}>Informações confiáveis sobre saúde feminina</Text>
      </View>

      {contents.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() => setSelectedContent(item)}>
          <View style={[styles.iconBox, {backgroundColor: item.iconBg}]}>
            <Text style={[styles.iconText, {color: item.iconColor}]}>{item.icon}</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
            <View style={styles.tags}>
              {item.tags.map(tag => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>
                    {tag === 'Vídeo' ? '▶ ' : '🎧 '}{tag}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      ))}

      <View style={{height: 20}} />

      {/* Detail Modal */}
      <Modal
        visible={selectedContent !== null}
        animationType="slide"
        transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={[styles.modalIcon, {backgroundColor: selectedContent?.iconBg}]}>
                <Text style={styles.modalIconText}>{selectedContent?.icon}</Text>
              </View>
              <View style={styles.modalHeaderText}>
                <Text style={styles.modalTitle}>{selectedContent?.title}</Text>
                <Text style={styles.modalSubtitle}>{selectedContent?.description}</Text>
              </View>
            </View>
            <ScrollView style={styles.modalBody}>
              <Text style={styles.modalDetailText}>{selectedContent?.detail}</Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setSelectedContent(null)}>
              <Text style={styles.closeBtnText}>Fechar</Text>
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
  card: {
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
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconText: {
    fontSize: 26,
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
  },
  arrow: {
    fontSize: 22,
    color: Colors.textLight,
    marginLeft: 8,
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
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  modalIconText: {
    fontSize: 24,
  },
  modalHeaderText: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  modalSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  modalBody: {
    maxHeight: 400,
    marginBottom: 20,
  },
  modalDetailText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  closeBtn: {
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ContentsScreen;
