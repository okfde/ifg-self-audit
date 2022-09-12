<template>
  <div>
    <component :is="isSection ? 'h3' : 'h2'" class="h5" v-text="title" />

    <div v-html="body" class="mb-3" />

    <OptionsView :options="options" v-model="choice" />
  </div>
</template>

<script>
import OptionsView from './OptionsView';

export default {
  props: ['id', 'title', 'body', 'options', 'isSection'],
  components: { OptionsView },
  data() {
    return { choice: undefined };
  },
  created() {
    const choice = this.$store.state.answers[this.id];
    if (choice) {
      this.choice = choice.id;
    }
  },
  watch: {
    choice() {
      this.$store.commit('addAnswer', {
        id: this.id,
        choice: this.choice
      });
    },
    id() {
      this.choice = undefined;
    }
  }
};
</script>
