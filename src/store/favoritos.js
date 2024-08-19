import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoritosStore = defineStore("favoritos", () => {
  const favoritos = ref([]); //getter
  if (localStorage.getItem("favoritos")) {
    favoritos.value = JSON.parse(localStorage.getItem("favoritos"));
    console.log(favoritos.value);
  }
  const add = (poke) => {
    favoritos.value.push(poke);
    localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
  };
  const remove = (id) => {
    favoritos.value = favoritos.value.filter((item) => item.data.id !== id);
    localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
  };
  const findPoke = (name) =>
    favoritos.value.find((item) => item.data.name === name);

  return {
    favoritos,
    add,
    remove,
    findPoke,
  };
});
