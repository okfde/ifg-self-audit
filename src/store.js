import Vue from 'vue';
import Vuex from 'vuex';
import { JSONCrush, JSONUncrush } from 'jsoncrush';

import evaluateCondition from './evaluateCondition';
import { questionnaire, totalPoints } from './data/questionnaire.json';
import { version } from '../package.json';

Vue.use(Vuex);

const uppercase = s => s.charAt(0).toUpperCase() + s.slice(1);
const setter = key => (state, to) => (state[key] = to);
const setters = (...keys) =>
  keys.reduce((obj, key) => {
    const method = `set${uppercase(key)}`;
    obj[method] = setter(key);
    return obj;
  }, {});

const store = new Vuex.Store({
  state: {
    currentQuestion: 0,
    answers: {},
    transition: 'next',
    totalPoints,
    error: false,
    errorsOkay: false
  },
  mutations: {
    ...setters(
      'currentQuestion',
      'answers',
      'transition',
      'error',
      'errorsOkay'
    ),
    incrementCurrentQuestion(state, by = 1) {
      state.currentQuestion += by;
    },
    decrementCurrentQuestion(state, by = 1) {
      state.currentQuestion -= by;
    },
    addAnswer(state, answer) {
      state.answers[answer.id] = answer.choice;
    },
    restart(state) {
      state.transition = 'previous';
      state.answers = {};
      state.currentQuestion = 0;
    }
  },
  actions: {
    nextQuestion({ commit, state, getters, dispatch }) {
      // check for errors, if the user isn't okay with them
      if (!state.errorsOkay) {
        let error = false;
        if (getters.section) {
          error = !getters.section.every(q => state.answers[q.id]?.choice);
        } else {
          error = state.answers[getters.question.id]?.choice;
        }

        commit('setError', error);

        if (error) {
          const p = window.confirm(
            'Sie haben nicht alle Fragen beantwortet. Möchten Sie trotzdem fortfahren?'
          );
          if (p) {
            commit('setError', false);
            commit('setErrorsOkay', true);
          } else {
            return;
          }
        }
      }

      commit('setTransition', 'next');
      commit(
        'incrementCurrentQuestion',
        getters.section ? getters.section.length : 1
      );

      // check if the next question doesn't apply
      const next = questionnaire[state.currentQuestion];
      if (next && !evaluateCondition(next, this.answers))
        dispatch('nextQuestion');
    },
    previousQuestion({ state, commit, dispatch }) {
      commit('setError', false);
      commit('setTransition', 'previous');

      if (state.currentQuestion > 0) {
        commit('decrementCurrentQuestion');
        const previous = questionnaire[state.currentQuestion];

        const { section } = previous;
        if (section) {
          const first = questionnaire.findIndex(q => q.section === section);
          commit('setCurrentQuestion', first);
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
      return state.currentQuestion === questionnaire.length - 1;
    },
    progress(state) {
      return (state.currentQuestion / questionnaire.length) * 100;
    },
    section(_, getters) {
      if (!getters.question) return false;

      const { section } = getters.question;
      if (section) {
        return questionnaire.filter(q => q.section === section);
      }

      return false;
    },
    persistantData(state) {
      return {
        currentQuestion: state.currentQuestion,
        answers: state.answers,
        errorsOkay: state.errorsOkay,
        version
      };
    },
    persistantUrlData(_, getters) {
      const data = getters.persistantData;
      return JSONCrush(JSON.stringify(data));
    },
    permalink(_, getters) {
      const url = new URL(window.location.href);
      url.hash = getters.persistantUrlData;
      return url.href;
    }
  }
});

function dataFromLocalStorage() {
  const raw = localStorage.getItem('store');
  return JSON.parse(raw);
}

function dataFromUrl() {
  const raw = decodeURIComponent(window.location.hash.slice(1));
  return JSONUncrush(raw);
}

try {
  let data = {};

  if (window.location.hash) {
    data = dataFromUrl();
  }

  if (!data.version) {
    data = dataFromLocalStorage();
  }

  if (data.version === version) {
    store.commit('setCurrentQuestion', data.currentQuestion);
    store.commit('setAnswers', data.answers);
    store.commit('setErrorsOkay', data.errorsOkay);
  }
} catch {} // eslint-disable-line no-empty

store.subscribe(({ type }) => {
  if (type.includes('CurrentQuestion') || type.includes('Answer')) {
    const data = store.getters.persistantData;
    localStorage.setItem('store', JSON.stringify(data));
  }
});

export default store;
