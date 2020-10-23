<template>
  <div class="container max-w-5xl mx-auto py-8 px-4 print:max-w-none print:p-0">
    <header class="mb-12 print:mb-4">
      <div class="print:flex">
        <div class="print:ml-auto print:order-2">
          <img src="./assets/logo.svg" class="w-14" />
        </div>
        <h1 class="mt-12 print:mt-0">IFG Self Audit</h1>
      </div>

      <span v-if="!done">
        Frage {{ currentQuestion + 1 }} von {{ questionaire.length }}
      </span>
    </header>

    <div class="bg-gray-100 print:bg-transparent">
      <div
        class="h-1 bg-gray-600 transition-all duration-200 ease-out print:hidden"
        :style="{
          width: `${progress}%`
        }"
      />

      <div class="p-8 pt-6 print:px-0">
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
    </div>

    <footer class="mt-12 print:mt-4 text-sm text-gray-600 flex">
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
import { questionaire, version } from './data/questionaire.json';
import evaluateCondition from './evaluateCondition';

const resultMessage = questionaire.pop();

export default {
  name: 'App',
  components: { MessageView, ResultsView },
  data() {
    return {
      questionaire,
      currentQuestion: 0,
      answers: [],
      resultMessage
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

      // check if the next question doesn't apply
      const next = this.questionaire[this.currentQuestion];
      if (!evaluateCondition(next, this.answers)) this.nextQuestion();
    },
    previousQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
        const previous = this.questionaire[this.currentQuestion];
        const id = this.answers.findIndex(a => a.id === previous.id);
        if (id) {
          this.answers.splice(id, 1);
        }

        if (!evaluateCondition(previous, this.answers)) this.previousQuestion();
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
    },
    progress() {
      return (this.currentQuestion / this.questionaire.length) * 100;
    }
  },
  watch: {
    currentQuestion: 'updateStore',
    answers: 'updateStore'
  }
};
</script>
