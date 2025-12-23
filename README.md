mobile-pizzaria 
🍕 Visão Geral do Projeto

O mobile-pizzaria é um aplicativo móvel desenvolvido para facilitar o processo de realização de pedidos em uma pizzaria. Construído com uma stack moderna para desenvolvimento cross-platform, o projeto utiliza Expo e React Native para a interface, garantindo uma experiência nativa em dispositivos Android e iOS. A arquitetura do código é baseada em TypeScript, promovendo maior segurança e manutenibilidade.

✨ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

| Categoria | Tecnologia | Descrição |
| --- | --- | --- |
| **Framework** | Expo | Plataforma para desenvolvimento universal de aplicativos React Native. |
| **Linguagem** | TypeScript | Superset do JavaScript que adiciona tipagem estática, melhorando a manutenibilidade e a qualidade do código. |
| **Estilização** | NativeWind / Tailwind CSS | Framework CSS utility-first para estilização rápida e responsiva, adaptado para React Native. |
| **Roteamento** | Expo Router | Roteamento baseado em arquivos para gerenciamento de navegação e telas na aplicação. |
| **Comunicação** | Axios | Cliente HTTP baseado em Promises para requisições assíncronas à API. |
| **Gerenciamento de Estado** | Context API / Hooks | Utilização de Contextos e Hooks customizados para gestão de estado global (e.g., pedidos e autenticação). |



⚙️ Funcionalidades Principais

O sistema oferece as seguintes funcionalidades:

•
Autenticação de Usuário: Tela de login para acesso à área restrita do aplicativo.

•
Visualização de Produtos: Listagem e detalhamento de categorias e produtos (pizzas, bebidas, etc.).

•
Gestão de Pedidos: Funcionalidade para criar, adicionar itens e enviar pedidos para a pizzaria.

•
Rotas Protegidas: Separação de rotas públicas e privadas (autenticadas) utilizando o Expo Router.

🛠️ Instalação e Configuração

Para rodar o projeto localmente, siga os passos abaixo:

Pré-requisitos

Certifique-se de ter o Node.js (versão 18+) e o yarn (ou npm/pnpm) instalados em sua máquina. Além disso, é necessário ter o Expo Go instalado em seu dispositivo móvel ou um emulador/simulador configurado.

Clonar o Repositório

Bash


git clone https://github.com/samuelgomes0309/mobile-pizzaria.git
cd mobile-pizzaria


2. Instalar Dependências

Utilize o gerenciador de pacotes de sua preferência:

Bash


# Usando yarn (recomendado pelo lock file )
yarn install

# Ou usando npm
npm install

# Ou usando pnpm
pnpm install


3. Rodar a Aplicação

Inicie o servidor de desenvolvimento do Expo:

Bash


npx expo start


Após a execução, um QR Code será exibido no terminal. Você pode:

•
Escanear o QR Code com o aplicativo Expo Go no seu celular (iOS ou Android).

•
Pressionar a para abrir no Android Emulator.

•
Pressionar i para abrir no iOS Simulator.

A aplicação estará acessível no seu dispositivo ou emulador.

