// Define a URL base da API
const API_BASE_URL = 'http://localhost:3000/missions';

// Referências aos elementos do DOM
const missionForm = document.getElementById('mission-form');
const missionIdInput = document.getElementById('mission-id');
const formTitle = document.getElementById('form-title');
const cancelButton = document.getElementById('cancel-update');
const missionsList = document.getElementById('missions-list');
const loadingMessage = document.getElementById('loading-message');
const searchIdInput = document.getElementById('search-id');
const searchButton = document.getElementById('search-button');
const showAllButton = document.getElementById('show-all-button');
const searchResultDiv = document.getElementById('search-result');
const messageModal = document.getElementById('message-modal');
const modalText = document.getElementById('modal-text');
const closeButton = document.querySelector('.close-button');

// --- Funções Auxiliares ---

// Função para exibir mensagens no modal
function showModal(message, isError = false) {
    modalText.textContent = message;
    modalText.className = `text-lg text-center font-medium ${isError ? 'text-red-600' : 'text-green-600'}`;
    messageModal.style.display = 'flex'; // Exibe o modal
}

// Função para fechar o modal
closeButton.onclick = function() {
    messageModal.style.display = 'none';
};

// Fecha o modal se clicar fora dele
window.onclick = function(event) {
    if (event.target == messageModal) {
        messageModal.style.display = 'none';
    }
};

// Função para limpar o formulário
function clearForm() {
    missionForm.reset(); // Limpa todos os campos do formulário
    missionIdInput.value = ''; // Garante que o ID oculto também seja limpo
    formTitle.textContent = 'Criar Nova Missão'; // Volta para o título padrão
    cancelButton.classList.add('hidden'); // Esconde o botão de cancelar
}

// Função para renderizar uma única missão em um card HTML
function renderMission(mission) {
    const missionCard = document.createElement('div');
    missionCard.className = 'bg-white p-4 rounded-md shadow-sm border border-gray-200';
    missionCard.innerHTML = `
        <h3 class="text-xl font-semibold text-gray-900">${mission.name}</h3>
        <p class="text-gray-700"><strong>ID:</strong> ${mission.id}</p>
        <p class="text-gray-700"><strong>Tripulação:</strong> ${mission.crew}</p>
        <p class="text-gray-700"><strong>Nave:</strong> ${mission.spacecraft}</p>
        <p class="text-gray-700"><strong>Destino:</strong> ${mission.destination}</p>
        <p class="text-gray-700"><strong>Status:</strong> ${mission.status}</p>
        <p class="text-gray-700"><strong>Duração:</strong> ${mission.duration} dias</p>
        <div class="mt-4 flex space-x-2">
            <button data-id="${mission.id}" class="edit-button px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">Editar</button>
            <button data-id="${mission.id}" class="delete-button px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Excluir</button>
        </div>
    `;
    return missionCard;
}

// Função para carregar e exibir todas as missões da API
async function loadMissions() {
    missionsList.innerHTML = ''; // Limpa a lista atual de missões
    loadingMessage.classList.remove('hidden'); // Mostra a mensagem de carregamento

    try {
        const response = await fetch(API_BASE_URL); // Faz uma requisição GET para a API
        if (!response.ok) {
            // Se a resposta não for OK, lança um erro
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const missions = await response.json(); // Converte a resposta para JSON

        loadingMessage.classList.add('hidden'); // Esconde a mensagem de carregamento

        if (missions.length === 0) {
            missionsList.innerHTML = '<p class="text-center text-gray-500">Nenhuma missão cadastrada ainda.</p>';
        } else {
            // Adiciona cada missão à lista
            missions.forEach(mission => {
                missionsList.appendChild(renderMission(mission));
            });
        }
    } catch (error) {
        console.error('Erro ao carregar missões:', error);
        loadingMessage.textContent = 'Erro ao carregar missões. Tente novamente mais tarde.';
        loadingMessage.classList.remove('hidden');
        showModal('Erro ao carregar missões. Verifique o console.', true); // Exibe erro no modal
    }
}

// --- Funções CRUD (Interação com a API) ---

// Event Listener para o formulário de Criar/Atualizar Missão
missionForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita o recarregamento padrão da página

    const id = missionIdInput.value; // Pega o ID da missão (se estiver editando)
    const missionData = {
        name: document.getElementById('name').value,
        crew: document.getElementById('crew').value,
        spacecraft: document.getElementById('spacecraft').value,
        destination: document.getElementById('destination').value,
        status: document.getElementById('status').value,
        duration: parseInt(document.getElementById('duration').value) // Converte para número inteiro
    };

    try {
        let response;
        if (id) {
            // Se houver um ID, é uma operação de atualização (PUT)
            response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(missionData) // Envia os dados como JSON
            });
        } else {
            // Se não houver ID, é uma operação de criação (POST)
            response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(missionData)
            });
        }

        const result = await response.json(); // Converte a resposta para JSON

        if (!response.ok) {
            // Se a resposta não for OK, lança um erro com a mensagem da API ou status HTTP
            throw new Error(result.message || `Erro HTTP: ${response.status}`);
        }

        showModal(id ? 'Missão atualizada com sucesso!' : 'Missão criada com sucesso!'); // Exibe mensagem de sucesso
        clearForm(); // Limpa o formulário
        loadMissions(); // Recarrega a lista de missões para refletir a mudança
    } catch (error) {
        console.error('Erro ao salvar missão:', error);
        showModal(`Erro ao salvar missão: ${error.message}`, true); // Exibe erro no modal
    }
});

