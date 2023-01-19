<template>
  <div class="main card-panel">
    <hr>
    <p class="deep-purple-text">{{ currTime + ' \/ ' + duration }}</p>
    <button v-show="isPlaying" @click="pause">Pause</button>
    <button v-show="!isPlaying" @click="play">Play</button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  
  const getTrack = (index: number) => {
    return store.getters.track(index);
  };
  
  const player = new Audio();
  
  const currTime = ref(0);
  const duration = ref(0);
  const currTrack = ref(0);
  const isPlaying = ref(false);
  
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
  
  store.subscribe((mutation, state) => {
    if (mutation.type === 'refreshTrackList') {
      currTrack.value = 0;
      playNewTrack(currTrack.value);
    }
  });
</script>

<style>

</style>