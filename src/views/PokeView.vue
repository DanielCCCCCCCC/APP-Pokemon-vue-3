<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted,computed  } from "vue";
import router from "@/router";
import { useGetDataBasica } from "@/Composables/getData";
import { useGetDataEspecies } from "@/Composables/getData";
import {useFavoritosStore} from "@/store/favoritos.js";


const { data, getData, photos, loading } = useGetDataBasica();
const { dataEspecies, getDataEspecies } = useGetDataEspecies();

const route = useRoute();

const pokemonName = route.params.name;
const useFavoritos = useFavoritosStore();
const {add, findPoke} = useFavoritos; 
// const isAddedToFavorites = computed(() => findPoke(data.name));

const agregar = ( data, dataEspecies, photos) => {
  // Verifica si ya está en favoritos antes de agregar
  
    add({  data, dataEspecies, photos });
 
};

// Llama a getData() cuando se monte el componente
onMounted(() => {
  getData(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
  getDataEspecies(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`);
});

const back = () => {
  router.push("/pokemon");
};
</script>
<template>
  <nav id="navbar-example2" class="navbar bg-body-tertiary px-3 mb-3">
    <a class="navbar-brand" href="#">@danielClaros</a>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a class="nav-link" href="#scrollspyHeading1"
          >Información del Pokémon</a
        >
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#scrollspyHeading2">Habilidades</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#scrollspyHeading3">Categoría</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#scrollspyHeading4">Botón Pokédex</a>
      </li>
    </ul>
  </nav>

  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12 text-center">
        <h1 class="text-info">
          Poke Name: <span class="text-dark">{{ $route.params.name }}</span>
        </h1>
      </div>

      <div class="col-12 row d-flex justify-content-center">
        <div class="col-12 col-md-6 d-flex justify-content-center">
          <img
            v-if="photos"
            class="img-fluid ms-4 w-50 imagen-iluminada"
            :src="photos"
            :alt="`${$route.params.name}`"
          />
        </div>
      </div>

      <div class="col-md-6">
        <p v-if="loading">Cargando información...</p>
        <div v-if="data" class="mt-3">
          <p id="scrollspyHeading1" class="fw-bold text-center fs-5">
            Información del Pokémon
          </p>
          <ul class="list-group">
            <li class="list-group-item">
              <span class="fw-bold">ID: </span>{{ data?.id }}
            </li>
            <li class="list-group-item">
              <span class="fw-bold">Nombre: </span>{{ data?.name }}
            </li>
            <li class="list-group-item">
              <span class="fw-bold">Generación: </span
              >{{ dataEspecies?.generation?.name }}
            </li>
            <li class="list-group-item">
              <span class="fw-bold">Baby Pokémon: </span
              >{{ dataEspecies?.is_baby }}
            </li>
            <li class="list-group-item">
              <span class="fw-bold">Legendario: </span
              >{{ dataEspecies?.is_legendary }}
            </li>
            <li class="list-group-item">
              <span class="fw-bold">Mítico: </span
              >{{ dataEspecies?.is_mythical }}
            </li>
            <li class="list-group-item">
              <span class="fw-bold">Hábitat: </span
              >{{ dataEspecies?.habitat?.name }}
            </li>
            <li class="list-group-item">
              <span class="fw-bold">Experiencia base: </span
              >{{ data?.base_experience }}
            </li>
            <li class="list-group-item">
              <span class="fw-bold">Altura: </span>{{ data?.height }}
            </li>
            <li class="list-group-item">
              <span class="fw-bold">Peso: </span>{{ data?.weight }}
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-6">
        <div v-if="data">
          <p id="scrollspyHeading2" class="fw-bold text-center fs-5">
            Habilidades
          </p>
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="(abilityInfo, index) in data?.abilities"
              :key="index"
            >
              <span class="fw-bold">Nombre de habilidad {{ index + 1 }}: </span
              >{{ abilityInfo?.ability?.name }}
              <li class="list-group-item">
                <span class="fw-bold">Oculto: </span
                >{{ abilityInfo?.is_hidden }}
              </li>
              <li class="mb-3 list-group-item">
                <span class="fw-bold">Slot: </span
                >{{ abilityInfo?.slot }}
              </li>
            </li>
          </ul>
          <p id="scrollspyHeading3" class="fw-bold text-center fs-5">
            Categoría del Pokémon
          </p>
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="(ty, index) in data?.types"
              :key="index"
            >
              <span class="fw-bold">Tipo: </span>{{ ty?.type?.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-2" div v-if="data">
      <button
       id="scrollspyHeading4"
       class="p-1 col-12 mt-1 fw-bold fs-6 btn btn-sm btn-dark"
      :disabled="findPoke(data.name)"
       @click="agregar(data,dataEspecies,photos)"
     >
     <div>{{ data.name }}</div>
       Agregrar a favoritos
     </button>
      <button
        id="scrollspyHeading4"
        class="p-1 col-12 mt-1 fw-bold fs-6 btn btn-sm btn-dark"
        @click="back"
      >
        Pokédex
      </button>
    </div>

    <div class="mt-4 mb-2 text-center">
      <a
        class="text-info-emphasis fw-bolder"
        href="https://www.instagram.com/d.claros19/"
        >Instagram</a
      >
      --
      <a
        class="text-info-emphasis fw-bolder"
        href="https://wa.me/50498859627?text=Hola%20quiero%20saber%20más%20información%20sobre%20los%20Pokemones"
        target="_blank"
        >WhatsApp</a
      >
      --
      <a class="text-info-emphasis fw-bolder">@Daniel Claros</a>
    </div>
  </div>
</template>

<style scoped>
.list-group-item:hover {
  background-color: #f0f0f0; /* Cambia el color de fondo cuando se pasa el mouse */
  cursor: pointer; /* Cambia el cursor para indicar que se puede interactuar */
}

/* Resalta elementos de la lista al pasar el mouse */
.list-group-item:hover {
  background-color: #f0f0f0; /* Cambia el color de fondo cuando se pasa el mouse */
  cursor: pointer; /* Cambia el cursor para indicar que se puede interactuar */
}

/* Estilo para imágenes */
.imagen-iluminada {
  box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.8); /* Ilumina el borde */
  border-radius: 15px; /* Opcional, suaviza los bordes */
  transition: box-shadow 0.3s ease;
}

.imagen-iluminada:hover {
  box-shadow: 0 0 30px 10px rgba(255, 255, 255, 1); /* Aumenta la iluminación al pasar el mouse */
}

</style>
