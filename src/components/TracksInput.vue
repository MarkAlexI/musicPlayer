<template>
  <div class="main">
    <p>{{ currTime + ' \/ ' + duration }}</p>
    <input
      ref="input"
      @change="handleFileUpload($event)"
      type="file"
      multiple
      accept="audio/*"
      style="display: none;">
    <button
      ref="fileSelect"
      type="button"
      @click="input.click()"
      >Select some files</button>
    <hr>
    <button v-show="isPlaying" @click="pause">Pause</button>
    <button v-show="!isPlaying" @click="play">Play</button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  
  const updateStore = (newTracks: Tracks) => {
    store.commit('refreshTrackList', newTracks);
    console.log(store.getters.trackListLength);
  };
  
  const getTrack = (index) => {
    return store.getters.track(index);
  };
  
  const input = ref<HTMLInputElement | null>();
  const fileSelect = ref<HTMLButtonElement | null>();
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
  
  const handleFileUpload = async ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    if (target && target.files) {
      updateStore(target.files);
    }
  }
  
</script>

<style>

</style>