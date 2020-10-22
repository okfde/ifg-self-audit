<template>
  <div>
    <h2 v-if="title" v-text="title" />
    <div v-html="body" class="mb-2" />

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
      Von <strong>{{ totalPoints }} erreichbaren</strong> Punkten haben Sie
      <strong
        >{{ collectedPoints }} Punkt{{
          collectedPoints === 1 ? '' : 'e'
        }}
        erreicht</strong
      >.

      <span v-if="improvements.length === 0">
        Sie sind bereits auf dem besten Stand!
      </span>
      <span v-else>
        Um mehr Transparenz zu schaffen, nehmen Sie sich folgende Punkte zu
        Herzen:
      </span>
    </p>

    <ul class="mt-8">
      <li v-for="({ question }, i) in improvements" :key="i" class="mb-4">
        <h3>{{ question.problem }}</h3>
        <p>{{ question.guidance }}</p>
      </li>
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
export default {
  props: ['title', 'body', 'totalPoints', 'answers', 'questionaire'],
  computed: {
    improvements() {
      const qAndA = this.answers
        .map(answer => ({
          answer,
          question: this.questionaire.find(q => q.id === answer.id)
        }))
        .filter(({ question }) => question.options);

      console.log(qAndA);

      return qAndA
        .filter(({ answer, question }) => {
          const best = Math.max(...question.options.map(o => o.points));

          return best !== answer.choice.points;
        })
        .sort((a, b) => b.question.priority - a.question.priority);
    },
    collectedPoints() {
      return this.answers.reduce((c, a) => (c += a.choice?.points || 0), 0);
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
      if (window.confirm('Wollen Sie wirklich neustarten?')) {
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