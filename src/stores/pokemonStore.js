import { defineStore } from 'pinia'
import axios from 'axios'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [],
    loading: false,
  }),
  actions: {
    async fetchPokemons() {
      this.loading = true
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')
        const results = res.data.results

        const allPokemon = await Promise.all(
          results.map(async (pokemon) => {
            const detail = await axios.get(pokemon.url)
            return {
              name: pokemon.name,
              image: detail.data.sprites.front_default,
            }
          }),
        )

        this.pokemons = allPokemon
      } catch (error) {
        console.error('Error fetching Pokémon:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
