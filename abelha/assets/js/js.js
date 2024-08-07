document.getElementById("adicionarDiv").addEventListener("click", criarDiv);
document.getElementById("exibirDiv").addEventListener("click", exibirDivSelecionada);

let divsData = [];

function criarDiv() {
    const container = document.getElementById("container");

    const square = document.createElement("div");
    square.classList.add("square");

    const imageUrl = prompt("Insira o URL da imagem:");
    if (imageUrl) {
        const img = document.createElement("img");
        img.src = imageUrl;
        square.appendChild(img);

        let descricao = prompt("Insira uma descrição (limite de 20 caracteres):");

        if (descricao) {
            // Limitar a descrição a 15 caracteres
            descricao = descricao.slice(0, 20);

            const descricaoElement = document.createElement("p");
            descricaoElement.textContent = descricao;
            square.appendChild(descricaoElement);

            // Armazenar a imagem e descrição no array em memória
            divsData.push({ imageUrl, descricao });

            // Atualizar o Local Storage
            atualizarLocalStorage();
        } else {
            square.textContent = "Sem descrição";
        }
    } else {
        square.textContent = "Sem imagem";
    }

    container.appendChild(square);
}


function exibirDivSelecionada() {
    const divSelecionada = document.getElementById("divSelecionada");
    divSelecionada.innerHTML = "";

    const index = prompt("Insira o índice da div a ser exibida:");

    if (index >= 0 && index < divsData.length) {
        const divData = divsData[index];
        const square = document.createElement("div");
        square.classList.add("square");

        const img = document.createElement("img");
        img.src = divData.imageUrl;
        square.appendChild(img);

        const descricaoElement = document.createElement("p");
        descricaoElement.textContent = divData.descricao;
        square.appendChild(descricaoElement);

        divSelecionada.appendChild(square);
    } else {
        divSelecionada.textContent = "Índice inválido.";
    }
}

// Carregar divs com imagens e descrições do Local Storage ao carregar a página
window.addEventListener("load", () => {
    divsData = obterDadosDoLocalStorage();
    divsData.forEach(divData => {
        criarDivFromLocalStorage(divData.imageUrl, divData.descricao);
    });
});

function atualizarLocalStorage() {
    localStorage.setItem('divsData', JSON.stringify(divsData));
}

function obterDadosDoLocalStorage() {
    const localData = localStorage.getItem('divsData');
    return localData ? JSON.parse(localData) : [];
}

function criarDivFromLocalStorage(imageUrl, descricao) {
    const container = document.getElementById("container");

    const square = document.createElement("div");
    square.classList.add("square");

    const img = document.createElement("img");
    img.src = imageUrl;
    square.appendChild(img);

    const descricaoElement = document.createElement("p");
    descricaoElement.textContent = descricao;
    square.appendChild(descricaoElement);

    container.appendChild(square);
}

// Função para redefinir o Local Storage
function resetarLocalStorage() {
    if (confirm("Tem certeza de que deseja redefinir o Local Storage? Isso apagará todos os dados armazenados.")) {
        localStorage.clear(); // Limpa todo o Local Storage

        // Limpa o array em memória
        divsData = [];

        // Limpa o conteúdo exibido no container
        const container = document.getElementById("container");
        container.innerHTML = "";

        // Limpa o conteúdo exibido na divSelecionada
        const divSelecionada = document.getElementById("divSelecionada");
        divSelecionada.innerHTML = "";

        // Atualize o Local Storage após a redefinição (para garantir que os dados estejam vazios)
        atualizarLocalStorage();
    }
}

// Adicione um ouvinte de evento ao botão "Reset Local Storage"
document.getElementById("resetButton").addEventListener("click", resetarLocalStorage);
