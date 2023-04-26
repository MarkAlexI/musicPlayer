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
  import { vibrate } from '../utils/vibrate';
  import { useStore } from 'vuex';

  const store = useStore();

  const updateShowEqualizer = (): void => {
    vibrate();
    store.commit('refreshShowEqualizer');
  };
</script>

<style>

</style>