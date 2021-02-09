<template>
  <div class="flex mt-8">
    <button
      @click="$store.dispatch('previousQuestion')"
      class="btn btn-secondary"
      v-if="!first"
    >
      Zurück
    </button>

    <button
      @click="$store.dispatch('nextQuestion')"
      class="btn btn-primary ml-auto"
      :class="{ 'btn-error': $store.state.error }"
    >
      Weiter
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    first() {
      return this.$store.state.currentQuestion === 0;
    }
  }
};
</script>
