import { createStore } from 'vuex';
import { createLogger } from 'vuex';
import * as mutations from './mutations';
import * as getters from './getters';

const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

const state: State = {
  player: null,
  volume: null,
  balance: 0,
  gains: [0, 0, 0, 0, 0, 0],
  showEqualizer: false,
  trackList: [],
  trackListInfo: [],
  currentTrack: 0
};

const store = createStore({
  state,
  mutations,
  getters,
  plugins,
  strict: true
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