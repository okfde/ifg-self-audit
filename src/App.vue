<template>
  <div class="container max-w-5xl mx-auto py-8 print:max-w-none">
    <header class="mb-12">
      <img src="./assets/logo.svg" class="w-14 text-center" />
      <h1 class="mt-6">IFG Self Audit</h1>
      <span v-if="!done">
        Frage {{ currentQuestion + 1 }} von {{ questionaire.length }}
      </span>
    </header>

    <div class="bg-gray-100 p-8">
      <ResultsView
        v-if="done"
        v-bind="resultMessage"
        :totalPoints="totalPoints"
        :questionaire="questionaire"
        :answers="answers"
      />
      <MessageView
        v-else
        v-bind="question"
        @next="nextQuestion"
        @previous="previousQuestion"
        :first="currentQuestion === 0"
      />
    </div>

    <footer class="mt-12 text-sm text-gray-600 flex">
      <span>
        Ein Projekt von
        <a href="https://fragdenstaat.de">FragDenStaat</a>.
      </span>

      <span class="ml-auto">
        <a href="https://fragdenstaat.de/impressum">Impressum</a>
      </span>
    </footer>
  </div>
</template>

<script>
import { version } from '../package.json';
import MessageView from './components/MessageView';
import ResultsView from './components/ResultsView';
import { questionaire, totalPoints } from './data/questionaire.json';

const resultMessage = questionaire.pop();

export default {
  name: 'App',
  components: { MessageView, ResultsView },
  data() {
    return {
      questionaire,
      currentQuestion: 0,
      answers: [],
      resultMessage,
      totalPoints
    };
  },
  mounted() {
    try {
      const stored = localStorage.getItem('store');
      const data = JSON.parse(stored);
      if (data.version === version) {
        this.currentQuestion = data.currentQuestion;
        this.answers = data.answers;
      }
    } catch {} // eslint-disable-line no-empty
  },
  methods: {
    nextQuestion(choice) {
      this.answers.push({ id: this.question.id, choice });
      this.currentQuestion++;
    },
    previousQuestion() {
      if (this.currentQuestion > 0) this.currentQuestion--;
    }
  },
  computed: {
    question() {
      return this.questionaire[this.currentQuestion];
    },
    done() {
      return this.currentQuestion === this.questionaire.length;
    }
  }
};
</script>
