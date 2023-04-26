<template>
  <div ref="dropbox" class="row card-panel">
    <div class="col s5">
      <input ref="input" @change="handleFileUpload($event)" type="file" multiple accept="audio/*" style="display: none;">
      <button class="btn waves-effect waves-light" ref="fileSelect" type="button" @click="input.click()">Files
        <i class="material-icons right">eject</i>
      </button>
    </div>
    
    <ShowEqualizer />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import ShowEqualizer from '@/ShowEqualizer.vue';
  import { vibrate } from '../utils/vibrate';
  
  const dropbox = ref(null);
  
  const stopEvent = (event: DragEvent): void => {
    event.stopPropagation();
    event.preventDefault();
  };
  
  const dragenter = (event: DragEvent): void => {
    stopEvent(event);
  }
  
  const dragover = (event: DragEvent): void => {
    stopEvent(event);
  }
  
  function drop(event: DragEvent): void {
    stopEvent(event);
  
    const dt = event.dataTransfer;
    const files = dt.files;
  
    updateStore(files);
  }

  const store = useStore();

  const updateStore = (newTracks: Tracks): void => {
    vibrate([300]);
    store.commit('refreshTrackList', newTracks);
    store.commit('refreshTrackListInfo');
    console.log(store.getters.trackListInfo);
  };

  const input = ref < HTMLInputElement | null > ();
  const fileSelect = ref < HTMLButtonElement | null > ();

  const handleFileUpload = async ($event: Event): Promise < void > => {
    const target = $event.target as HTMLInputElement;
    if (target && target.files) {
      updateStore(target.files);
    }
  }
  
  onMounted(() => {
    dropbox.value.addEventListener("dragenter", dragenter, false);
    dropbox.value.addEventListener("dragover", dragover, false);
    dropbox.value.addEventListener("drop", drop, false);
  });
</script>

<style>
  .flex {
    display: flex;
  }
</style>