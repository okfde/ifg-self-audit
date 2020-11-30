<template>
  <div>
    <h2>{{ sectionTitle }}</h2>

    <MessageView
      v-for="(question, i) in section"
      :key="question.id"
      :isSection="true"
      :sectionError="errors.includes(i)"
      v-bind="question"
      v-model="choices[i]"
    />

    <MessageNavigation
      @previous="$emit('previous')"
      @next="next"
      :error="errors.length !== 0"
    />
  </div>
</template>

<script>
import MessageView from './MessageView';
import MessageNavigation from './MessageNavigation';
import { sections } from '../data/questionnaire.json';

export default {
  props: ['section'],
  data() {
    return { choices: [], errors: [] };
  },
  components: { MessageView, MessageNavigation },
  computed: {
    sectionTitle() {
      return sections[this.section[0].section];
    }
  },
  methods: {
    checkForErrors() {
      this.errors = [];
      const choices = this.choices.filter(Boolean);

      if (choices.length === this.section.length) {
        return true;
      }

      const errors = this.section
        .map((_, i) => i)
        .filter(i => !this.choices[i]);
      this.errors.push(...errors);

      return false;
    },
    next() {
      if (this.checkForErrors()) {
        this.$emit('next', this.choices);
      }
    }
  },
  watch: {
    choices() {
      if (this.errors.length !== 0) {
        this.checkForErrors();
      }
    }
  }
};
</script>
