<template>
  <div class="flex mt-8" v-if="!$store.getters.done">
    <transition name="fade">
      <button
        @click="$store.dispatch('previousQuestion')"
        class="btn btn-secondary"
        v-if="!first"
      >
        Zurück
      </button>
    </transition>

    <span class="block text-center flex-1">
      Teil {{ answeredQuestions + 1 }} von {{ totalQuestions }}
    </span>

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
import { questionnaire } from '../data/questionnaire.json';
import uniq from 'lodash/uniq';

export default {
  computed: {
    first() {
      return this.$store.state.currentQuestion === 0;
    },
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

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
