var listElement = document.querySelector('#App ul');
var inputElement = document.querySelector('#App input');
var buttonElement = document.querySelector('#App button'); 

var todos = JSON.parse(localStorage.getItem('list_todos')) || []; 
// Get serve para pegar os elementos salvos no LocalStorege
// Precisamos usar o Json.parse primeiro, pois os arquivos foram salvos com ele. 
// com o JSON.parse estamos convertendo os itens modificados pelo JSON, para array novamente.
// usamos o OU || para definir um valor padrão caso não tenha nada dentro do JSON, caso contrario dará erro. 
function renderTodos() {
    listElement.innerHTML = ''; // Ou seja tudo que estiver dentro da 'UL' está como vazio, ou seja vamos remover todo conteudo do listElement
    for (todo of todos){  // Todos e a variavel o 'of vai percorrer todo o array da variavel 'Todos' e retornar para todo
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);

        var linkElement = document.createElement('a');
        
        linkElement.setAttribute('href', '#'); // Aqui estamos dando um atributo ao elemento "linkElement" // Atributo de link !  
        
        var linkText = document.createTextNode('  Excluir');

        linkElement.appendChild(linkText);

        var pos = todos.indexOf(todo); // o 'indexOf' diz em que posição do array está o elemento. 
        linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')');

        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement); 
    } 
}

renderTodos(); 

function addTodo() {
    var todoText = inputElement.value;
    todos.push (todoText);
    inputElement.value = ''; 
    renderTodos();
    saveToStorage(); // 'Push serve para colocar um elemento dentro do array. 
}

buttonElement.onclick = addTodo; 

function deleteTodo(pos) {
    todos.splice(pos, 1); // O metodo splice remove uma quantidade de itens do array de acordo com o que a gente passar para ele .
    renderTodos();
}

function saveToStorage() {
    localStorage.setItem('list_todos', JSON.stringify(todos));
}

// 'localStorage' e uma função global que salva os itens no armazenamento interno; 
// 'setItem' seta um item para armazenamento ('nome de como será gravado', var)
// local storage só grava chave e valores, não podendo então gravar objetos.
// sendo assim precisamos converter nosso vetor em JSON. Que é bem semelhante a um objeto porém e uma string. 