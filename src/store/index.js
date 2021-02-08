import Vue from 'vue';
import Vuex from 'vuex';

import evaluateCondition from '../evaluateCondition';
import { questionnaire, totalPoints } from '../data/questionnaire.json';
import { version } from '../../package.json';
import alwaysArray from 'always-array';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentQuestion: 0,
    answers: [],
    transition: 'next',
    totalPoints
  },
  mutations: {
    setTransition(state, transition) {
      state.transition = transition;
    },
    setCurrentQuestion(state, i) {
      state.currentQuestion = i;
    },
    incrementCurrentQuestion(state, by = 1) {
      state.currentQuestion += by;
    },
    decrementCurrentQuestion(state, by = 1) {
      state.currentQuestion -= by;
    },
    addAnswer(state, answers) {
      state.answers.push(...alwaysArray(answers));
    },
    spliceAnswers(state, i) {
      state.answers.splice(i, 1);
    },
    restart(state) {
      state.transition = 'previous';
      state.answers = [];
      state.currentQuestion = 0;
    }
  },
  actions: {
    nextQuestion({ commit, getters, state, dispatch }, choice) {
      commit('setTransition', 'next');

      if (!getters.section) {
        commit('addAnswer', { id: getters.question.id, choice });
        commit('incrementCurrentQuestion');
      } else {
        const answers = getters.section.map((q, i) => ({
          id: q.id,
          choice: choice[i]
        }));

        commit('addAnswer', answers);
        commit('incrementCurrentQuestion', getters.section.length);
      }

      // check if the next question doesn't apply
      const next = questionnaire[state.currentQuestion];
      if (next && !evaluateCondition(next, this.answers))
        dispatch('nextQuestion');
    },
    previousQuestion({ state, commit, dispatch }) {
      commit('setTransition', 'previous');

      if (state.currentQuestion > 0) {
        commit('decrementCurrentQuestion');
        const previous = questionnaire[this.currentQuestion];
        const id = state.answers.findIndex(a => a.id === previous.id);
        if (id) {
          commit('spliceAnswers', id);
        }

        const { section } = previous;
        if (section) {
          const first = questionnaire.findIndex(q => q.section === section);
          const members = questionnaire.filter(q => q.section === section);
          commit('setCurrentQuestion', first);

          // delete answers
          for (const member of members) {
            const id = state.answers.findIndex(a => a.id === member.id);
            if (id) {
              commit('spliceAnswers', id);
            }
          }
        }

        if (!evaluateCondition(previous, state.answers))
          dispatch('previousQuestion');
      }
    }
  },
  getters: {
    question(state) {
      return questionnaire[state.currentQuestion] || {};
    },
    done(state) {
      return state.currentQuestion === questionnaire.length;
    },
    progress(state) {
      return (state.currentQuestion / questionnaire.length) * 100;
    },
    section(state, getters) {
      if (!getters.question) return false;

      const { section } = getters.question;
      if (section) {
        return questionnaire.filter(q => q.section === section);
      }

      return false;
    },
    all(state, getters) {
      const { question, done, progress, section } = getters;
      return { ...state, question, done, progress, section };
    }
  }
});

export default store;

try {
  const raw = localStorage.getItem('store');
  const data = JSON.parse(raw);
  if (data.version === version) {
    store.commit('setCurrentQuestion', data.currentQuestion);
    store.commit('addAnswer', data.answers);
  }
} catch {} // eslint-disable-line no-empty

store.subscribe(({ type }, state) => {
  if (type.includes('currentQuestion') || type.includes('Answer')) {
    const data = {
      currentQuestion: state.currentQuestion,
      answers: state.answers,
      version
    };

    localStorage.setItem('store', JSON.stringify(data));
  }
});
