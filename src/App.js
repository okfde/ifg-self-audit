import { ResizeObserver } from '@juggle/resize-observer';

import SiteHeader from './components/SiteHeader';
import QuestionnaireView from './components/QuestionnaireView';

import { questionnaire } from './data/questionnaire.json';
import { version } from '../package.json';
import evaluateCondition from './evaluateCondition';

export default {
  name: 'App',
  components: { SiteHeader, QuestionnaireView },
  data() {
    return {
      currentQuestion: 0,
      answers: [],
      transition: 'next'
    };
  },
  mounted() {
    this.resize();

    const ro = new ResizeObserver(this.resize);
    ro.observe(document.body);
    document.addEventListener('resize', this.resize);
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
    resize() {
      const { offsetHeight } = document.body;
      console.log(offsetHeight);
      window.parent.postMessage(
        ['setIframeHeight', 'fds-shop-iframe', offsetHeight],
        '*'
      );
    },
    nextQuestion(choice) {
      this.transition = 'next';

      if (!this.section) {
        this.answers.push({ id: this.question.id, choice });
        this.currentQuestion++;
      } else {
        const answers = this.section.map((q, i) => ({
          id: q.id,
          choice: choice[i]
        }));

        this.answers.push(...answers);
        this.currentQuestion += this.section.length;
      }

      // check if the next question doesn't apply
      const next = questionnaire[this.currentQuestion];
      if (next && !evaluateCondition(next, this.answers)) this.nextQuestion();
    },
    previousQuestion() {
      this.transition = 'previous';

      if (this.currentQuestion > 0) {
        this.currentQuestion--;
        const previous = questionnaire[this.currentQuestion];
        const id = this.answers.findIndex(a => a.id === previous.id);
        if (id) {
          this.answers.splice(id, 1);
        }

        const { section } = previous;
        if (section) {
          const first = questionnaire.findIndex(q => q.section === section);
          const members = questionnaire.filter(q => q.section === section);
          this.currentQuestion = first;

          // delete answers
          for (const member of members) {
            const id = this.answers.findIndex(a => a.id === member.id);
            if (id) {
              this.answers.splice(id, 1);
            }
          }
        }

        if (!evaluateCondition(previous, this.answers)) this.previousQuestion();
      }
    },
    restart() {
      this.answers = [];
      this.currentQuestion = 0;
    },
    updateStore() {
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
      return questionnaire[this.currentQuestion] || {};
    },
    done() {
      return this.currentQuestion === questionnaire.length;
    },
    progress() {
      return (this.currentQuestion / questionnaire.length) * 100;
    },
    section() {
      if (!this.question) return false;

      const { section } = this.question;
      if (section) {
        return questionnaire.filter(q => q.section === section);
      }

      return false;
    },
    all() {
      const { question, done, progress, section } = this;
      return { ...this.$data, question, done, progress, section };
    }
  },
  watch: {
    currentQuestion: 'updateStore',
    answers: 'updateStore'
  }
};