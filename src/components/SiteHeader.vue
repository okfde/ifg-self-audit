<template>
  <header class="my-6 print:mb-4">
    <h1 class="print:mt-0">IFG Self-Audit</h1>

    <span v-if="!$store.getters.done">
      Teil {{ answeredQuestions + 1 }} von {{ totalQuestions }}
    </span>
  </header>
</template>

<script>
import { questionnaire } from '../data/questionnaire.json';
import uniq from 'lodash/uniq';

export default {
  computed: {
    totalQuestions() {
      const sections = questionnaire.map(q => q.section).filter(Boolean);
      const uniqSections = uniq(sections);
      return questionnaire.length - sections.length + uniqSections.length;
    },
    answeredQuestions() {
      const { currentQuestion } = this.$store.state;
      const answered = questionnaire.slice(0, currentQuestion);
      const sections = answered.map(q => q.section).filter(Boolean);
      const uniqSections = uniq(sections);

      return currentQuestion - sections.length + uniqSections.length;
    }
  }
};
</script>
