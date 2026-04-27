import { defineStore } from 'pinia';
import {ref} from "vue";

export const useAuthStore = defineStore('auth', () => {
  const error = ref(null);

  function setError(err){
    error.value = err;
  }

  async function login(code){
  setError("wordt aan gewerkt");
  }
  return {login, error};
});
