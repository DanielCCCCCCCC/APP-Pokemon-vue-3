import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Pokemon from "../views/PokemonView.vue";
import PokeView from "@/views/PokeView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/PokemonView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/pokemon",
      name: "pokemon",
      component: () => import("../views/PokemonView.vue"),
    },

    {
      path: "/Pokemon/:name",
      name: "poke",
      component: () => import("../views/PokeView.vue"),
    },
    {
      path: "/favoritos",
      name: "favoritos",
      component: () => import("../views/FavoritosView.vue"),
    },
    {
      path: "/:pathMatch(.*)",
      name: "NotFound",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

export default router;
