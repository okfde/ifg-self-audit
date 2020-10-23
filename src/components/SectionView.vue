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

    <MessageNavigation @previous="$emit('previous')" @next="next" />
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
    next() {
      this.errors = [];
      if (this.choices.length === this.section.length) {
        this.$emit('next', this.choices);
      } else {
        const errors = this.section
          .map((_, i) => i)
          .filter(i => !this.choices[i]);
        this.errors.push(...errors);
      }
    }
  }
};
</script>
