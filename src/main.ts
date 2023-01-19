import { createApp } from 'vue';
import App from './App.vue';
import { createStore } from 'vuex';

import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons/iconfont/material-icons.css'

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
    track: (state) => (index: number) => {
      return store.state.trackList[index];
    }
  }
})

const app = createApp(App);
app.use(store);
app.mount("#app");