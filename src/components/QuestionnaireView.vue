<template>
  <div class="bg-gray-100 print:bg-transparent">
    <div
      class="h-1 bg-gray-600 transition-all duration-200 ease-out print:hidden"
      :style="{
        width: `${progress}%`
      }"
    />

    <div class="p-8 pt-6 print:px-0 overflow-hidden">
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
