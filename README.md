# MyHealthWeb

# Guia de instalação e um de configuração

**Guia de Instalação**

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/seu-usuario/myhealth-web.git
   cd myhealth-web
   ```

2. **Instalar Dependências:**
   Certifique-se de ter o Node.js instalado. Execute o seguinte comando para instalar as dependências:
   ```bash
   npm install
   ```

3. **Configurar o JSON de Usuários:**
   - Abra o arquivo `users.json` localizado na pasta `data`.
   - Adicione os usuários desejados com os campos `email` e `senha`.

4. **Executar a Aplicação:**
   ```bash
   npm start
   ```
   A aplicação estará disponível em `http://localhost:3000`.

**Guia de Configuração**

1. **Layout e Cores:**
   - Certifique-se de seguir o protótipo para manter o layout e cores conforme as especificações.

2. **Autenticação e Cadastro de Usuários:**
   - A autenticação e cadastro de usuários são gerenciados pelo arquivo `users.json` na pasta `data`.
   - Para cada usuário, adicione um objeto com os campos `email` e `senha`.

3. **Barra de Navegação:**
   - A barra superior de navegação contém os menus ENTRAR/LOGOUT e MINHAS VACINAS.
   - Certifique-se de que a barra de navegação está presente em todas as páginas e funciona conforme os critérios.

4. **Popup de Confirmação:**
   - Implemente a exibição de uma caixa de diálogo (popup) para confirmar a exclusão de uma vacina.

5. **Manipulação do DOM:**
   - Certifique-se de que a manipulação do DOM usando JavaScript está implementada conforme os critérios estabelecidos, como o carregamento da lista de vacinas na tela home e a alteração dos dados na página de edição de vacinação.

6. **Componente de Cartão de Vacina:**
   - Desenvolva uma função que retorna um "componente" contendo a estrutura de elementos HTML de um cartão de vacina.

7. **Recuperação de Senha:**
   - Implemente a recuperação de senha por meio do e-mail cadastrado no JSON.

8. **Impedir Acesso Não Autorizado:**
   - Certifique-se de que o acesso às páginas pós-login é impedido sem um usuário autenticado.

9. **Atualização Dinâmica da Lista de Vacinas:**
   - Garanta que a lista de vacinas na tela Home seja atualizada dinamicamente após a alteração, criação ou exclusão de vacinas.

10. **Captura de Eventos:**
   - Capture eventos de cliques nos elementos de interface, como botões e links, conforme especificado nos critérios.

11. **Validação de Senha:**
   - Implemente a validação do campo senha e repetir senha na página de cadastro, permitindo o cadastro somente se os valores forem iguais.

12. **Barra de Pesquisa:**
   - Implemente uma barra de pesquisa para buscar vacinas pelo campo "nome da vacina" e atualizar a lista de vacinação de acordo com o valor inserido.

**Observação:** Certifique-se de que todas as funcionalidades e critérios especificados nos critérios avaliativos sejam atendidos para garantir o bom funcionamento e a pontuação máxima do projeto.

# Documento de Especificações - Projeto MyHealth Web

## 1. Introdução

O Projeto MyHealth Web tem como objetivo principal implementar uma carteira de vacinação digital para controle das vacinas recebidas por indivíduos, incluindo a imagem do comprovante vacinal e as datas das próximas doses. Este documento descreve os requisitos funcionais e não funcionais do sistema, fornecendo uma visão abrangente dos objetivos e critérios de avaliação.

## 2. Requisitos Funcionais

### 2.1 Cadastro de Usuários

- RF1: Cada usuário pode controlar as vacinas de apenas uma pessoa.

### 2.2 Recuperação de Senha

- RF2: Possibilidade de redefinir senha via e-mail cadastrado.

### 2.3 Autenticação de Usuário

- RF3: Validar credenciais (email/senha) informadas pelo usuário.

### 2.4 Controle de Vacinas Aplicadas

- RF4: Cadastro, edição, exclusão e visualização de vacinas aplicadas.

### 2.5 Pesquisa de Vacinas

- RF5: Buscar e exibir vacinas informadas pelo usuário.

### 2.6 Recuperação e Apresentação da Lista de Vacinas (JSON)

- RF6: Recuperar e apresentar a lista de vacinas de um usuário do JSON.

### 2.7 Cadastro de Nova Vacina (JSON)

