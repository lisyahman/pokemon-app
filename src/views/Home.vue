<template>
  <div class="container py-5 text-center">
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
      <div class="col-md-8 col-lg-6">
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
    <div class="pokemon-grid mt-4">
      <router-link
        v-for="poke in filteredPokemon"
        :key="poke.name"
        :to="`/pokemon/${poke.name}`"
        class="text-decoration-none text-dark"
      >
        <div class="card h-100 shadow-sm border-0 hover-effect">
          <img :src="poke.image" class="card-img-top p-3" alt="pokemon" />
          <div class="card-body">
            <h6 class="card-title text-capitalize text-center mb-0">
              {{ poke.name }}
            </h6>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePokemonStore } from '../stores/pokemonStore'

const store = usePokemonStore()
const search = ref('')

const filteredPokemon = computed(() => {
  return store.pokemons.filter((poke) =>
    poke.name.toLowerCase().includes(search.value.toLowerCase()),
  )
})

onMounted(() => {
  if (store.pokemons.length === 0) {
    store.fetchPokemons()
  }
})
</script>

<style scoped>
.hover-effect {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
}

.hover-effect:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.card-img-top {
  object-fit: contain;
  height: 150px;
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  justify-items: center;
}

.input-group-text {
  border-radius: 0.375rem 0 0 0.375rem;
}

input:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.pokemon-heading {
  font-size: 3rem;
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
</style>