// Event Listener para os botões de Excluir Missão (delegação de evento)
missionsList.addEventListener('click', async (e) => {
    // Verifica se o clique foi em um botão com a classe 'delete-button'
    if (e.target.classList.contains('delete-button')) {
        const id = e.target.dataset.id; // Pega o ID do atributo data-id do botão
        // Confirmação antes de excluir
        if (confirm(`Tem certeza que deseja excluir a missão com ID ${id}?`)) {
            try {
                const response = await fetch(`${API_BASE_URL}/${id}`, {
                    method: 'DELETE' // Requisição DELETE
                });

                if (!response.ok) {
                    // Se a resposta não for OK, tenta ler a mensagem de erro da API
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
                }

                showModal('Missão excluída com sucesso!'); // Exibe mensagem de sucesso
                loadMissions(); // Recarrega a lista de missões
            } catch (error) {
                console.error('Erro ao excluir missão:', error);
                showModal(`Erro ao excluir missão: ${error.message}`, true); // Exibe erro no modal
            }
        }
    }
});

// Event Listener para os botões de Editar Missão (delegação de evento)
missionsList.addEventListener('click', async (e) => {
    // Verifica se o clique foi em um botão com a classe 'edit-button'
    if (e.target.classList.contains('edit-button')) {
        const id = e.target.dataset.id; // Pega o ID do atributo data-id do botão
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`); // Faz um GET para obter os dados da missão
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            const mission = await response.json(); // Obtém os dados da missão

            // Preenche o formulário com os dados da missão para edição
            missionIdInput.value = mission.id;
            document.getElementById('name').value = mission.name;
            document.getElementById('crew').value = mission.crew;
            document.getElementById('spacecraft').value = mission.spacecraft;
            document.getElementById('destination').value = mission.destination;
            document.getElementById('status').value = mission.status;
            document.getElementById('duration').value = mission.duration;

            formTitle.textContent = `Editar Missão (ID: ${mission.id})`; // Muda o título do formulário
            cancelButton.classList.remove('hidden'); // Mostra o botão de cancelar edição
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo da página para facilitar a edição
        } catch (error) {
            console.error('Erro ao carregar missão para edição:', error);
            showModal('Erro ao carregar missão para edição. Verifique o console.', true); // Exibe erro no modal
        }
    }
});

// Event Listener para o botão de Cancelar Atualização
cancelButton.addEventListener('click', clearForm);

// Event Listener para o botão de Buscar Missão por ID
searchButton.addEventListener('click', async () => {
    const id = searchIdInput.value; // Pega o ID do campo de busca
    searchResultDiv.innerHTML = ''; // Limpa o resultado anterior
    searchResultDiv.classList.add('hidden'); // Esconde o div de resultado por padrão

    if (!id) {
        showModal('Por favor, digite um ID para buscar.', true);
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`); // Faz um GET para buscar a missão por ID
        if (!response.ok) {
            // Se não for 200 OK, tenta ler a mensagem de erro da API
            const errorData = await response.json();
            throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
        }
        const mission = await response.json(); // Obtém os dados da missão

        // Exibe o resultado da busca
        searchResultDiv.classList.remove('hidden');
        searchResultDiv.appendChild(renderMission(mission)); // Renderiza a missão encontrada
        showModal('Missão encontrada!');
    } catch (error) {
        console.error('Erro ao buscar missão por ID:', error);
        searchResultDiv.classList.add('hidden'); // Garante que o div de resultado esteja escondido em caso de erro
        showModal(`Erro ao buscar missão: ${error.message}`, true); // Exibe erro no modal
    }
});

// Event Listener para o botão de Mostrar Todas as Missões
showAllButton.addEventListener('click', () => {
    searchIdInput.value = ''; // Limpa o campo de busca por ID
    searchResultDiv.innerHTML = ''; // Limpa o resultado da busca
    searchResultDiv.classList.add('hidden'); // Esconde o div de resultado
    loadMissions(); // Recarrega e exibe todas as missões na lista principal
});


// --- Inicialização ---
// Carrega as missões quando o conteúdo do DOM é completamente carregado
document.addEventListener('DOMContentLoaded', loadMissions);
