<template>
  <div>
    <h2 v-if="title" v-text="title" />
    <div v-html="body" class="mb-2" />

    <p>
      Von {{ totalPoints }} erreichbaren Punkten haben Sie
      {{ collectedPoints }} Punkt{{ collectedPoints === 1 ? '' : 'e' }}
      erreicht. Um mehr Transparenz zu schaffen, nehmen Sie sich folgende Punkte
      zu Herzen:
    </p>

    <ul class="mt-8">
      <li v-for="({ question }, i) in improvements" :key="i" class="mb-4">
        <h3>{{ question.problem }}</h3>
        <p>{{ question.guidance }}</p>
      </li>
    </ul>

    <button @click="print" class="btn btn-primary print:hidden">
      Ergebnis drucken
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
    }
  },
  methods: {
    print() {
      window.print();
    }
  }
};
</script>
