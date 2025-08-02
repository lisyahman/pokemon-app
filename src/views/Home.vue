<template>
<div class="container py-5 text-center">
    <h1 class="mb-4 text-primary fw-bold">Pokémon App</h1>

    <div class="row justify-content-center mb-4">
        <div class="col-md-6">
            <input type="text" class="form-control" placeholder="Search Pokémon by name..." v-model="search" />
        </div>
    </div>

    <div class="row">
        <div v-if="store.loading" class="text-center my-5">
            <div class="spinner-border text-primary" role="status"></div>
        </div>

        <div v-else class="col mb-4 px-2 d-flex justify-content-center" style="flex: 0 0 20%; max-width: 20%" v-for="poke in filteredPokemon" :key="poke.name">
            <router-link :to="`/pokemon/${poke.name}`" class="text-decoration-none text-dark">
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
</div>
</template>

<script>
import {
    ref,
    computed,
    onMounted
} from 'vue'
import {
    usePokemonStore
} from '../stores/pokemonStore'

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
