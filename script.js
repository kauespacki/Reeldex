const resultOutput = document.getElementById('resultOutput');
const idBusca = document.getElementById('idBusca');
const idForm = document.getElementById('idForm');
const PostForm = document.getElementById('PostForm');
const titulo = document.getElementById('titulo');
const ano = document.getElementById('ano');
const genero = document.getElementById('genero');
const sinopse = document.getElementById('sinopse');
const capa = document.getElementById('capa');
const formUpdate = document.getElementById('formUpdate');
const idUpdate = document.getElementById('idUpdate');
const tituloUpdate = document.getElementById('tituloUpdate');
const anoUpdate = document.getElementById('anoUpdate');
const generoUpdate = document.getElementById('generoUpdate');
const sinopseUpdate = document.getElementById('sinopseUpdate');
const capaUpdate = document.getElementById('capaUpdate');
const idDelete = document.getElementById('idDelete');

var btnGetTodos = document.getElementById("getTodos");

var apiURL = "http://localhost:5073/filmes";

const getTodos = async () => {
    const apiURL = "http://localhost:5073/filmes";
    const moviesContainer = document.getElementById('moviesContainer');
    moviesContainer.innerHTML = '';

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
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const movieImage = document.createElement('img');
        movieImage.src = filme.capa;
        movieImage.alt = filme.titulo;

        const movieTitle = document.createElement('h3');
        movieTitle.textContent = filme.titulo;

        const movieYear = document.createElement('p');
        movieYear.classList.add('year');
        movieYear.textContent = `Ano: ${filme.ano}`;

        const movieSynopsis = document.createElement('p');
        movieSynopsis.classList.add('synopsis');
        movieSynopsis.textContent = filme.sinopse;

        movieCard.appendChild(movieImage);
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(movieYear);
        movieCard.appendChild(movieSynopsis);

        moviesContainer.appendChild(movieCard);
      });

    } catch (error) {
      console.error(error.message);
      moviesContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
  };


const getFilmeId = async (idFilme) => {
    try {
      const apiURL = "http://localhost:5073/filmes";
      const response = await fetch(`${apiURL}/${idFilme}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar o filme de id ${idFilme}.`);
      }

      const filme = await response.json();
      const moviesContainer = document.getElementById('moviesContainer');

      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');

      const movieImage = document.createElement('img');
      movieImage.src = filme.capa;
      movieImage.alt = filme.titulo;

      const movieTitle = document.createElement('h3');
      movieTitle.textContent = filme.titulo;

      const movieYear = document.createElement('p');
      movieYear.classList.add('year');
      movieYear.textContent = `Ano: ${filme.ano}`;

      const movieSynopsis = document.createElement('p');
      movieSynopsis.classList.add('synopsis');
      movieSynopsis.textContent = filme.sinopse;

      movieCard.appendChild(movieImage);
      movieCard.appendChild(movieTitle);
      movieCard.appendChild(movieYear);
      movieCard.appendChild(movieSynopsis);

      moviesContainer.appendChild(movieCard);
    } catch (error) {
      console.error(error.message);
    }
  };

const postFilme = async (novoFilme) => {
    resultOutput.innerHTML = '';
    
    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoFilme)
        });

        if (!response.ok) {
            throw new Error("Erro ao adicionar Filme");
        }

        const FilmeAdicionado = await response.json();

        alert(`Filme "${titulo.value}" adicionado com sucesso!`);
    } catch (error) {
        const newLi = document.createElement('li');
        newLi.innerText = `${error.message}`;
        resultOutput.appendChild(newLi);
    }
}

const putFilme = async (idUpdate, novoFilme) => {
    resultOutput.innerHTML = "";
    try {
        const response = await fetch(`${apiURL}/${idUpdate.value}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoFilme)
        });

        if(!response.ok){
            throw new Error("Erro ao atualizar o filme.");
        }

        const FilmeAtualizado = await response.json();
        alert(`Filme "${tituloUpdate.value}" alterado com sucesso!`);
    } catch(error){
        const newLi = document.createElement('li');
        newLi.innerText = `${error.message}`;
        resultOutput.appendChild(newLi);
    }
}
const deleteFilme = async () => {
    resultOutput.innerHTML = "";
    try {
        const response = await fetch (`${apiURL}/${idDelete.value}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if(!response.ok){
            throw new Error("Erro ao deletar o filme.");
            
        }
        const FilmeAtualizado = await response.json();
        alert(`Filme deletado com sucesso!`);
    } catch(error){
        const newLi = document.createElement('li');
        newLi.innerText = `${error.message}`;
        resultOutput.appendChild(newLi);
    }
}

btnGetTodos.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = "filmes.html";
});

idForm.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = "filmes.html?id=" + `${idBusca.value}`;
});

PostForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    const filme = {
        titulo: `${titulo.value}`,
        ano: `${ano.value}`,
        genero: `${genero.value}`,
        sinopse: `${sinopse.value}`,
        capa: `${capa.value}`
    }
    postFilme(filme);

});

formUpdate.addEventListener('submit', (event) =>{
    event.preventDefault();
    var novoFilme = {
        titulo: tituloUpdate.value,
        ano: anoUpdate.value,
        genero: generoUpdate.value,
        sinopse: sinopseUpdate.value,
        capa: capaUpdate.value
    };
    putFilme(idUpdate, novoFilme);
})

formDelete.addEventListener('submit', (event) => {
    event.preventDefault();
    deleteFilme();
})