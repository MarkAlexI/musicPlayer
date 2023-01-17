import { createApp } from 'vue';
import App from './App.vue';
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      trackList: []
    }
  },
  mutations: {
    refreshTrackList(state, newValue) {
      state.trackList = newValue;
    }
  },
  getters: {
    trackListLength(state) {
      return store.state.trackList.length;
    },
    track: (state) => (index) => {
      return store.state.trackList[index];
    }
  }
})

const app = createApp(App);
app.use(store);
app.mount("#app");