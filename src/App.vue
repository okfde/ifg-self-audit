<template>
  <div class="container max-w-5xl mx-auto py-8 px-4 print:max-w-none">
    <header class="mb-12">
      <img src="./assets/logo.svg" class="w-14 text-center" />
      <h1 class="mt-12">IFG Self Audit</h1>
      <span v-if="!done">
        Frage {{ currentQuestion + 1 }} von {{ questionaire.length }}
      </span>
    </header>

    <div class="bg-gray-100 p-8 print:bg-none">
      <ResultsView
        v-if="done"
        v-bind="resultMessage"
        :totalPoints="totalPoints"
        :questionaire="questionaire"
        :answers="answers"
        @restart="restart"
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

      <span class="ml-auto print:hidden">
        <a href="https://fragdenstaat.de/impressum">Impressum</a>
      </span>
    </footer>
  </div>
</template>

<script>
import MessageView from './components/MessageView';
import ResultsView from './components/ResultsView';
import { questionaire, totalPoints, version } from './data/questionaire.json';

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
  created() {
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
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
        this.answers.pop();
      }
    },
    restart() {
      this.answers = [];
      this.currentQuestion = 0;
    },
    updateStore() {
      console.log('updated');
      const store = {
        currentQuestion: this.currentQuestion,
        answers: this.answers,
        version
      };
      localStorage.setItem('store', JSON.stringify(store));
    }
  },
  computed: {
    question() {
      return this.questionaire[this.currentQuestion];
    },
    done() {
      return this.currentQuestion === this.questionaire.length;
    }
  },
  watch: {
    currentQuestion: 'updateStore',
    answers: 'updateStore'
  }
};
</script>
