<template>
  <div>
    <h2 v-if="!isSection" v-text="title" />
    <h3 v-else v-text="title" />

    <ContentContainer :body="body" class="mb-4" />

    <OptionsView
      :options="options"
      :error="error || sectionError"
      v-model="choice"
    />

    <MessageNavigation
      v-if="!isSection"
      @previous="$store.dispatch('previousQuestion')"
      @next="next"
    />
  </div>
</template>

<script>
import ContentContainer from './ContentContainer';
import OptionsView from './OptionsView';
import MessageNavigation from './MessageNavigation';

export default {
  props: ['id', 'title', 'body', 'options', 'isSection', 'sectionError'],
  components: { ContentContainer, OptionsView, MessageNavigation },
  data() {
    return { choice: undefined, error: false };
  },
  methods: {
    next() {
      this.$store.dispatch('nextQuestion', this.choice);
      /* if (!this.options || this.choice) {
      } else {
        this.error = true;
      } */
    }
  },
  watch: {
    choice() {
      this.$emit('input', this.choice);
    },
    id() {
      this.error = false;
      this.choice = undefined;
    }
  }
};
</script>
