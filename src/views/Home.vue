<template>
  <div class="container custom-container py-5 text-center">
    <!-- Title -->
    <h1 class="mb-4 fw-bold pokemon-heading">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
        width="60"
      />
      Pokémon Apps
    </h1>

    <!-- Seacrh -->
    <div class="row justify-content-center mb-4">
      <div class="col-md-10 col-lg-8">
        <div class="input-group shadow-sm">
          <span class="input-group-text bg-white border-end-0">
            <i class="bi bi-search text-muted"></i>
          </span>
          <input
            type="text"
            class="form-control border-start-0"
            placeholder="Search Pokémon by name..."
            v-model="search"
          />
        </div>
      </div>
    </div>

    <!-- List of Pokemon -->
    <div class="row mt-4 justify-content-center">
      <div class="col-12 col-sm-6 col-md-4 mb-4" v-for="poke in filteredPokemon" :key="poke.name">
        <router-link :to="`/pokemon/${poke.name}`" class="text-decoration-none text-dark">
          <div class="card h-100 shadow-sm border-0 hover-effect">
            <img :src="poke.image" class="card-img-top p-3" alt="pokemon" />
            <div class="card-body">
              <h6 class="card-title text-capitalize text-center mb-0">{{ poke.name }}</h6>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePokemonStore } from '../stores/pokemonStore'

const store = usePokemonStore()
const search = ref('')

const filteredPokemon = computed(() => {
  return store.pokemons
    .filter((poke) => poke.name.toLowerCase().includes(search.value.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name))
})

onMounted(() => {
  if (store.pokemons.length === 0) {
    store.fetchPokemons()
  }
})
</script>

<style scoped>
.input-group-text {
  border-radius: 0.375rem 0 0 0.375rem;
}

input:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.pokemon-heading {
  font-size: 2.5rem;
  color: #ffcb05;
  /* Pikachu yellow */
  text-shadow: 2px 2px 4px #3b4cca;
  /* Pokémon blue */
  font-weight: 800;
  letter-spacing: 2px;
}

.pokemon-heading img {
  transition: transform 0.3s ease;
}

.pokemon-heading:hover img {
  transform: rotate(20deg) scale(1.1);
}
.hover-effect {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
}

.hover-effect:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-img-top {
  object-fit: contain;
  height: 160px;
  background-color: #f9f9f9;
  border-radius: 1rem;
}

.card {
  border-radius: 1rem;
}

.card-body {
  padding: 1rem;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}
.card-title:hover {
  color: #007bff;
  transition: color 0.3s ease;
}
/* .custom-container {
  border: 1px solid red;
  max-width: 1400px;
} */
</style>
