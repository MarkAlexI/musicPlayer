<template>
  <h1>Choose tracks.</h1>
  <button @click="updateStore">Press</button>
</template>

<script setup lang="ts">
  import { useStore } from 'vuex';

  const store = useStore();
  const updateStore = () => {
    store.commit('refresh', "@#$");

    console.log(store.state.string);
    console.log(store.getters.stringLength);
  };
</script>

<style>
  h1 {
    font-size: 1.75rem;
    color: rebeccapurple;
    margin-bottom: 1.875rem;
    text-align: center;
  }
</style>