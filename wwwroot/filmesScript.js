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
        mostrar(filme);
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
        throw new Error(`Erro ao buscar o filme de id ${idFilme}. Erro ${response.status}`);
      }

      const filme = await response.json();
      mostrar(filme);
    } catch (error) {
        if(error.message.includes("404")){
            moviesContainer.innerHTML = "Filme de id " + idFilme + " não existe.";
        } else {
            moviesContainer.innerHTML = error.message;
        }

      console.error(error.message);
    }
  };

function mostrar(filme){
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

    const movieId = document.createElement('p');
    movieId.classList.add('id');
    movieId.textContent = `Id: ${filme.id}`;

    const movieGenero = document.createElement('p');
    movieGenero.classList.add('genero');
    movieGenero.textContent = `Genero: ${filme.genero}`;

    const movieSynopsis = document.createElement('p');
    movieSynopsis.classList.add('synopsis');
    movieSynopsis.textContent = filme.sinopse;

    movieCard.appendChild(movieImage);
    movieCard.appendChild(movieTitle);
    movieCard.appendChild(movieYear);
    movieCard.appendChild(movieId);
    movieCard.appendChild(movieGenero);
    movieCard.appendChild(movieSynopsis);

    moviesContainer.appendChild(movieCard);
}

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (id) {
  getFilmeId(id);
} else {
  getTodos();
}