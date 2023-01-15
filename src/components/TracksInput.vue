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
  
  const input = ref<HTMLInputElement | null>();
  const files = ref <FileList | null>();
  const fileSelect = ref<HTMLButtonElement | null>();
  const player = new Audio();
  
  const currTime = ref(0);
  const duration = ref(0);
  const currTrack = ref(0);
  const isPlaying = ref(false);
  
  player.addEventListener('timeupdate', () => {
    currTime.value = Math.round(player.currentTime);
    if (player.currentTime === player.duration) {
      currTrack.value = !!files.value[currTrack.value + 1] ?
        currTrack.value + 1 :
        0;
      playNewTrack(currTrack.value);
    }
  });
  
  const pause = () => !!player.src && (isPlaying.value = !isPlaying.value, player.pause());
  const play = () => !!player.src && (isPlaying.value = !isPlaying.value, player.play());
  
  const playNewTrack = async (index: number) => {
    if (!!!files.value[index]) return;
    if (!!player.src) {
      player.pause();
      player.src = '';
      isPlaying.value = false;
    }
  
    player.src = URL.createObjectURL(files.value[index]);
    try {
      await player.play();
      isPlaying.value = true;
      duration.value = Math.round(player.duration) || 0;
    } catch (error) {
      console.log('Failed to play, error: ' + error);
    }
  
    URL.revokeObjectURL(player.src);
  };
  
  const handleFileUpload = async ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    if (target && target.files) {
      files.value = target.files;
      currTrack.value = 0;
      playNewTrack(currTrack.value);
    }
  }
  
</script>

<style>

</style>