import { createApp } from 'vue';
import App from './App.vue';
import { createStore } from 'vuex';

import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons/iconfont/material-icons.css'

const store = createStore({
  state() {
    return {
      trackList: [],
      trackListInfo: []
    }
  },
  mutations: {
    refreshTrackList(state, newValue) {
      state.trackList = newValue;
    },
    refreshTrackListInfo(state) {
      let tracksInfo: Array < Object > = [];
      const len = state.trackList.length;
      const files = state.trackList;
      
      for (let i = 0; i < len; i++) {
        tracksInfo.push({
          name: files[i].name,
          size: files[i].size,
          index: i
        });
      }
      state.trackListInfo = tracksInfo;
    }
  },
  getters: {
    trackListLength(state) {
      return state.trackList.length;
    },
    track: (state) => (index: number) => {
      return state.trackList[index];
    },
    trackListInfo(state) {
      return state.trackListInfo;
    }
  }
});

const app = createApp(App);
app.use(store);
app.mount("#app");