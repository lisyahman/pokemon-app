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
    <div class="pokemon-grid mt-4">
      <router-link
        v-for="poke in filteredPokemon"
        :key="poke.name"
        :to="`/pokemon/${poke.name}`"
        class="pokemon-card text-decoration-none text-dark"
      >
        <div class="card hover-effect">
          <img :src="poke.image" class="card-img-top" alt="pokemon" />
          <div class="card-body">
            <h6 class="card-title text-capitalize mb-0">{{ poke.name }}</h6>
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
}

/* .hover-effect:hover {
  transform: translateY(-6px) scale(1.03);
} */

.hover-effect:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 0 15px rgba(255, 203, 5, 0.5); /* yellow glow */
}

.card-img-top {
  height: 140px;
  object-fit: contain;
  background-color: #f6f6f6;
  padding: 1.2rem;
}

/* .card {
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  background-color: #fff;
} */

/* .card {
  border: none;
  border-radius: 0.75rem;
  background-color: #f5f5f5;
  box-shadow: none;
} */

.card {
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* .card-body {
  padding: 0.8rem;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
} */

/* .card-body {
  padding: 0.75rem;
  background-color: #fdfdfd;
}

.card-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 0;
} */

.card-body {
  padding: 1rem 0.5rem;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c3e50;
  letter-spacing: 1.5px;
  transition: color 0.3s ease;
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  justify-items: center;
}

.pokemon-card {
  width: 100%;
  max-width: 220px;
}
</style>
