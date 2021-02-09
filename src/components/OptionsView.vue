<template>
  <div v-if="options" class="my-6">
    <div v-if="error" class="mb-1 text-red">
      <p><strong>Fehler:</strong> Bitte wählen Sie eine der Optionen.</p>
    </div>

    <div
      v-for="option in options"
      :key="option.id"
      class="flex mb-1 items-center"
    >
      <input type="radio" :value="option.id" :id="option.id" v-model="choice" />
      <label :for="option.id" class="ml-2 flex-1">{{ option.text }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: ['options', 'value'],
  data() {
    return { choice: '' };
  },
  created() {
    this.choice = this.value ?? '';
  },
  computed: {
    error() {
      return this.$store.state.error && !this.choice;
    }
  },
  watch: {
    choice() {
      const choice = this.options.find(o => o.id === this.choice);
      this.$emit('input', choice);
    }
  }
};
</script>

<style lang="postcss" scoped>
/* input:checked + label {
  @apply font-semibold;
} */
</style>
