<template>
  <div>
    <h2 v-if="title" v-text="title" />

    <div class="mt-4 stripe-left border-red" v-if="!allQuestionsAnswered">
      <strong>Sie haben nicht alle Fragen beantwortet.</strong> Die Qualität der
      Ergebnisse wird besser, je mehr Fragen Sie beantworten.
    </div>

    <ContentContainer :body="body" class="mb-2" />

    <div class="my-8">
      <div
        class="barometer"
        role="progressbar"
        aria-valuemin="0"
        :aria-valuemax="totalPoints"
        :aria-valuenow="collectedPoints"
      >
        <svg
          class="needle"
          :style="{
            marginLeft: barometerPosition
          }"
          width="24"
          height="24"
          viewBox="0 0 6.35 6.35"
        >
          <circle cx="3.175" cy="3.175" r="3.175" fill="#fff" />
        </svg>
      </div>

      <p class="text-sm mt-2 text-right">
        Von {{ totalPoints }} erreichbaren Punkten haben Sie
        <strong class="font-semibold">
          {{ collectedPoints }} Punkt{{
            collectedPoints === 1 ? '' : 'e'
          }}
          erreicht</strong
        >.
      </p>
    </div>

    <div v-if="improvements.length !== 0" class="mt-12">
      <h2>Tipps für mehr Transparenz</h2>

      <ul class="mt-6">
        <li
          v-for="({ question }, i) in improvements"
          :key="i"
          class="results-list"
          v-html="question.guidance"
        />
      </ul>
    </div>

    <div class="mt-12">
      <h2>Ihre Antworten</h2>

      <ul class="mt-6" :class="{ cutoff: hideAnswers }">
        <li
          v-for="{ answer, question } in answersWithQuestions"
          :key="question.id"
          class="results-list"
        >
          <h3>{{ question.title }}</h3>
          <p>
            Ihre Antwort: <em>{{ answer.choice.text }}</em>
          </p>
        </li>
      </ul>

      <p class="text-center print:hidden">
        <a href="#!" @click="hideAnswers = false" v-if="hideAnswers">
          Antworten ansehen...
        </a>
      </p>
    </div>

    <ResultsNavigation class="mt-12" />
  </div>
</template>

<script>
import { questionnaire, totalPoints } from '../data/questionnaire.json';
import ResultsNavigation from './ResultsNavigation';
import ContentContainer from './ContentContainer';

const { title, body } = questionnaire[questionnaire.length - 1];

export default {
  data() {
    return { title, body, totalPoints, hideAnswers: true };
  },
  components: { ContentContainer, ResultsNavigation },
  computed: {
    answers() {
      ResultsNavigation;
      const { answers } = this.$store.state;
      console.log('answers', { ...answers });
      return Object.keys(answers)
        .map(id => ({ id, choice: answers[id] }))
        .filter(a => a.choice);
    },
    answersWithQuestions() {
      return this.answers
        .map(answer => {
          const index = questionnaire.findIndex(q => q.id === answer.id);
          return {
            answer,
            question: { ...questionnaire[index], index }
          };
        })
        .sort((a, b) => a.question.index - b.question.index);
    },
    improvements() {
      return this.answersWithQuestions
        .filter(({ question }) => question.options && question.guidance)
        .filter(({ answer, question }) => {
          const best = Math.max(...question.options.map(o => o.points));

          return answer.choice && best !== answer.choice.points;
        })
        .sort((a, b) => b.question.priority - a.question.priority);
    },
    allQuestionsAnswered() {
      console.log('answers is', [...this.answers], this.answers.find);
      return questionnaire
        .filter(q => q.options)
        .every(q => this.answers.find(a => a.id === q.id)?.choice);
    },
    collectedPoints() {
      const p = this.answers.reduce((c, a) => (c += a.choice?.points || 0), 0);
      return Math.max(p, 0); // never go below 0 points
    },
    barometerPosition() {
      const percentage = this.collectedPoints / this.totalPoints;
      return `calc(${percentage * 100}% - ${percentage}rem)`;
    }
  }
};
</script>

<style lang="postcss" scoped>
.barometer {
  @apply flex w-4 h-4 rounded;
  background: linear-gradient(
    to right,
    theme('colors.red'),
    theme('colors.yellow.300'),
    theme('colors.green')
  );

  .needle {
    @apply h-4;
  }
}

ul {
  @apply list-none pl-0;
}

.stripe-left {
  @apply border-0 border-l-4 pl-4 border-solid;
}

li.results-list {
  @apply mb-4 stripe-left border-gray-300;

  >>> h3 {
    @apply text-base font-semibold !important;
  }
}

@media not print {
  ul.cutoff {
    max-height: theme('spacing.32');
    @apply overflow-hidden relative;

    &::after {
      @apply absolute inset-0;
      content: '';
      background: linear-gradient(
        to bottom,
        transparent,
        theme('colors.gray.100')
      );
    }
  }
}
</style>
