# 🧭 Desafio Formulário de Registro Multi-Etapas

<img width="730" height="820" alt="cadastro" src="https://github.com/user-attachments/assets/eee6e25e-86f2-4f6e-a575-5026b1b470a3" />

---

## 🚀 Funcionalidades Principais

### Processo de Registro em 5 Etapas

**1. Informações Pessoais → 2. Endereço → 3. Conta → 4. Preferências → 5. Revisão**

### Recursos Principais

- **Validação Completa:** Utiliza **Zod** para validação de todos os campos
- **Persistência de Dados:** Armazena os dados localmente com **Zustand**
- **Barra de Progresso:** Indica visualmente o avanço entre as etapas
- **Design Responsivo:** Totalmente adaptável a qualquer tamanho de tela

---

## 📋 Detalhes das Etapas

### 1️⃣ Informações Pessoais

- Nome completo, CPF/CNPJ, e-mail, telefone e data de nascimento
- Formatação em tempo real para CPF/CNPJ e telefone
- Validação de idade mínima (18+ anos)

### 2️⃣ Endereço

- **Auto-preenchimento via CEP** usando a API **ViaCEP**
- Validação e formatação de CEP em tempo real
- Preenchimento automático de rua, bairro, cidade e estado

### 3️⃣ Conta

- Criação de **nome de usuário** com regras de validação
- Senha com **indicador de força**
- Escolha de plano com **cartões visuais comparativos**
- Integração com **API mock** para dados de planos

### 4️⃣ Preferências

- Preferências de notificação (e-mail, SMS, push)
- Escolha de tema com **pré-visualização ao vivo**
- Seleção de interesses com opções pré-definidas

### 5️⃣ Revisão e Confirmação

- Revisão completa de todos os dados
- Possibilidade de editar cada seção
- Feedback visual de sucesso/erro após o envio

---

## 🛠️ Recursos Técnicos

### Validação e Formulários

- **React Hook Form** para gerenciamento de formulários
- **Zod** para validação de esquemas
- Feedback de erro em tempo real
- Regras de validação personalizadas

### Gerenciamento de Estado

- **Zustand** com persistência via localStorage
- Tipagem forte e segura
- Compartilhamento de dados entre etapas

### Interface e Experiência do Usuário

- **Tailwind CSS** para estilização
- Componente personalizado de **barra de progresso**
- **Toasts** para mensagens de feedback
- Estados de carregamento e tratamento de erros

### Integrações com API

- **ViaCEP:** para busca automática de endereços brasileiros
- **Mock API:** simula carregamento de planos e envio do formulário
- Manipulação assíncrona com tratamento de erros

---

### Teste unitário

<img width="655" height="411" alt="teste" src="https://github.com/user-attachments/assets/e9f61bf4-388f-4d6c-9d16-3cf058862029" />

## ⚙️ Instalação e Configuração

### Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**

### Passos de Instalação

```bash
# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev

# Gere o build de produção
npm run build

```
