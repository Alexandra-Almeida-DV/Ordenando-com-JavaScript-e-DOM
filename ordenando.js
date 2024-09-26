// Função swap-troca valores de duas posições de um vetor
const swap = (array, i, j) => {
    [array[i], array[j]] = [array[j], array[i]];
};

// Função shuffle-embaralha elementos de um vetor
const shuffle = (array, swaps) => {
    for (let i = 0; i < swaps; i++) {
        const index1 = Math.floor(Math.random() * array.length);
        const index2 = Math.floor(Math.random() * array.length);
        swap(array, index1, index2);
    }
};

// Função buble_sort-implementa o algoritmo Bubble sort para ordenar um vetor de inteiros
const bubble_sort = (array) => {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
            }
        }
    }
};

// Função selection_sort-implamenta o alritmo Seletion sort para ordenar um vetor de inteiros
const selection_sort = (array) => {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        swap(array, i, minIndex);
    }
};

// Função particionamento-auxilia a função Quick sort, dividindo o vetor com base no pivot
const particionamento = (array, low, high) => {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            swap(array, i, j);
        }
    }
    swap(array, i + 1, high);
    return i + 1;
};

// Função quick_sort- implementa o algoitmo Quick sort de maneira recursiva
const quick_sort = (array, low = 0, high = array.length - 1) => {
    if (low < high) {
        const pi = particionamento(array, low, high);
        quick_sort(array, low, pi - 1);
        quick_sort(array, pi + 1, high);
    }
};

function add() {
    // a) Capturar o campo de entrada com id "valor"
    const valorInput = document.getElementById('valor');

    // b) Capturar a lista com id "valores"
    const listaValores = document.getElementById('valores');

    // Verifica se o valor digitado não está vazio
    if (valorInput.value !== '') {
        // c) Criar uma variável node, com um elemento <li> definido via createElement
        const node = document.createElement('li');

        // d) Definir um nó de texto com o valor do campo de entrada e incluí-lo como filho de node
        const textoNode = document.createTextNode(valorInput.value);
        node.appendChild(textoNode);

        // e) Adicionar o elemento node à lista "valores"
        listaValores.appendChild(node);

        // Adiciona o valor ao array global e limpa o campo de entrada
        array.push(parseInt(valorInput.value));
        valorInput.value = '';  // Limpa o campo de entrada
    }
}

function ordenar() {
    // a) Capturar a lista de valores e a lista de seleção via getElementById
    const listaValores = document.getElementById('valores');
    const listaSelecao = document.getElementById('algoritmo');
    
    // b) Obter os itens da lista de valores e adicionar ao vetor
    let vetor = [];
    for (let i = 0; i < listaValores.children.length; i++) {
        // c) Obter o conteúdo do item (via innerHTML) e converter para inteiro
        const valor = eval(listaValores.children[i].innerHTML);  // Converte para inteiro
        vetor.push(valor); // Adiciona o valor ao vetor
    }

    // d) Escolher o algoritmo de ordenação a partir do selectedIndex
    const algoritmoSelecionado = listaSelecao.selectedIndex;
    
    // Aplica o algoritmo de ordenação adequado
    switch (algoritmoSelecionado) {
        case 0: // Bubble Sort
            bubble_sort(vetor);
            break;
        case 1: // Selection Sort
            selection_sort(vetor);
            break;
        case 2: // Quick Sort
            quick_sort(vetor, 0, vetor.length - 1);
            break;
        default:
            console.error('Algoritmo de ordenação desconhecido');
    }

    // e) Utilizar map e reduce para gerar os novos itens da lista e substituir o conteúdo da lista via innerHTML
    listaValores.innerHTML = vetor
        .map(valor => `<li>${valor}</li>`) // Cria um <li> para cada valor no vetor
        .reduce((acc, item) => acc + item, ''); // Concatena todos os <li> gerados em uma string e insere no innerHTML
}

function misturar() {
    // a) Capturar a lista de valores via getElementById
    const listaValores = document.getElementById('valores');
    
    // b) Obter os itens da lista de valores e adicionar ao vetor
    let vetor = [];
    for (let i = 0; i < listaValores.children.length; i++) {
        // c) Obter o conteúdo do item (via innerHTML) e converter para inteiro
        const valor = eval(listaValores.children[i].innerHTML);  // Converte para inteiro
        vetor.push(valor); // Adiciona o valor ao vetor
    }

    // d) Aplicar a função shuffle ao vetor (que já deve estar implementada no arquivo ordenando.js)
    shuffle(vetor, vetor.length);

    // e) Utilizar map e reduce para gerar os novos itens da lista e substituir o conteúdo da lista via innerHTML
    listaValores.innerHTML = vetor
        .map(valor => `<li>${valor}</li>`) // Cria um <li> para cada valor no vetor embaralhado
        .reduce((acc, item) => acc + item, ''); // Concatena todos os <li> gerados em uma string e insere no innerHTML
}
