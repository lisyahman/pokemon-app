<template>
<div v-if="loading" class="text-center my-5">
    <div class="spinner-border text-primary" role="status"></div>
</div>

<div v-else class="container mt-5">
    <div class="card shadow p-4">
        <div class="row">
            <div class="col-md-4 text-center">
                <img :src="pokemon.sprites.front_default" class="img-fluid" />
            </div>
            <div class="col-md-8">
                <h2 class="text-capitalize">{{ pokemon.name }}</h2>
                <p><strong>ID:</strong> {{ pokemon.id }}</p>
                <p><strong>Height:</strong> {{ pokemon.height }}</p>
                <p><strong>Weight:</strong> {{ pokemon.weight }}</p>

                <p>
                    <strong>Types:</strong>
                    <span class="badge bg-primary me-1" v-for="t in pokemon.types" :key="t.type.name">
                        {{ t.type.name }}
                    </span>
                </p>

                <p>
                    <strong>Abilities:</strong>
                    <span class="badge bg-success me-1" v-for="a in pokemon.abilities" :key="a.ability.name">
                        {{ a.ability.name }}
                    </span>
                </p>
                <router-link to="/" class="btn btn-outline-secondary mt-4"> ← Back to Home </router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    ref,
    onMounted
} from 'vue'
import {
    useRoute
} from 'vue-router'
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
