<template>
  <div v-if="options" class="my-6">
    <div v-if="error" class="mb-1 text-red">
      <p><strong>Fehler:</strong> Bitte wählen Sie eine der Optionen.</p>
    </div>

    <div v-for="option in radios" :key="option.id" class="flex mb-1">
      <input type="radio" :value="option.id" v-model="choice" :id="option.id" />
      <label :for="option.id" class="ml-2 flex-1">{{ option.text }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: ['options', 'error'],
  data() {
    return { choice: '' };
  },
  computed: {
    radios() {
      return this.options?.map(o => ({
        ...o,
        id: Math.random().toString(36).substring(7)
      }));
    }
  },
  watch: {
    choice() {
      this.$emit(
        'input',
        this.radios.find(o => o.id === this.choice)
      );
    }
  }
};
</script>

<style lang="postcss" scoped>
input:checked + label {
  @apply font-semibold;
}
</style>
