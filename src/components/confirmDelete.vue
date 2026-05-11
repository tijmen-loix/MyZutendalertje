<script setup>
const emit = defineEmits(["confirm", "cancel"])

const props = defineProps({
  datum: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="overlay">
    <div class="modal">
      <p>Ben je zeker dat je shift {{ props.datum }} wil verwijderen?</p>
      <div class="buttons">
        <button @click="emit('confirm')" class="confirm">Verwijderen</button>
        <button @click="emit('cancel')" class="cancel">Annuleren</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal {
  background: var(--black-soft);
  padding: 20px;
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.confirm {
  background: var(--error);
  color: var(--white);
}

.cancel {
  background: var(--black-mute);
  color: var(--white-soft);
}
</style>
