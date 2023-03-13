<template>
  <div class="container">
    <PreLoader />
    
    <MyHeader />
    <TracksInput />
    <TrackEqualizer />
    <MusicPlayer />
    <TrackList />
  </div>
</template>

<script setup lang="ts">
  import M from 'materialize-css/dist/js/materialize.min.js';
  import { onMounted } from 'vue';
  import PreLoader from '@/PreLoader';
  import MyHeader from '@/MyHeader';
  import TracksInput from '@/TracksInput';
  import TrackEqualizer from '@/TrackEqualizer.vue';
  import MusicPlayer from '@/MusicPlayer';
  import TrackList from '@/TrackList';
  
  window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('../sw.js')
        .then(registration => {
          console.log('Service worker successfully registered', registration);
        })
        .catch(error => {
          console.log('Service worker registration failed', error);
        });
    }
  });
  
  onMounted(async () => {
    await (M || window.M).AutoInit();
  });
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  
  body {
    background-color: lightcyan;
  }

  .container {
    max-width: 780px;
    padding-top: .3rem;
    margin: 1rem 2 rem;
    
    @media (min-width: 480px) {
      & {
        margin: 0 auto;
      }
    }
  }
</style>
