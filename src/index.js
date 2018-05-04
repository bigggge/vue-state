/**
 * index.js
 *
 * @author bigggge(me@haoduoyu.cc)
 * 2018/5/3.
 */

let Vue;

export class Store {
  constructor ({state = {}, actions = {}, mutations = {}}) {
    const dispatch = this.dispatch;
    this.dispatch = (...args) => {
      dispatch.apply(this, args);
    };
    this._vm = new Vue({
      data: state
    });

    this._setupActions(actions);
    this._setupMutations(mutations);

  }

  get state () {
    return this._vm._data;
  }

  set state (v) {
    console.log(v);
    throw new Error('[vue-state] state is read only.');
  }

  // 构造 actions
  _setupActions (actions) {
    this.actions = Object.create(null);
    Object.keys(actions).forEach(name => {
      this.actions[name] = (...payload) => actions[name](this, ...payload);
    });
  }

  // 构造 mutations
  _setupMutations (mutations) {
    this._mutations = mutations;
  }

  dispatch (type, ...payload) {
    const mutation = this._mutations[type];
    if (mutation) {
      mutation(this.state, ...payload);
    } else {
      console.warn(`[vue-state] unknown mutation:${type}`);
    }
  }
}

export function install (_Vue) {
  Vue = _Vue;
  Vue.mixin({beforeCreate: init});
}

function init () {
  const options = this.$options;
  // store injection
  if (options.store) {
    this.$store = options.store;
  } else if (options.parent && options.parent.$store) {
    this.$store = options.parent.$store;
  }
}

export default {
  Store, install
};