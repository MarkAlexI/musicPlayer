<template>
  <div class="card-panel">
    <ul class="collection">
      <li
        href="#!"
        v-for="track in trackList"
        :key="track.name"
        class="collection-item"
        @click="log(track.index)"
        >
        {{ track.name }}
      </li>
    </ul>
  </div>
  
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  
  const trackList = ref(null);
  
  const log = (i: number) => {
    console.log(i);
  };
  
  store.subscribe((mutation, state) => {
    if (mutation.type === 'refreshTrackListInfo') {
      trackList.value = store.getters.trackListInfo;
    }
  });
  
</script>

<style>
  
</style>