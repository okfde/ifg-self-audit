<template>
  <header class="mb-12 print:mb-4">
    <h1 class="print:mt-0">IFG Self-Audit</h1>

    <span v-if="!done">
      Teil {{ answeredQuestions + 1 }} von {{ totalQuestions }}
    </span>
  </header>
</template>

<script>
import { questionnaire } from '../data/questionnaire.json';
import uniq from 'lodash/uniq';

export default {
  props: ['currentQuestion', 'done'],
  computed: {
    totalQuestions() {
      const sections = questionnaire.map(q => q.section).filter(Boolean);
      const uniqSections = uniq(sections);
      return questionnaire.length - sections.length + uniqSections.length;
    },
    answeredQuestions() {
      const answered = questionnaire.slice(0, this.currentQuestion);
      const sections = answered.map(q => q.section).filter(Boolean);
      const uniqSections = uniq(sections);

      return this.currentQuestion - sections.length + uniqSections.length;
    }
  }
};
</script>
