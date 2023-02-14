<template>
  <div v-if="showPreloader" class="preloader_mai">
    <div>
      <pre>
Created
by
MarkAlexI
      </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  const showPreloader = ref(true);
  
  onMounted(() => {
    setTimeout(() => {
      showPreloader.value = false;
    }, 4000);
  });
</script>

<style>
  .preloader_mai {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: whitesmoke;
    z-index: 99;
  }
  
  .preloader_mai div {
    background: #fff;
    width: 15rem;
    height: 10rem;
    line-height: 2.5rem;
    border-radius: .5rem;
    font-family: arial;
    font-size: 2rem;
    font-weight: bolder;
    text-align: center;
    box-shadow: 0 .4rem 1rem rgba(0, 128, 128, 0.6);
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 1.3rem;
  }
  
  pre {
    background: linear-gradient(lightblue, blue);
    background: -webkit-linear-gradient(lightblue, blue);
    background-clip: text;
    -webkit-background-clip: text;
    text-fill-color: transparent;
    -webkit-text-fill-color: transparent;
  }
</style>