<script setup>
import { useFavoritosStore } from "@/store/favoritos.js";
import { storeToRefs } from "pinia";

const useFavoritos = useFavoritosStore();

const { favoritos } = storeToRefs(useFavoritos); //storeToRefs solo son para los getters o las propiedades computadas
const { remove } = useFavoritos;
// const i = 0;
// console.log(favoritos.value);
</script>

<template>
  <h1 class="text-center my-4">Favoritos</h1>
  <div v-for="(poke, index) in favoritos" :key="index" class="container">
    <div class="row ">
      <!-- Imagen -->
      <div
        class="col-md-3 me-3 d-flex align-items-center justify-content-center"
      >
        <img :src="poke.photos" alt="img pokemon" class="img-fluid h-100" />
      </div>

      <!-- Columna de Información -->
      <div class="col-md-8 ">
        <div class="row ">
          <!-- Nombre y Tipo de Especie -->
          <div class="col-md-6 bg-light">
            <div><span class="fw-bold">Nombre:</span> {{ poke.data.name }}</div>
            <div>
              <span class="fw-bold">Tipo de especie:</span> {{ poke.data.name }}
            </div>
          </div>

          <!-- Felicidad y Experiencia -->
          <div class="col-md-6 bg-light">
            <div>
              <span class="fw-bold">Base Happiness:</span>
              {{ poke?.dataEspecies?.base_happiness }}
            </div>
            <div>
              <span class="fw-bold">Experiencia Base:</span>
              {{ poke?.data?.base_experience }}
            </div>
            <div>
              <span class="fw-bold">Tipo de especie:</span> {{ poke.data.name }}
            </div>
          </div>
        </div>

        <div class="row mt-3">
          <!-- Habilidades -->
          <div class="col-md-6 bg-light">
            <p class="fw-bolder mt-2">Habilidades del Pokémon</p>
            <ul>
              <li v-for="(sub, index) in poke.data.abilities" :key="index">
                <div class="ms-2">
                  <span class="fw-bold">Habilidad {{ ++index }}:</span>
                  {{ sub.ability.name }}
                </div>
              </li>
            </ul>
          </div>

          <!-- Held Items -->
          <div class="col-md-6 bg-light">
            <p class="fw-bold text-dark">Held Items: </p>
            <ul>
              <li v-for="(sub, index) in poke.data.held_items" :key="index">
                <div class="ms-2">
                  <span class="fw-bold"> Item{{ ++index }}: </span>
                  {{ sub?.item?.name }} ?
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Botón Eliminar -->
    <div class="row mt-3">
      <div class="col-md-12 text-end">
        <button class="btn btn-sm btn-danger" @click="remove(poke.data.id)">
          Eliminar
        </button>
      </div>
    </div>

    <!-- Botón más información -->
    <div class="row mt-1">
      <div class="col-md-12 text-end">
        <RouterLink
          class="btn btn-sm btn-info"
          :to="`/Pokemon/${poke.data.name}`"
        >
          Más información
        </RouterLink>
      </div>
    </div>
  </div>
</template>
