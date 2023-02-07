import { createStore } from 'vuex';
import * as mutations from './mutations';
import * as getters from './getters';

const state: State = {
  player: null,
  volume: null,
  balance: 0,
  gainSixtyHz: 0,
  showEqualizer: false,
  trackList: [],
  trackListInfo: [],
  currentTrack: 0
};

const store = createStore({
  state,
  mutations,
  getters
});

if (module.hot) {
  module.hot.accept([
 './getters',
 './mutations'
 ], () => {
    store.hotUpdate({
      getters: require('./getters'),
      mutations: require('./mutations')
    })
  })
}

export default store;