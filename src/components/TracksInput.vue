<template>
  <div class="main">
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
  
  const input = ref<HTMLInputElement | null>();
  const fileSelect = ref<HTMLButtonElement | null>();
  
  const handleFileUpload = async ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    if (target && target.files) {
      updateStore(target.files);
    }
  }
</script>

<style>

</style>