<template>
  <div v-if="loading" class="text-center my-5">
    <div class="spinner-border text-primary" role="status"></div>
  </div>

  <div v-else-if="pokemon.sprites" class="container-lg mt-5">
    <div class="card shadow p-4 border-0 rounded-4">
      <div class="row align-items-center">
        <div class="col-md-4 text-center mb-4 mb-md-0">
          <img
            :src="pokemon.sprites.front_default"
            class="img-fluid mb-3 shadow-sm border rounded-3"
            alt="pokemon"
            style="background-color: #f9f9f9; padding: 1rem"
          />
        </div>
        <div class="col-md-8 text-md-start text-center">
          <h2 class="text-capitalize fw-bold mb-4" style="color: #3b4cca">
            {{ pokemon.name }}
          </h2>
          <div class="d-flex flex-wrap justify-content-md-start justify-content-center mb-3">
            <div class="me-4 mb-2"><strong>ID:</strong> {{ pokemon.id }}</div>
            <div class="me-4 mb-2"><strong>Height:</strong> {{ pokemon.height }}</div>
            <div class="mb-2"><strong>Weight:</strong> {{ pokemon.weight }}</div>
          </div>

          <div class="mb-3 text-md-start text-center">
            <strong>Types:</strong><br />
            <span
              class="badge bg-warning text-dark me-2 mb-2"
              v-for="t in pokemon.types"
              :key="t.type.name"
            >
              {{ t.type.name }}
            </span>
          </div>

          <div class="mb-3 text-md-start text-center">
            <strong>Abilities:</strong><br />
            <span
              class="badge bg-info text-dark me-2 mb-2"
              v-for="a in pokemon.abilities"
              :key="a.ability.name"
            >
              {{ a.ability.name }}
            </span>
          </div>
          <router-link to="/" class="btn btn-outline-secondary mt-4"> ← Back to Home </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- fallback kalau tak ada data -->
  <div v-else class="text-center mt-5 text-muted">Failed to load Pokémon data.</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const pokemon = ref({})
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`)
    pokemon.value = res.data
  } catch (err) {
    console.error('Failed to fetch details', err)
  } finally {
    loading.value = false
  }
})
</script>