- RF7: Cadastrar uma nova vacina em JSON.

### 2.8 Alteração de Vacinação Existente (JSON)

- RF8: Alterar uma vacinação existente no JSON.

### 2.9 Exclusão de Vacinação (JSON)

- RF9: Excluir uma vacinação no JSON.

### 2.10 Barra de Pesquisa de Elementos

- RF10: Buscar vacinas pelo campo "nome da vacina". Atualizar a lista de vacinas de acordo com a mudança na barra de pesquisa.

### 2.11 Manutenção da Lista de Vacinas na Tela Home

- RF11: Manter a lista de vacinas atualizada na tela Home após alteração/criação/exclusão.

### 2.12 Controle de Usuário (JSON)

- RF12: Cadastro, autenticação e redefinição de senha utilizando JSON.

### 2.13 Restrição de Acesso

- RF13: Impedir acesso às páginas pós-login sem usuário autenticado.

## 3. Requisitos Não Funcionais

### 3.1 Elaboração de Páginas

- RNF1: Elaboração de todas as páginas do aplicativo seguindo o layout e cores do protótipo.

### 3.2 Captura de Eventos

- RNF2: Captura do evento cliques nos elementos de interface como botões, links, etc.

### 3.3 Validação de Campos

- RNF3: Validação do campo senha e repetir senha da página Criar Conta.

### 3.4 Navegação

- RNF4: Navegação entre as páginas.

### 3.5 Barra Superior de Navegação

- RNF5: Implementação da barra superior de navegação contendo os menus ENTRAR/LOGOUT e MINHAS VACINAS.

### 3.6 Exibição de Caixa de Diálogo

- RNF6: Exibição de caixa de diálogo (popup) para confirmar exclusão de uma vacina.

### 3.7 Manipulação do DOM

- RNF7: Manipulação da estrutura do DOM usando Javascript para carregamento da lista de vacinas na tela home e dados na página de alteração de uma vacinação existente.

### 3.8 Criação de Componentes

- RNF8: Criação de uma função que retorna um “componente” com a estrutura HTML de um cartão de vacina.

# Requisitos do sistema

Abaixo estão os requisitos funcionais e não funcionais do projeto MyHealth Web:

### Requisitos Funcionais

| ID | Descrição |
|----|------------|
| RF1 | Cadastro de usuários: Cada usuário pode controlar as vacinas de apenas uma pessoa. |
| RF2 | Recuperação de senha: Possibilidade de redefinir senha via e-mail cadastrado. |
| RF3 | Autenticação de usuário: Validar credenciais (email/senha) informadas pelo usuário. |
| RF4 | Controle de vacinas aplicadas: Cadastro, edição, exclusão e visualização de vacinas aplicadas. |
| RF5 | Pesquisa de vacinas: Buscar e exibir vacinas informadas pelo usuário. |
| RF6 | Recuperação e apresentação da lista de vacinas de um usuário do JSON. |
| RF7 | Cadastro de uma nova vacina em JSON. |
| RF8 | Alteração de uma vacinação existente no JSON. |
| RF9 | Exclusão de uma vacinação no JSON. |
| RF10 | Barra de pesquisa de elementos: Buscar vacinas pelo campo "nome da vacina". |
| RF11 | Manter a lista de vacinas atualizada na tela Home. |
| RF12 | Controle de usuário: Cadastro, autenticação e redefinição de senha utilizando JSON. |
| RF13 | Impedir acesso às páginas pós-login sem usuário autenticado. |

### Requisitos Não Funcionais

| ID | Descrição |
|----|------------|
| RNF1 | Elaboração de todas as páginas do aplicativo seguindo o layout e cores do protótipo. |
| RNF2 | Captura do evento cliques nos elementos de interface como botões, links, etc. |
| RNF3 | Validação do campo senha e repetir senha da página Criar Conta. |
| RNF4 | Navegação entre as páginas. |
| RNF5 | Implementação da barra superior de navegação contendo os menus ENTRAR/LOGOUT e MINHAS VACINAS. |
| RNF6 | Exibição de caixa de diálogo (popup) para confirmar exclusão de uma vacina. |
| RNF7 | Manipulação da estrutura do DOM usando Javascript para carregamento da lista de vacinas na tela home e dados na página de alteração de uma vacinação existente. |
| RNF8 | Criação de uma função que retorna um “componente” com a estrutura HTML de um cartão de vacina. |
