const swap = (array, i, j) => {
    [array[i], array[j]] = [array[j], array[i]];
};
const shuffle = (array, swaps) => {
    for (let i = 0; i < swaps; i++) {
        const index1 = Math.floor(Math.random() * array.length);
        const index2 = Math.floor(Math.random() * array.length);
        swap(array, index1, index2);
    }
};

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

const quick_sort = (array, low = 0, high = array.length - 1) => {
    if (low < high) {
        const pi = particionamento(array, low, high);
        quick_sort(array, low, pi - 1);
        quick_sort(array, pi + 1, high);
    }
};

function add() {
    const valorInput = document.getElementById('valor');
    const listaValores = document.getElementById('valores');
    if (valorInput.value !== '') {
        const node = document.createElement('li');
        const textoNode = document.createTextNode(valorInput.value);
        node.appendChild(textoNode);
        listaValores.appendChild(node);
        array.push(parseInt(valorInput.value));
        valorInput.value = '';  
    }
}

function ordenar() {
    const listaValores = document.getElementById('valores');
    const listaSelecao = document.getElementById('algoritmo');
    let vetor = [];
    for (let i = 0; i < listaValores.children.length; i++) {
        const valor = eval(listaValores.children[i].innerHTML);
        vetor.push(valor);
    }

    const algoritmoSelecionado = listaSelecao.selectedIndex;
    switch (algoritmoSelecionado) {
        case 0: 
            bubble_sort(vetor);
            break;
        case 1: 
            selection_sort(vetor);
            break;
        case 2: 
            quick_sort(vetor, 0, vetor.length - 1);
            break;
        default:
            console.error('Algoritmo de ordenação desconhecido');
    }

    listaValores.innerHTML = vetor
        .map(valor => `<li>${valor}</li>`) 
        .reduce((acc, item) => acc + item, ''); 
}

function misturar() {
    const listaValores = document.getElementById('valores');
    let vetor = [];
    for (let i = 0; i < listaValores.children.length; i++) {
        const valor = eval(listaValores.children[i].innerHTML);  
        vetor.push(valor);
    }
    shuffle(vetor, vetor.length);
    listaValores.innerHTML = vetor
        .map(valor => `<li>${valor}</li>`) 
        .reduce((acc, item) => acc + item, '');
}
