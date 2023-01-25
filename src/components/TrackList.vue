<template>
  <div class="card-panel">
    <div class="collection">
      <a
        href="#!"
        v-for="track in trackList"
        :key="track.name"
        :class="{ 'active': getCurrTrack() === track.index, 'collection-item': true }"
        @click="updateCurrTrack(track.index)"
        >
        {{ track.name }}
      </a>
    </div>
  </div>
  
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  
  const trackList = ref(null);
  
  const getCurrTrack = (): number => {
    return store.getters.currentTrack;
  };
  
  const updateCurrTrack = (newCurrTrack: number): void => {
    store.commit('refreshCurrentTrack', newCurrTrack);
    
  }
  
  store.subscribe((mutation, state) => {
    if (mutation.type === 'refreshTrackListInfo') {
      trackList.value = store.getters.trackListInfo;
    }
  });
  
</script>

<style>
  
</style>