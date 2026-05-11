<script setup>
import { useAuthStore } from "@/stores/auth.js"
const Auth = useAuthStore()
const props = defineProps({
  shiftId: {
    type: Number,
    required: true,
  },
  shiftUserCode: {
    type: String,
    required: true,
  },
  datum: {
    type: String,
    required: true,
  },
  startUur: {
    type: String,
    required: true,
  },
  eindUur: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <img
    src="@/img/update.svg"
    alt="Updaten"
    v-if="Auth.admin"
    class="update-icon"
    @click="
      Auth.updateShift(
        props.shiftId,
        props.shiftUserCode,
        props.datum,
        props.startUur,
        props.eindUur,
      )
    "
  />
</template>
<style scoped>

img{
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin: 0 0 -3% 35%;
}

@media screen and (max-width: 1130px) {
  img {
    width: 15px;
    height: 15px;
    margin: 0 0 -4% 20%;
  }
}


</style>
