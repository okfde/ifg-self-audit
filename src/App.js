import MessageView from './components/MessageView';
import SectionView from './components/SectionView';
import ResultsView from './components/ResultsView';
import { questionaire, version } from './data/questionaire.json';
import evaluateCondition from './evaluateCondition';
import uniq from 'lodash.uniq';

const resultMessage = questionaire.pop();

export default {
  name: 'App',
  components: { MessageView, SectionView, ResultsView },
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
      if (!this.section) {
        this.answers.push({ id: this.question.id, choice });
        this.currentQuestion++;
      } else {
        const answers = this.section.map(q => ({
          id: q.id,
          choice: choice.find(c => c.id === q.id)
        }));
        this.answers.push(...answers);
        this.currentQuestion += this.section.length;
      }

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

        const { section } = previous;
        if (section) {
          const first = this.questionaire.findIndex(q => q.section === section);
          const members = this.questionaire.filter(q => q.section === section);
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
      return this.questionaire[this.currentQuestion];
    },
    done() {
      return this.currentQuestion === this.questionaire.length;
    },
    totalQuestions() {
      const sections = this.questionaire.map(q => q.section).filter(Boolean);
      const uniqSections = uniq(sections);
      return this.questionaire.length - sections.length + uniqSections.length;
    },
    answeredQuestions() {
      const answered = this.questionaire.slice(0, this.currentQuestion);
      const sections = answered.map(q => q.section).filter(Boolean);
      const uniqSections = uniq(sections);

      return this.currentQuestion - sections.length + uniqSections.length;
    },
    progress() {
      return (this.currentQuestion / this.questionaire.length) * 100;
    },
    section() {
      const { section } = this.question;
      if (section) {
        return this.questionaire.filter(q => q.section === section);
      }

      return false;
    }
  },
  watch: {
    currentQuestion: 'updateStore',
    answers: 'updateStore'
  }
};
