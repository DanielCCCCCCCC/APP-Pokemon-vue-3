<script setup>
import axios from "axios";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useCounterStore } from "@/store/counter.js";
import { useGetDataBasica } from "@/Composables/getData";

const { data, getData, loading } = useGetDataBasica();
getData("https://pokeapi.co/api/v2/pokemon");

const currentPage = ref(1);
const limit = 20; // Asumiendo que el límite es de 20 elementos por página

const useCounter = useCounterStore();
const { count, increment } = useCounterStore();

const calculatePage = (url) => {
  if (!url) return;
  const offsetMatch = url.match(/offset=(\d+)/);
  const offset = offsetMatch ? parseInt(offsetMatch[1]) : 0;
  return Math.floor(offset / limit) + 1;
};

const fetchData = async (url) => {
  await getData(url);
  currentPage.value = calculatePage(url);
};

fetchData("https://pokeapi.co/api/v2/pokemon");
</script>

<template>
  <div class="row mb-1">
    <h1 class="fw-bold text-center">Pokemons Vistos {{ count }}</h1>

    <!-- <ul> -->
    <div
      class="m-0 p-0 row col-md-6 fw-bold"
      v-for="(poke, index) of data?.results"
      :key="index"
    >
      <RouterLink :to="`/Pokemon/${poke.name}`" @click="increment">
        <!-- <ul class="list-group" @click="increment"> -->
        <li class="list-group-item bg-dark text-light ms-4 me-3 ps-4">
          {{ index + 1 }} - {{ poke.name }}
        </li>
        <!-- </ul> -->
      </RouterLink>
    </div>

    <div class="col-12 ms-2 mt-3">
      <div class="row">
        <div class="col-md-4 mb-2">
          <button
            :disabled="!data?.previous"
            @click="fetchData(data?.previous)"
            class="btn btn-outline-secondary col-12 me-2"
          >
            Previous (Page {{ currentPage > 1 ? currentPage - 1 : 1 }})
          </button>
        </div>

        <div class="col-md-4 mb-2">
          <button
            :disabled="true"
            @click="fetchData(data.next)"
            class="btn btn-outline-success .text-info col-12 me-2"
          >
            Pagina Actual (Page {{ currentPage }})
          </button>
        </div>

        <div class="col-md-4 mb-3">
          <button
            :disabled="!data?.next"
            @click="fetchData(data.next)"
            class="btn btn-outline-dark col-12 me-2"
          >
            Next (Page {{ currentPage + 1 }})
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
