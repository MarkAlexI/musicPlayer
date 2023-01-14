<template>
  <div class="main">
    <p>{{ currTime + ' \/ ' + duration }}</p>
    <input
      ref="file"
      @change="handleFileUpload($event)"
      type="file"
      multiple
      accept="audio/*"
      style="display: none;">
    <button
      ref="fileSelect"
      type="button"
      @click="file.click()"
      >Select some files</button>
    <hr>
    <button v-show="isPlaying" @click="pause">Pause</button>
    <button v-show="!isPlaying" @click="play">Play</button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  
  const currTime = ref(0);
  const duration = ref(0);
  const isPlaying = ref(false);

  const file = ref<File | null>();
  const fileSelect = ref<HTMLButtonElement | null>();
  const player = new Audio();
  
  player.addEventListener('timeupdate', () => {
    currTime.value = Math.round(player.currentTime);
  });
  
  const pause = () => !!player.src && (isPlaying.value = !isPlaying.value, player.pause());
  const play = () => !!player.src && (isPlaying.value = !isPlaying.value, player.play());
  
  const handleFileUpload = async ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    if (target && target.files) {
      file.value = target.files[0];
      
      if (!!player.src) {
        player.pause();
        player.src = '';
      }
      
      player.src = URL.createObjectURL(file.value);
      try {
        await player.play();
        isPlaying.value = true;
        duration.value = Math.ceil(player.duration) || 0;
      } catch (error) {
        console.log('Failed to play, error: ' + error);
      }
      
      URL.revokeObjectURL(player.src);
    }
  }
  
</script>

<style>

</style>