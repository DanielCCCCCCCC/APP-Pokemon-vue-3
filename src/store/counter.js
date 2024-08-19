import { defineStore } from "pinia";
import { computed, ref } from "vue";
//Definición de tienda (option api)
// export const useCounterStore = defineStore("counter", {
//   state: () => ({
//     count: 0,
//   }),
//   actions: {
//     increment() {
//       this.count++;
//     },
//   },
//   getters: {
//     double: (state) => state.count * 2,
//   },
// });

//Definición de tienda (Composition )

export const useCounterStore = defineStore("counter", () => {
 
  const count = ref(0); // state - referencias 

   const increment = () => { //funciones
    count.value++;
  };

  const double = computed(() => count.value * 2); //se pueden crear operacion computadas

  return {
    count,
    increment,
    double,
  };
});
