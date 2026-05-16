 Minha Saúde Feminina

> Aplicativo mobile para acompanhamento da saúde feminina — registre sintomas, acompanhe seu ciclo e acesse informações confiáveis sempre à mão.

---

 Visão Geral

Minha Saúde Feminina** é um aplicativo mobile desenvolvido em **React Native + TypeScript**, compatível com **Android e iOS**. O app oferece uma interface simples, intuitiva e acolhedora para que mulheres possam cuidar da própria saúde de forma prática e organizada.

---

 Telas do Aplicativo

 Tela de Boas-vindas (Welcome)
Primeira tela exibida ao abrir o app. Apresenta o logo, o nome do aplicativo e uma breve descrição da proposta. Oferece dois botões: **Entrar** (para usuárias já cadastradas) e **Criar conta** (para novas usuárias). O visual é limpo, centralizado e acolhedor.

---

 Criar Conta
Formulário completo de cadastro com os campos: **nome completo**, **idade**, **e-mail**, **senha** e **fase da vida** (selecionada via dropdown com opções como Adolescência, Gestante, Menopausa, entre outras). Ao finalizar, a usuária é redirecionada diretamente para o app.

---

 Início (Dashboard)
Tela principal do app após o login. Exibe uma saudação personalizada com o nome da usuária, quatro atalhos rápidos em grid (Calendário, Sintomas, Conteúdos e Lembretes) e uma **Dica do dia** que muda conforme a data, com orientações sobre hidratação, sono, alimentação e saúde hormonal.

---

 Calendário
Calendário interativo com navegação entre meses. Destaca visualmente o **período menstrual** (dias marcados em rosa) e o **dia atual** (marcado em roxo). Abaixo do calendário exibe uma legenda explicativa e uma dica sobre a importância de registrar sintomas diariamente.

---

 Conteúdos
Lista com 5 categorias de conteúdo informativo sobre saúde feminina, cada uma com ícone, título, descrição e tags de formato (Vídeo/Áudio). Ao tocar em uma categoria, abre um **modal com o conteúdo completo**. As categorias são:

- **Queixas Ginecológicas** — sintomas comuns e quando buscar ajuda
- **Ciclo Menstrual** — as 4 fases do ciclo explicadas
- **Prevenção** — exames preventivos essenciais
- **Saúde Integral** — bem-estar físico e mental
- **Apoio** — recursos e suporte emocional

---

 Lembretes
Tela para criação e gerenciamento de lembretes de consultas, exames, medicamentos e outros compromissos de saúde. Quando vazia, exibe uma mensagem motivacional com botão para criar o primeiro lembrete. Cada lembrete pode ter **título**, **data**, **horário** e **tipo**, e pode ser excluído com confirmação.

---

 Sintomas
Tela de registro diário com dois blocos: **Humor do dia** (seleção de emoji que representa como a usuária está se sentindo) e **Sintomas** (grid com 12 opções como cólica, cansaço, náusea, ansiedade, acne, entre outros). Os itens selecionados são destacados em roxo. Ao finalizar, a usuária salva o registro do dia.

---

 Perfil
Exibe os dados cadastrados da usuária (nome, idade, e-mail e fase da vida) em um card organizado. Oferece o botão **Editar perfil** que abre um modal de edição, além dos botões **Sair** (com confirmação) e **Sobre o App** (com informações sobre o aplicativo).

---

 Tecnologias

