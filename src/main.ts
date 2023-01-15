import { createApp } from 'vue';
import App from './App.vue';
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      string: ''
    }
  },
  mutations: {
    refresh(state, value) {
      state.string = value
    }
  },
  getters: {
    stringLength(state) {
      return store.state.string.length
    }
  }
})

const app = createApp(App);
app.use(store);
app.mount("#app");