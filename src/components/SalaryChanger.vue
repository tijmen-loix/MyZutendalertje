<script setup>
import { formatSalary } from "@/utils/functions.js"
import { useAuthStore } from "@/stores/auth.js"
import { ref } from "vue"
const Auth = useAuthStore()

const uurloon = ref(formatSalary(Number(Auth.user?.uurloon ?? 0)))

const visible = ref(false)

function toggleVisible() {
  visible.value = !visible.value
}

function saveUurloon() {
  Auth.updateUurloon(Number(uurloon.value))
  toggleVisible()
}
</script>
<template>
  <section class="uurloon">
    <h2>Uurloon: €</h2>
    <input type="number" v-model="uurloon" @change="toggleVisible" />
    <button v-if="visible" @click="saveUurloon" :disabled="Auth.updatingUurloon">-></button>
    <p v-if="Auth.error" :class="Auth.error.type">{{Auth.error.message}}</p>
  </section>
</template>
<style scoped>
.uurloon {
  display: flex;
  align-items: flex-start;
  margin: 0 40px 0 40px;
  font-style: italic;
}
input {
  background: transparent;
  border: none;
  color: var(--white-soft);
  margin: 3px 4px 0 8px;
  width: 80px;
  outline: none;
  font-size: 20px;
  font-weight: 500;
  font-style: italic;
}
input:focus {
  border-bottom: 2px solid var(--secondary);
}

button {
  margin: 0 20px 0 10px;
  background-color: var(--secondary);
  color: var(--white);
  width: 35px;
  border-radius: 16px;
}

h2 {
  margin-top: -4px;
  font-weight: 500;
  font-size: 22px;
}
p {
  display: block;
}

@media screen and (max-width: 1130px) {
  .uurloon {
    margin: 5px 0 20px 10px;
  }
  h2 {
    font-size: 14px;
  }
  input {
    margin: 0 4px 0 8px;
    font-size: 14px;
    width: 60px;
  }
  button {
    margin: 0 20px -20px 0;
    width: 30px;
    font-size: 14px;
    padding: 2px;
    border-radius: 16px;
  }
  p {
    display: none;
  }
}
</style>
