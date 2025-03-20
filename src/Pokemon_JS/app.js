const apiButton = document.getElementById('apiButton');
const apiData = document.getElementById('apiData');

const callAPI = () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20') // Solicitud inicial
        .then(res => res.json())
        .then(data => {
            console.log(data); // Muestra la respuesta completa en la consola
            apiData.innerHTML = ''; // Limpia el contenido previo

            // Itera sobre los resultados y realiza una solicitud adicional por cada Pokémon
            data.results.forEach(pokemon => {
                fetch(pokemon.url) // URL específica de cada Pokémon
                    .then(res => res.json())
                    .then(details => {
                        // Añade los detalles del Pokémon al contenedor
                        apiData.innerHTML += `
                            <div>
                                <h3>${details.name}</h3>
                                <p>Experiencia de Base: ${details.base_experience}</p>
                                <img src="${details.sprites.front_default}" alt="${details.name}">
                            </div>
                        `;
                    })
                    .catch(e => console.error(new Error(e)));
            });
        })
        .catch(e => console.error(new Error(e)));
};

apiButton.addEventListener('click', callAPI);
