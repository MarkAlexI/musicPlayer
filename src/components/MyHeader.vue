<template>
  <h1>{{ h1Text }}</h1>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  
  const h1Text = ref('Choose tracks');
  const store = useStore();
  
  store.subscribe((mutation, state) => {
    if (mutation.type === 'refreshTrackList') {
      h1Text.value = 'Enjoy music!';
    }
  });
</script>

<style>
  h1 {
    font-size: 1.75rem;
    color: rebeccapurple;
    margin-bottom: 1.875rem;
    text-align: center;
  }
</style>