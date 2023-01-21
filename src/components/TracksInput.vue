<template>
  <div class="card-panel">
    <input
      ref="input"
      @change="handleFileUpload($event)"
      type="file"
      multiple
      accept="audio/*"
      style="display: none;">
    <button
      class="btn waves-effect waves-light"
      ref="fileSelect"
      type="button"
      @click="input.click()"
      >Select some files
      <i class="material-icons right">eject</i>
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  
  const updateStore = (newTracks: Tracks) => {
    store.commit('refreshTrackList', newTracks);
    store.commit('refreshTrackListInfo');
    console.log(store.getters.trackListInfo);
  };
  
  const input = ref<HTMLInputElement | null>();
  const fileSelect = ref<HTMLButtonElement | null>();
  
  const handleFileUpload = async ($event: Event): Promise<void> => {
    const target = $event.target as HTMLInputElement;
    if (target && target.files) {
      updateStore(target.files);
    }
  }
</script>

<style>

</style>