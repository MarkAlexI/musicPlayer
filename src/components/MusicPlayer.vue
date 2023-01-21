<template>
  <div class="main card-panel">
    <div class="duration-info">
      <p class="deep-purple-text">{{ currTime + ' \/ ' + duration }}</p>
    
      <p>
        <marquee behaviour="alternate" bgcolor="teal"><span class="wave">{{ trackName || 'Selected to play...' }}</span></marquee>
      </p>
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
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  
  const getTrack = (index: number): File => {
    return store.getters.track(index);
  };
  
  const getTrackListLength = (): number => {
    return store.getters.trackListLength;
  };
  
  const player = new Audio();
  
  const currTime = ref(0);
  const duration = ref(0);
  const currTrack = ref(0);
  const isPlaying = ref(false);
  const trackName = ref('');
  
  player.addEventListener('timeupdate', () => {
    currTime.value = Math.round(player.currentTime);
    if (player.currentTime === player.duration) {
      const track = getTrack(currTrack.value + 1);
      currTrack.value = !!track ?
        currTrack.value + 1 :
        0;
      playNewTrack(currTrack.value);
    }
  });
  
  const pause = () => !!player.src && (isPlaying.value = !isPlaying.value, player.pause());
  const play = () => !!player.src && (isPlaying.value = !isPlaying.value, player.play());
  
  const playNewTrack = async (index: number) => {
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
    currTrack.value = nextTrack > trackListLength
      ? 0
      : nextTrack < 0
      ? trackListLength - 1
      : nextTrack;
    
    playNewTrack(currTrack.value);
  };
  
  store.subscribe((mutation, state) => {
    if (mutation.type === 'refreshTrackList') {
      currTrack.value = 0;
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
    width: 100%;
    break-after: always;
  }
  
  .wave {
    font-size: 1.1rem;
    color: white;
  }
  
  .btn {
    display: block;
  }
</style>