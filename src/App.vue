<template>
  <div class="container">
    <MyHeader />
    <TracksInput />
    <MusicPlayer />
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import M from 'materialize-css';
  import MyHeader from '@/MyHeader';
  import TracksInput from '@/TracksInput';
  import MusicPlayer from '@/MusicPlayer';
 
  onMounted(async () => await M.AutoInit());
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
    max-width: 1024px;
    padding-top: 1rem;
    margin: 10px 20px;
    background-color: dodgerblue;
    min-height: 250px;
    
    @media (min-width: 1024px) {
      & {
        margin: 0 auto;
      }
    }
  }
</style>
