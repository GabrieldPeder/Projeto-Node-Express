🚀 Projeto Node.js e Express: API de Gerenciamento de Missões Espaciais 🌌

Bem-vindo ao Gerenciador de Missões Espaciais, uma aplicação completa que demonstra o poder do Node.js e Express para criar uma API RESTful robusta, combinada com um frontend interativo para uma experiência de usuário fluida!

Construído com Node.js, Express e SQLite, este projeto oferece todas as operações CRUD (Criar, Ler, Atualizar, Excluir) para missões espaciais, desde o backend até uma interface web amigável.
✨ Tecnologias Utilizadas
🌟 Funcionalidades da API (CRUD)

A API RESTful oferece as seguintes operações para o gerenciamento de missões espaciais:
1. Criar Missão (POST) ➕

    Endpoint: /missions

    Descrição: Adiciona uma nova missão ao banco de dados.

    Corpo da Requisição (JSON):

    {
        "name": "Missão Alfa Centauri",
        "crew": "Capitã Eva, Dr. Leo, Engenheira Kira",
        "spacecraft": "Explorer One",
        "destination": "Alfa Centauri Bb",
        "status": "Planejada",
        "duration": 1200
    }

    Resposta de Sucesso: 201 Created com os dados da missão criada, incluindo o id gerado.

    Resposta de Erro: 400 Bad Request se campos obrigatórios estiverem faltando ou forem inválidos.

2. Ler Missões (GET) 📚

    Obter todas as missões:

        Endpoint: /missions

        Descrição: Retorna uma lista completa de todas as missões cadastradas.

        Resposta de Sucesso: 200 OK com um array de objetos de missões.

    Obter uma missão por ID:

        Endpoint: /missions/:id

        Descrição: Retorna os detalhes de uma missão específica, identificada pelo seu ID único.

        Resposta de Sucesso: 200 OK com o objeto da missão.

        Resposta de Erro:

            400 Bad Request se o ID fornecido não for um número válido.

            404 Not Found se nenhuma missão for encontrada com o ID especificado.

3. Atualizar Missão (PUT) ✏️

    Endpoint: /missions/:id

    Descrição: Atualiza todos os dados de uma missão existente com base no seu ID.

    Corpo da Requisição (JSON):

    {
        "name": "Missão Alfa Centauri (Revisada)",
        "crew": "Capitã Eva, Dr. Leo, Engenheira Kira, Piloto Zé",
        "spacecraft": "Explorer One-B",
        "destination": "Alfa Centauri Bb",
        "status": "Em Andamento",
        "duration": 1250
    }

        Nota: Para o método PUT, é uma prática comum enviar todos os campos da missão, mesmo que apenas alguns tenham sido alterados, pois ele substitui o recurso por completo.

    Resposta de Sucesso: 200 OK com uma mensagem de sucesso e os dados da missão atualizada.

    Resposta de Erro:

        400 Bad Request se o ID for inválido ou o corpo da requisição estiver vazio/inválido.

        404 Not Found se nenhuma missão for encontrada com o ID para atualização.

4. Excluir Missão (DELETE) 🗑️

    Endpoint: /missions/:id

    Descrição: Remove uma missão existente permanentemente do banco de dados, utilizando seu ID.

    Resposta de Sucesso: 204 No Content (indica que a requisição foi bem-sucedida e não há conteúdo para retornar).

    Resposta de Erro:

        400 Bad Request se o ID fornecido não for um número válido.

        404 Not Found se nenhuma missão for encontrada com o ID especificado para exclusão.

🚀 Integração Frontend (Web App)

Além da API, este projeto inclui uma interface de usuário simples e intuitiva construída com HTML, CSS (com Tailwind CSS para agilizar a estilização) e JavaScript (utilizando a Fetch API).

O frontend permite que você interaja com a API de forma visual, realizando todas as operações CRUD (Criação, Leitura, Atualização e Exclusão) diretamente do seu navegador.
Funcionalidades do Frontend:

    Formulário de Missão: Crie novas missões ou edite missões existentes preenchendo os detalhes.

    Listagem Dinâmica: Visualize todas as missões cadastradas em tempo real.

    Busca por ID: Encontre rapidamente uma missão específica.

    Edição In-line: Preencha o formulário automaticamente com os dados da missão selecionada para edição.

    Exclusão com Confirmação: Remova missões com segurança.

    Mensagens de Feedback: Notificações claras sobre o sucesso ou falha das operações.

