<template>
  <div :class="{ 'card-panel': true, 'hidden': !hidden }">
    <div>
      <div class="">
        <form action="#">
          <div class="controls">
            <label>Master volume</label>
            <input
              type="range"
              step="0.1"
              min="0"
              max="10"
              v-model="volumeLevel"
              @change="updateVolume(volumeLevel)"
            />
            <output>
              {{ volumeLevel }}&nbsp;&nbsp;&nbsp;&nbsp;
            </output>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useStore } from 'vuex';

  const hidden = ref(false);
  const volumeLevel = ref(10);
  
  const store = useStore();

  const getShowEqualizer = () => {
    return store.getters.showEqualizer;
  };
  
  const updateVolume = (newVolumeLevel: string): void => {
    store.commit('refreshVolume', parseFloat(newVolumeLevel));
  }

  store.subscribe((mutation, state) => {
    if (mutation.type === 'refreshShowEqualizer') {
      hidden.value = getShowEqualizer();
    }
  });
</script>

<style>
  .hidden {
    display: none;
  }

  div.controls label {
    display: inline-block;
    text-align: center;
    width: 10%;
  }

  div.controls label,
  div.controls input,
  output {
    width: 90%;
    vertical-align: middle;
    padding: 0;
    margin: 0;
    font-family: "Open Sans", Verdana, Geneva, sans-serif, sans-serif;
    font-size: .75rem;
  }
</style>