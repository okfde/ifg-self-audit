<template>
  <div>
    <h2 v-if="title" v-text="title" />

    <div class="my-4" v-if="!allQuestionsAnswered">
      <strong>Sie haben nicht alle Fragen beantwortet.</strong> Die Qualität der
      Ergebnisse wird besser, je mehr Fragen Sie beantworten.
    </div>

    <ContentContainer :body="body" class="mb-2" />

    <div class="barometer flex">
      <img
        src="../assets/circle.svg"
        class="needle"
        :style="{
          marginLeft: barometerPosition
        }"
      />
    </div>

    <p>
      Von
      <strong>{{ totalPoints }} erreichbaren</strong>
      Punkten haben Sie
      <strong>
        {{ collectedPoints }} Punkt{{
          collectedPoints === 1 ? '' : 'e'
        }}
        erreicht</strong
      >.

      <span v-if="improvements.length !== 0">
        Befolgen Sie unsere Tipps, um mehr Transparenz zu schaffen:
      </span>
    </p>

    <ul class="mt-8">
      <li
        v-for="({ question }, i) in improvements"
        :key="i"
        class="improvement"
        v-html="question.guidance"
      />
    </ul>

    <ResultsNavigation />
  </div>
</template>

<script>
import { questionnaire, totalPoints } from '../data/questionnaire.json';
import ResultsNavigation from './ResultsNavigation';
import ContentContainer from './ContentContainer';

const { title, body } = questionnaire.pop();

export default {
  data() {
    return { title, body, totalPoints };
  },
  components: { ContentContainer, ResultsNavigation },
  computed: {
    answers() {
      ResultsNavigation;
      const { answers } = this.$store.state;
      console.log('answers', { ...answers });
      return Object.keys(answers).map(id => ({ id, choice: answers[id] }));
    },
    improvements() {
      return this.answers
        .map(answer => ({
          answer,
          question: questionnaire.find(q => q.id === answer.id)
        }))
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
  @apply w-full h-4 rounded my-4;
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

li.improvement {
  @apply mb-4 border-l-4 pl-4 border-solid;

  >>> h3 {
    @apply text-base font-bold;
  }
}
</style>