📁 Estrutura do Projeto

.
├── node_modules/         # 📦 Dependências do projeto (gerenciado pelo npm)
├── src/                  # 📂 Código fonte da aplicação
│   ├── controllers/      # 🧠 Lógica de negócio e manipulação de requisições
│   │   └── missionController.js
│   ├── database/         # 🗄️ Configuração do banco de dados SQLite
│   │   └── db.js
│   ├── frontend/         # 🌐 Arquivos do frontend (HTML, CSS, JavaScript)
│   │   ├── index.html
│   │   ├── script.js
│   │   └── style.css
│   ├── models/           # 📊 Interação com o banco de dados (queries SQL)
│   │   └── missionModel.js
│   └── routes/           # 🛣️ Definição das rotas da API
│       └── missionRoutes.js
├── package.json          # 📄 Metadados do projeto e scripts
├── package-lock.json     # 🔒 Registro de dependências exatas
├── server.js             # 🚀 Ponto de entrada da aplicação Express
├── .gitignore            # 🙈 Arquivos e pastas a serem ignorados pelo Git
├── README.md             # 📖 Este arquivo
└── database.sqlite       # 🗃️ O arquivo do banco de dados SQLite (IGNORADO PELO GIT - não commitar!)

🛠️ Configuração e Execução

Siga os passos abaixo para configurar e colocar sua API e Frontend para rodar em seu ambiente local.
Pré-requisitos

    Node.js: (versão 18.x ou superior recomendada)

    npm: (gerenciador de pacotes do Node.js, vem junto com o Node.js)

    Postman: (ou ferramenta similar para testar APIs, opcional mas recomendado para o backend)

    Navegador Web Moderno: (Chrome, Firefox, Edge, etc., para o frontend)

Passos

    Clone o repositório:

    git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
    cd SEU_REPOSITORIO # Navegue até a pasta raiz do projeto

    (Importante: Substitua SEU_USUARIO e SEU_REPOSITORIO pelos seus dados reais do GitHub!)

    Instale as dependências:
    Na pasta raiz do projeto, execute o comando para instalar todas as bibliotecas necessárias:

    npm install

    Execute a aplicação (Backend e Frontend Integrados!):
    Para iniciar o servidor Express com nodemon (que detecta e reinicia automaticamente a cada mudança no seu código):

    npm run dev

    Você verá a mensagem no terminal: Servidor rodando em http://localhost:3000.

    Acesse o Frontend no Navegador:
    Abra seu navegador web preferido e acesse a URL:
    http://localhost:3000
    Pronto! Você verá a interface de gerenciamento de missões e poderá interagir com sua API diretamente por ela.

    Testar a API diretamente com Postman (Opcional - Apenas Backend):
    Se você deseja testar os endpoints da API separadamente do frontend, pode continuar usando o Postman:

        Criar (POST):

            URL: http://localhost:3000/missions

            Método: POST

            Body: raw -> JSON (com os dados da nova missão)

        Ler Todas (GET):

            URL: http://localhost:3000/missions

            Método: GET

        Ler Por ID (GET):

            URL: http://localhost:3000/missions/ID_DA_MISSAO (substitua ID_DA_MISSAO por um ID real, ex: http://localhost:3000/missions/1)

            Método: GET

        Atualizar (PUT):

            URL: http://localhost:3000/missions/ID_DA_MISSAO

            Método: PUT

            Body: raw -> JSON (com os dados atualizados da missão)

        Excluir (DELETE):

            URL: http://localhost:3000/missions/ID_DA_MISSAO

            Método: DELETE

🤝 Contribuição

Sinta-se à vontade para explorar este projeto, testar as funcionalidades, reportar bugs ou sugerir melhorias. Suas contribuições são muito bem-vindas!
📄 Licença

Este projeto está licenciado sob a licença MIT.
