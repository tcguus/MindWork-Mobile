# MindWork Mobile 

> **Global Solution - Future of Work**
> Solução mobile integrada para monitoramento de saúde mental corporativa, focada no combate ao Burnout e na promoção do bem-estar.

> **IMPORTANTE:** Para o melhor funcionamento do projeto, recomenda-se utilizar o **emulador Pixel 6 Pro** no Android Studio, pois ele oferece a melhor compatibilidade visual com os componentes utilizados, especialmente os modais e mapas.


---

##  Links Importantes

*  **Vídeo de Demonstração : https://youtu.be/F1hrvxNhxLc**
*  **Repositório da API (.NET): https://github.com/tcguus/MindWork-API**


---

##  Descrição da Solução

O **MindWork Mobile** é a interface do colaborador para a plataforma MindWork. O aplicativo permite que funcionários monitorem sua saúde mental de forma proativa através de autoavaliações diárias, visualizem seu histórico emocional e recebam recomendações personalizadas geradas por Inteligência Artificial.

---

##  Funcionalidades e Telas

O aplicativo conta com **8 telas** distintas, organizadas através de um menu lateral (Drawer) e navegação em pilha (Stack).

###  1. Autenticação e Segurança
* **LoginScreen:** Tela de entrada com validação de credenciais (e-mail e senha). Realiza a autenticação via JWT integrando com a API e armazena o token de sessão localmente.
* **RegisterScreen (Sign Up):** Formulário para cadastro de novos colaboradores. Permite definir nome, e-mail corporativo, senha e função (Colaborador/Gestor). Inclui validação de campos e feedback de conflito (caso o e-mail já exista).
* **Logout:** Funcionalidade acessível via Perfil ou Menu Lateral que encerra a sessão e limpa os dados armazenados.

###  2. Dashboard (Home)
* **HomeScreen:** A tela principal do aplicativo.
    * **Saudação Personalizada:** Exibe o nome do usuário logado.
    * **Data Atual:** Contextualiza o usuário.
    * **Ação Rápida:** Botão de destaque para realizar o "Check-in" diário (Nova Avaliação).
    * **Recomendações de IA:** Consome o endpoint de IA da API para exibir dicas personalizadas baseadas no histórico recente do usuário.
    * **Pull-to-Refresh:** Permite atualizar as recomendações arrastando a tela.

###  3. CRUD de Autoavaliações (Core)
* **NewAssessmentScreen (Create & Update):**
    * Uma tela inteligente que serve tanto para **Criar** quanto para **Editar**.
    * **Seletores Visuais:** Utiliza metáforas de clima (Tempestade a Ensolarado) para o humor, e escalas numéricas coloridas para Estresse e Carga de Trabalho.
    * **Lógica de Edição:** Se receber dados de uma avaliação existente, preenche os campos automaticamente e altera o comportamento do botão para "Atualizar" (PUT). Caso contrário, cria um novo registro (POST).
* **HistoryScreen (Read - Lista):**
    * Exibe o histórico de avaliações do usuário em uma lista cronológica.
    * Cada card mostra a data, o ícone do humor e badges de alerta para níveis altos de estresse ou carga.
    * Permite clicar em qualquer item para ver detalhes.
* **AssessmentDetailsScreen (Read - Detalhe & Delete):**
    * Exibe todas as informações de um registro específico.
    * **Botão Editar:** Redireciona para a tela de formulário com os dados carregados.
    * **Botão Excluir:** Permite remover o registro do banco de dados após confirmação do usuário.

###  4. Configurações e Informações
* **ProfileScreen:** Exibe os dados do usuário logado (Nome, E-mail e Cargo) e opções de configuração.
* **AboutScreen:** Tela informativa contendo a versão do app, lista de desenvolvedores (integrantes do grupo) e o **Hash do Commit** de referência da entrega.

---

##  Tecnologias e Arquitetura

O projeto foi desenvolvido utilizando **React Native (Expo)** com uma arquitetura modular:

* **Framework:** Expo SDK 51 (Versão Estável).
* **Linguagem:** JavaScript (ES6+).
* **Navegação:** React Navigation (Drawer + Stack).
* **Comunicação API:** Axios (RESTful).
* **Gerenciamento de Estado:** Context API (`AuthContext` para sessão do usuário).
* **Armazenamento Local:** AsyncStorage (Persistência de Token).
* **Estilização:** StyleSheet com Design System centralizado (`src/theme`).

### Estrutura de Pastas
* `src/contexts`: Gerenciamento de estado global (AuthContext).
* `src/navigation`: Configuração de rotas (AppNavigator, AuthNavigator).
* `src/screens`: Telas do aplicativo divididas por funcionalidade (Auth, Dashboard, Assessments, Profile).
* `src/services`: Configuração da API (Axios).
* `src/theme`: Definições de cores, fontes e espaçamentos.

---

##  Como Rodar o Projeto

Para o funcionamento completo (Login, CRUD), é necessário rodar a API Backend localmente antes de iniciar o aplicativo.

### Parte 1: Rodando a API (.NET)

1.  **Clone o repositório da API:**
    ```bash
    git clone https://github.com/tcguus/MindWork-API
    cd MindWork.Api
    ```

2.  **Restaure as dependências e configure o Banco de Dados:**
    Certifique-se de ter o SQL Server rodando e a ConnectionString configurada no `appsettings.json`.
    ```bash
    dotnet restore
    dotnet ef database update -p MindWork.Api -s MindWork.Api
    ```

3.  **Inicie a API:**
    ```bash
    dotnet run --project MindWork.Api
    ```
    *Anote a porta em que a API está rodando (ex: `http://localhost:5121`).*

---

### Parte 2: Rodando o Aplicativo Mobile

1.  **Clone este repositório:**
    ```bash
    git clone https://github.com/tcguus/MindWork-Mobile
    cd mindwork-mobile
    ```

2.  **Configure o IP da API:**
    Abra o arquivo `src/services/api.js` e ajuste a `baseURL` conforme seu ambiente:
    * **Emulador Android:** `http://10.0.2.2:5121/api/v1`
    * **Dispositivo Físico / Emulador iOS:** Use o IP da sua máquina na rede local (ex: `http://192.168.1.X:5121/api/v1`).

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Execute o projeto:**
    ```bash
    npx expo start --clear
    ```
    * Pressione `a` para abrir no Android.
    * Ou escaneie o QR Code com o app Expo Go.

---

## Nossos integrantes
- **Gustavo Camargo de Andrade**
- RM555562
- 2TDSPF
-------------------------------------------
- **Rodrigo Souza Mantovanello**
- RM555451
- 2TDSPF
-------------------------------------------
- **Leonardo Cesar Rodrigues Nascimento**
- RM558373
- 2TDSPF


© 2025 MindWork Inc.
