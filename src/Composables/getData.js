import { ref } from "vue";
import axios from "axios";

export const useGetDataBasica = () => {
  const data = ref(null);
  const loading = ref(true);
  const photos = ref(null);
  const sound = ref(null);

  const getData = async (url) => {
    loading.value = true;
    try {
      const response = await axios.get(url);
      const result = response.data;

      // Asegúrate de que los datos existan antes de asignarlos
      data.value = result;
      photos.value = result.sprites?.front_default || null;
      sound.value = result.cries?.latest || null;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      loading.value = false;
    }
  };

  return {
    getData,
    data,
    photos,
    sound,
    loading,
  };
};

export const useGetDataEspecies = () => {
  const loading = ref(true);
  const dataEspecies = ref(null);

  const getDataEspecies = async (url) => {
    loading.value = true;
    try {
      const response = await axios.get(url);
      dataEspecies.value = response.data || null;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      loading.value = false;
    }
  };

  return {
    getDataEspecies,
    dataEspecies,
    loading,
  };
};

export const useGetDataRugido = () => {
  const loading = ref(true);
  const dataRugido = ref(null);

  const getDataRugido = async (url) => {
    loading.value = true;
    try {
      const response = await axios.get(url);
      dataRugido.value = response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      loading.value = false;
    }
  };

  return {
    getDataRugido,
    dataRugido,
    loading,
  };
};
