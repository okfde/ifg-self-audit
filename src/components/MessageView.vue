<template>
  <div>
    <h2 v-if="title" v-text="title" />
    <ContentContainer :body="body" class="mb-4" />

    <div v-if="error" class="mb-2 mt-8">
      <p><strong>Fehler:</strong> Bitte wählen Sie eine der Optionen.</p>
    </div>
    <OptionsView :options="options" v-model="choice" />

    <div class="flex mt-12">
      <button
        @click="$emit('previous')"
        class="btn btn-secondary"
        v-if="!first"
      >
        Zurück
      </button>

      <button @click="next" class="btn btn-primary ml-auto">
        Weiter
      </button>
    </div>
  </div>
</template>

<script>
import ContentContainer from './ContentContainer';
import OptionsView from './OptionsView';

export default {
  props: ['title', 'body', 'options', 'first'],
  components: { ContentContainer, OptionsView },
  data() {
    return { choice: undefined, error: false };
  },
  methods: {
    next() {
      if (!this.options || this.choice) {
        this.$emit('next', this.choice);
      } else {
        this.error = true;
      }
    }
  },
  watch: {
    title() {
      this.error = false;
    }
  }
};
</script>
