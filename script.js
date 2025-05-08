const resultOutput = document.getElementById('resultOutput');
var btnGetTodos = document.getElementById("getTodos");
var apiURL = "http://localhost:5073/filmes";

const getTodos = async () => {
    resultOutput.innerHTML = '';

    try {
        const response = await fetch(apiURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar os filmes.");         
        }

        const filmes = await response.json();

        filmes.forEach(filme => {
            const newLi = document.createElement('li');
            newLi.innerText = `ID: ${filme.id} | Titulo: ${filme.titulo} | Ano: ${filme.ano} | Gênero: ${filme.genero} | Sinopse: ${filme.sinopse}`;
            resultOutput.appendChild(newLi);
        });
        

    } catch (error) {
        console.log(error.message);
        resultOutput.innerText = `${error.message}`;
    }

    
}

btnGetTodos.addEventListener('click', (event) => {
    event.preventDefault();
    getTodos();
});