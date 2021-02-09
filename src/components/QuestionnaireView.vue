<template>
  <div class="bg-gray-100 print:bg-transparent">
    <div
      class="h-1 bg-gray-600 transition-all duration-200 ease-out print:hidden"
      :style="{
        width: `${progress}%`
      }"
    />

    <div class="questionnaire">
      <transition
        :name="transition === 'next' ? 'slide' : 'slide-back'"
        mode="out-in"
      >
        <ResultsView
          v-if="done"
          v-on="$listeners"
          :totalPoints="totalPoints"
          :answers="answers"
          :key="question.id"
        />

        <SectionView v-else-if="section" v-on="$listeners" :key="question.id" />

        <MessageView
          v-else
          v-bind="question"
          v-on="$listeners"
          :isSection="false"
          :first="currentQuestion === 0"
          :key="question.id"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import MessageView from './MessageView';
import SectionView from './SectionView';
import ResultsView from './ResultsView';

import { mapGetters, mapState } from 'vuex';

export default {
  components: { MessageView, SectionView, ResultsView },
  computed: {
    ...mapState(['currentQuestion', 'answers', 'transition', 'totalPoints']),
    ...mapGetters(['question', 'done', 'progress', 'section'])
  }
};
</script>

<style lang="postcss" scoped>
.questionnaire {
  @apply p-8 overflow-hidden;

  @screen print {
    @apply px-0;
  }
}

.slide-enter-active,
.slide-back-enter-active {
  transition: opacity 0.2s, transform 0.2s cubic-bezier(0, 0, 0.2, 1);
}

.slide-leave-active,
.slide-back-leave-active {
  transition: opacity 0.2s, transform 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.slide-leave-to,
.slide-enter,
.slide-back-leave-to,
.slide-back-enter {
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-10%);
}

.slide-enter {
  transform: translateX(10%);
}

.slide-back-leave-to {
  transform: translateX(10%);
}

.slide-back-enter {
  transform: translateX(-10%);
}
</style>
