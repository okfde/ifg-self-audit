<template>
  <div>
    <h2 v-if="title" v-text="title" />
    <ContentContainer :body="body" class="mb-2" />

    <div class="barometer">
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
        Um mehr Transparenz zu schaffen, nehmen Sie sich folgende Punkte zu
        Herzen:
      </span>
    </p>

    <ul class="mt-8">
      <li
        v-for="({ question }, i) in improvements"
        :key="i"
        class="mb-4"
        v-html="question.guidance"
      />
    </ul>

    <button @click="print" class="btn btn-primary print:hidden mt-4">
      Ergebnis drucken
    </button>

    <button @click="restart" class="btn btn-secondary print:hidden mt-4 ml-2">
      Neu beginnen
    </button>
  </div>
</template>

<script>
import { questionnaire, totalPoints } from '../data/questionnaire.json';
import ContentContainer from './ContentContainer';

const { title, body } = questionnaire.pop();

export default {
  props: ['answers'],
  data() {
    return { title, body, totalPoints };
  },
  components: { ContentContainer },
  computed: {
    improvements() {
      return this.answers
        .map(answer => ({
          answer,
          question: questionnaire.find(q => q.id === answer.id)
        }))
        .filter(({ question }) => question.options && question.guidance)
        .filter(({ answer, question }) => {
          const best = Math.max(...question.options.map(o => o.points));

          return best !== answer.choice.points;
        })
        .sort((a, b) => b.question.priority - a.question.priority);
    },
    collectedPoints() {
      const p = this.answers.reduce((c, a) => (c += a.choice?.points || 0), 0);
      return Math.max(p, 0); // never go below 0 points
    },
    barometerPosition() {
      const percentage = this.collectedPoints / this.totalPoints;
      return `calc(${percentage * 100}% - ${percentage}rem)`;
    }
  },
  methods: {
    print() {
      window.print();
    },
    restart() {
      if (window.confirm('Möchten Sie wirklich neu starten? Sie verlieren die eingegebenen Daten.')) {
        this.$emit('restart');
      }
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
</style>
