<template>
  <div class="switch col s7">
    <label>
      Hide
      <input
        type="checkbox"
        @input="updateShowEqualizer"
      >
      <span class="lever"></span>
      Show
    </label>
    <i
      class="material-icons right"
    >equalizer</i>
  </div>
</template>

<script setup lang="ts">
  import { useStore } from 'vuex';

  const store = useStore();

  const getShowEqualizer = (): boolean => {
    return store.getters.showEqualizer;
  };

  const updateShowEqualizer = (): void => {
    store.commit('refreshShowEqualizer');
  }
</script>

<style>

</style>