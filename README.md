Projeto Node.js e Express: API de Gerenciamento de Missões Espaciais

Este projeto é uma API RESTful simples construída com Node.js e o framework Express, utilizando SQLite como banco de dados. O objetivo é gerenciar missões espaciais, permitindo a criação, leitura e atualização de registros de missões.

Este README documenta as funcionalidades implementadas e as instruções para configurar e executar o projeto.
Funcionalidades Implementadas (CRUD)

Até o momento, a API oferece as seguintes operações para gerenciamento de missões:
1. Criação de Missão (Create)

    Endpoint: POST /missions

    Descrição: Adiciona uma nova missão ao banco de dados.

    Corpo da Requisição (JSON):

    {
        "name": "Nome da Missão",
        "crew": "Nome(s) da Tripulação",
        "spacecraft": "Nome da Nave",
        "destination": "Destino da Missão",
        "status": "Planejada | Em Andamento | Concluída | Cancelada",
        "duration": 123
    }

    Resposta de Sucesso: 201 Created com os dados da missão criada, incluindo o id gerado.

    Resposta de Erro: 400 Bad Request se campos obrigatórios estiverem faltando.

2. Leitura de Missões (Read)

    Obter todas as missões:

        Endpoint: GET /missions

        Descrição: Retorna uma lista de todas as missões cadastradas.

        Resposta de Sucesso: 200 OK com um array de objetos de missões.

    Obter uma missão por ID:

        Endpoint: GET /missions/:id

        Descrição: Retorna os detalhes de uma missão específica pelo seu ID.

        Resposta de Sucesso: 200 OK com o objeto da missão.

        Resposta de Erro:

            400 Bad Request se o ID fornecido não for um número válido.

            404 Not Found se nenhuma missão for encontrada com o ID especificado.

3. Atualização de Missão (Update)

    Endpoint: PUT /missions/:id

    Descrição: Atualiza os dados de uma missão existente com base no seu ID.

    Corpo da Requisição (JSON):

    {
        "name": "Novo Nome da Missão",
        "crew": "Nova Tripulação",
        "spacecraft": "Nova Nave",
        "destination": "Novo Destino",
        "status": "Novo Status",
        "duration": 456
    }

        Nota: Você pode enviar apenas os campos que deseja atualizar, mas para garantir, é recomendável enviar todos os campos que compõem a missão.

    Resposta de Sucesso: 200 OK com uma mensagem de sucesso e os dados da missão atualizada.

    Resposta de Erro:

        400 Bad Request se o ID for inválido ou o corpo da requisição estiver vazio.

        404 Not Found se nenhuma missão for encontrada com o ID para atualização.

Estrutura do Projeto

.
├── node_modules/         # Dependências do projeto (gerenciado pelo npm)
├── src/
│   ├── controllers/      # Lógica de negócio e manipulação de requisições
│   │   └── missionController.js
│   ├── database/         # Configuração do banco de dados SQLite
│   │   └── db.js
│   ├── models/           # Interação com o banco de dados (queries SQL)
│   │   └── missionModel.js
│   └── routes/           # Definição das rotas da API
│       └── missionRoutes.js
├── package.json          # Metadados do projeto e scripts
├── package-lock.json     # Registro de dependências exatas
├── server.js             # Ponto de entrada da aplicação Express
├── .gitignore            # Arquivos e pastas a serem ignorados pelo Git
└── README.md             # Este arquivo
└── database.sqlite       # O arquivo do banco de dados SQLite (IGNORADO PELO GIT)

Configuração e Execução

Siga os passos abaixo para configurar e executar a API em seu ambiente local.
Pré-requisitos

    Node.js (versão 18.x ou superior recomendada)

    npm (gerenciador de pacotes do Node.js, vem com o Node.js)

    Postman (ou ferramenta similar para testar APIs)

Passos

    Clone o repositório:

    git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
    cd SEU_REPOSITORIO # Navegue até a pasta raiz do projeto

    (Substitua SEU_USUARIO e SEU_REPOSITORIO pelos seus dados reais do GitHub)

    Instale as dependências:
    Na pasta raiz do projeto, execute:

    npm install

    Execute a aplicação:
    Para iniciar o servidor com nodemon (que reinicia automaticamente a cada mudança no código):

    npm run dev

    O servidor estará rodando em http://localhost:3000.

    Testar a API com Postman:
    Utilize o Postman para enviar requisições para os endpoints listados na seção "Funcionalidades Implementadas".

        Criar (POST):

            URL: http://localhost:3000/missions

            Método: POST

            Body: raw -> JSON (com os dados da missão)

        Ler Todas (GET):

            URL: http://localhost:3000/missions

            Método: GET

        Ler Por ID (GET):

            URL: http://localhost:3000/missions/1 (substitua 1 pelo ID da missão)

            Método: GET

        Atualizar (PUT):

            URL: http://localhost:3000/missions/1 (substitua 1 pelo ID da missão a ser atualizada)

            Método: PUT

            Body: raw -> JSON (com os dados atualizados da missão)

Contribuição

Sinta-se à vontade para explorar, testar e contribuir com este projeto.
Licença

Este projeto está licenciado sob a licença MIT.
