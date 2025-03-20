const pokemonNameInput = document.getElementById('pokemonName');
const suggestions = document.getElementById('suggestions');
const pokemonCard = document.getElementById('pokemonCard');
let allPokemon = [];

// Cargar todos los nombres de Pokémon al inicio
fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
    .then(response => response.json())
    .then(data => {
        allPokemon = data.results.map(pokemon => pokemon.name);
    })
    .catch(error => console.error("Error al cargar la lista de Pokémon:", error));

// Filtrar y mostrar sugerencias
const mostrarSugerencias = (query) => {
    if (!query) {
        suggestions.classList.add('hidden');
        return;
    }

    const resultados = allPokemon.filter(name => 
        name.toLowerCase().includes(query.toLowerCase())
    );

    if (resultados.length > 0) {
        suggestions.innerHTML = resultados
            .slice(0, 10) // Mostrar un máximo de 10 sugerencias
            .map(name => `<p>${name}</p>`)
            .join('');
        suggestions.classList.remove('hidden');
    } else {
        suggestions.innerHTML = `<p>No se encontraron resultados</p>`;
        suggestions.classList.remove('hidden');
    }
};

// Llenar el input al hacer clic en una sugerencia
suggestions.addEventListener('click', (event) => {
    if (event.target.tagName === 'P') {
        pokemonNameInput.value = event.target.textContent;
        suggestions.classList.add('hidden');
        buscarPokemon(event.target.textContent); // Realizar la búsqueda automática con el nombre seleccionado
    }
});

// Escuchar el evento de entrada en el campo de texto
pokemonNameInput.addEventListener('input', () => {
    const query = pokemonNameInput.value.trim();
    mostrarSugerencias(query);
});

// Función para realizar la búsqueda del Pokémon
const buscarPokemon = (nombre) => {
    nombre = nombre.trim().toLowerCase();

    if (!nombre) {
        alert("Por favor, ingresa un nombre de Pokémon");
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
        .then(response => {
            if (!response.ok) throw new Error("Pokémon no encontrado");
            return response.json();
        })
        .then(data => {
            mostrarPokemon(data);
        })
        .catch(error => {
            alert(error.message);
        });
};

// Función para mostrar la información del Pokémon
const mostrarPokemon = (pokemon) => {
    const tipos = pokemon.types.map(tipo => tipo.type.name).join(', ');
    const habilidades = pokemon.abilities.map(habilidad => habilidad.ability.name).join(', ');
    const movimientos = pokemon.moves.slice(0, 5).map(mov => mov.move.name).join(', ');

    pokemonCard.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <p><strong>Tipos:</strong> ${tipos}</p>
        <p><strong>Estadísticas:</strong></p>
        <ul>
            ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
        </ul>
        <p><strong>Habilidades:</strong> ${habilidades}</p>
        <p><strong>Movimientos:</strong> ${movimientos}</p>
    `;

    pokemonCard.classList.remove('hidden');
};
