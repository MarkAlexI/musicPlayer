<template>
  <div class="main card-panel">
    <TrackVisualizer />

    <div class="duration-info">
      <p class="deep-purple-text">
        {{ formatTime(currTime) + ' \/ ' + formatTime(duration) }}
      </p>

      <div class="marquee">
        <p class="wave">{{ trackName || 'Selected to play...' }}</p>
      </div>
    </div>

    <button class="btn waves-effect waves-light" @click="changeTrack(-1)">
      <i class="material-icons">skip_previous</i>
    </button>
    <button class="btn waves-effect waves-light" v-show="isPlaying" @click="pause">Pause
      <i class="material-icons right">pause</i>
    </button>
    <button class="btn waves-effect waves-light" v-show="!isPlaying" @click="play">Play
      <i class="material-icons right">play_arrow</i>
    </button>
    <button class="btn waves-effect waves-light" @click="changeTrack(1)">
      <i class="material-icons">skip_next</i>
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import TrackVisualizer from '@/TrackVisualizer.vue';
  import formatTime from '../utils/formatTime';
  import { vibrate } from '../utils/vibrate';

  const store = useStore();

  const getTrack = (index: number): File => {
    return store.getters.track(index);
  };

  const getTrackListLength = (): number => {
    return store.getters.trackListLength;
  };

  const getCurrTrack = (): number => {
    return store.getters.currentTrack;
  };

  const updateCurrTrack = (newCurrTrack: number): void => {
    store.commit('refreshCurrentTrack', newCurrTrack);
  }

  const player = new Audio();
  store.commit('refreshPlayer', player);

  const currTime = ref(0);
  const duration = ref(0);
  const currTrack = ref(0);
  const isPlaying = ref(false);
  const trackName = ref('');

  player.addEventListener('timeupdate', () => {
    currTime.value = Math.round(player.currentTime);
    if (player.currentTime === player.duration) {
      const track = getTrack(currTrack.value + 1);
      updateCurrTrack(!!track ?
        currTrack.value + 1 :
        0);
    }
  });

  const pause = () => !!player.src && (isPlaying.value = !isPlaying.value, vibrate(), player.pause());
  const play = () => !!player.src && (isPlaying.value = !isPlaying.value, vibrate(), player.play());

  const playNewTrack = async (index: number) => {
    vibrate();
    
    const track = getTrack(index);
    if (!!!track) return;
    
    trackName.value = track.name;

    if (!!player.src) {
      player.pause();
      player.src = '';
      isPlaying.value = false;
    }

    player.src = URL.createObjectURL(track);
    try {
      await player.play();
      
      isPlaying.value = true;
      duration.value = Math.round(player.duration) || 0;
    } catch (error) {
      console.log('Failed to play, error: ' + error);
    }

    URL.revokeObjectURL(player.src);
  };

  const changeTrack = (direction: number): void => {
    
    const trackListLength = getTrackListLength();
    if (trackListLength === 0) return;
    let nextTrack = currTrack.value + direction;
    nextTrack = nextTrack > trackListLength ?
      0 :
      nextTrack < 0 ?
      trackListLength - 1 :
      nextTrack;
    vibrate();
    updateCurrTrack(nextTrack);
  };

  store.subscribe((mutation, state) => {
    if (mutation.type === 'refreshTrackList') {
      updateCurrTrack(0);
    }

    if (mutation.type === 'refreshCurrentTrack') {
      currTrack.value = getCurrTrack();
      playNewTrack(currTrack.value);
    }
  });
</script>

<style>
  .main {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
  }

  .duration-info {
    width: 420px;
    break-after: always;
  }

  .marquee {
    overflow: hidden;
    min-width: 100%;
    background-color: teal;
    color: whitesmoke;
    margin: 0 auto .75rem auto;
    padding: .3rem;
  }

  .wave {
    display: inline-block;
    z-index: 0;
    font-size: 1.1rem;
    animation: marquee 10s linear infinite;
  }

  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }

    100% {
      transform: translateX(-100%);
    }
  }

  .btn {
    display: block;
  }
</style>