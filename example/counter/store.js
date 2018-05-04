import Vue from 'vue';
// import VueState from '../../src/index';
import VueState from 'vuex';

Vue.use(VueState);

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const state = {
  count: 0
};

const actions = {

  increment: ({dispatch}) => dispatch(INCREMENT),
  decrement: ({dispatch}) => dispatch(DECREMENT),

  incrementIfOdd: ({dispatch, state}) => {
    if ((state.count + 1) % 2 === 0) {
      dispatch(INCREMENT);
    }
  },

  // Same thing for async actions.
  incrementAsync: ({dispatch}) => {
    setTimeout(() => {
      dispatch(INCREMENT);
    }, 1000);
  },

  unknownMutation: ({dispatch}) => {
    dispatch('mutation-one');
  }
};

const mutations = {
  [INCREMENT] (state) {
    state.count++;
  },
  [DECREMENT] (state) {
    // mutation 必须是同步函数,此处为测试
    setTimeout(() => {
      state.count--;
    }, 1000);
  }
};

export default new VueState.Store({
  state,
  actions,
  mutations
});