- **[React Native](https://reactnative.dev/) 0.76.5** — framework principal para desenvolvimento mobile multiplataforma
- **[TypeScript](https://www.typescriptlang.org/) 5.0** — linguagem principal com tipagem estática
- **React Context API** — gerenciamento de estado global (usuário, lembretes)
- **Android Studio** — emulação e geração de APK/AAB
- **Gradle 8.10.2** — build system Android

---

 Estrutura do Projeto

```
curric/
├── App.tsx                        # Componente raiz + navegação principal
├── index.js                       # Ponto de entrada
├── package.json                   # Dependências do projeto
├── tsconfig.json                  # Configuração TypeScript
├── babel.config.js                # Configuração Babel
├── metro.config.js                # Configuração Metro Bundler
│
├── src/
│   ├── theme.ts                   # Paleta de cores e design tokens
│   ├── contexts/
│   │   └── UserContext.tsx        # Estado global: usuário e lembretes
│   └── screens/
│       ├── WelcomeScreen.tsx      # Tela de boas-vindas
│       ├── RegisterScreen.tsx     # Cadastro de usuária
│       ├── HomeScreen.tsx         # Dashboard principal
│       ├── CalendarScreen.tsx     # Calendário do ciclo
│       ├── ContentsScreen.tsx     # Conteúdos informativos
│       ├── RemindersScreen.tsx    # Lembretes
│       ├── ProfileScreen.tsx      # Perfil da usuária
│       └── SymptomsScreen.tsx     # Registro de sintomas
│
├── android/                       # Projeto Android nativo
└── ios/                           # Projeto iOS nativo
```

---

 Como Rodar o Projeto

 Pre-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) 18 ou superior
- [JDK 17](https://www.microsoft.com/openjdk) (Java Development Kit)
- [Android Studio](https://developer.android.com/studio) com:
  - Android SDK (API 34+)
  - Emulador configurado (ex: Pixel 8)

 Variaveis de Ambiente (Windows)

Configure nas **Variaveis do Sistema** do Windows:

| Variavel | Valor |
|----------|-------|
| `JAVA_HOME` | `C:\Program Files\Java\jdk-17` |
| `ANDROID_HOME` | `C:\Users\<seu-usuario>\AppData\Local\Android\Sdk` |

E adicione ao **PATH**:
```
C:\Program Files\Java\jdk-17\bin
C:\Users\<seu-usuario>\AppData\Local\Android\Sdk\platform-tools
C:\Users\<seu-usuario>\AppData\Local\Android\Sdk\emulator
```

> Importante: Mantenha o projeto em uma pasta sem acentos e sem espacos no caminho. Ex: `C:\projetos\curric`

 Instalacao

```bash
# 1. Acesse a pasta do projeto
cd C:\projetos\curric

# 2. Instale as dependencias
npm install

# 3. Verifique o ambiente
npx react-native doctor
```

 Executar no Android

**Terminal 1 — Iniciar o Metro Bundler:**
```bash
npx react-native start
```

**Terminal 2 — Rodar no emulador/dispositivo:**
```bash
npx react-native run-android
```

> Certifique-se de que o emulador esta aberto no Android Studio antes de rodar o comando acima.

---

 Gerar Build de Producao

 APK (instalacao direta)
```bash
cd android
gradlew.bat assembleRelease
```
Arquivo gerado em: `android/app/build/outputs/apk/release/app-release.apk`

 AAB (Google Play Store)
```bash
cd android
gradlew.bat bundleRelease
```
Arquivo gerado em: `android/app/build/outputs/bundle/release/app-release.aab`

---

 Design

| Elemento | Valor |
|----------|-------|
| Cor primaria | `#C026D3` (roxo/magenta) |
| Cor secundaria | `#EC4899` (rosa) |
| Background | `#F9F5FF` (lilas suave) |
| Destaque | `#8B5CF6` (violeta) |
| Fonte | System font (SF Pro no iOS / Roboto no Android) |

A identidade visual foi construida com tons de **rosa e roxo**, transmitindo acolhimento e leveza, com cards arredondados e gradientes suaves.

---

 Desenvolvimento

Projeto desenvolvido com foco em:

- Codigo 100% em **TypeScript** com tipagem segura
- **Navegacao via estado React** — sem dependencias externas para maior estabilidade
- **Componentizacao** — cada tela isolada em seu proprio arquivo
- **Context API** — estado global limpo e escalavel

---

 Licenca

Este projeto foi desenvolvido para fins educacionais e de apresentacao.

---

Desenvolvido com dedicacao para o bem-estar feminino.
