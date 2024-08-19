<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="mt-4 mb-4 text-center">
        <!-- <RouterLink class="btn btn-outline-primary" to="/">Home</RouterLink> - -->
        <!-- <RouterLink class="btn btn-outline-primary" to="/about" -->
        <!-- >About</RouterLink -->
       
        <RouterLink to="/Pokemon" class="btn ms-2 me-2 btn-outline-primary"
          >Pokemon</RouterLink
        >-
        <RouterLink to="/favoritos" class="btn btn-outline-primary ms-2 me-2">
          Favoritos</RouterLink
        >
      </nav>
    </div>
  </header>

  <RouterView />
</template>
