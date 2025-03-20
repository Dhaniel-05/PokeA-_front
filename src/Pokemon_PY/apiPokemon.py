import requests

def obtener_datos_pokemon(nombre_pokemon):
    # Normalizar el nombre del Pokémon
    nombre_pokemon = nombre_pokemon.strip().lower()
    url = f'https://pokeapi.co/api/v2/pokemon/{nombre_pokemon}'
    response = requests.get(url)

    if response.status_code == 200:
        pokemon_data = response.json()

        # Nombre del Pokémon
        nombre = pokemon_data['name']
        print(f'\nNombre: {nombre.title()}')

        # Tipos del Pokémon
        tipos = [tipo['type']['name'] for tipo in pokemon_data['types']]
        print(f"Tipos: {', '.join(tipo.title() for tipo in tipos)}")

        # Estadísticas
        print('\nEstadísticas:')
        for stat in pokemon_data['stats']:
            nombre_stat = stat['stat']['name']
            valor_stat = stat['base_stat']
            print(f"  {nombre_stat.title()}: {valor_stat}")

        # Habilidades
        habilidades = [habilidad['ability']['name'] for habilidad in pokemon_data['abilities']]
        print(f"\nHabilidades: {', '.join(hab.title() for hab in habilidades)}")

        # Movimientos (limitar a los primeros 5)
        print('\nMovimientos:')
        movimientos = [movimiento['move']['name'] for movimiento in pokemon_data['moves'][:5]]
        print(f"  {', '.join(mov.title() for mov in movimientos)}")

        # Sprite (imagen del Pokémon)
        sprite = pokemon_data['sprites']['front_default']
        if sprite:
            print(f'\nImagen del Pokémon: {sprite}')
        else:
            print('\nEste Pokémon no tiene sprite disponible.')
    else:
        print(f'\nError: No se encontró el Pokémon "{nombre_pokemon}". Verifica el nombre e inténtalo de nuevo.')

# Solicitar entrada del usuario
nombre = input('Ingrese el nombre del Pokémon a consultar: ')
obtener_datos_pokemon(nombre)
