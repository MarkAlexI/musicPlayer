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
              @input="updateVolume(volumeLevel)"
            />
            <output>
              {{ volumeLevel }}&nbsp;&nbsp;&nbsp;&nbsp;
            </output>
          </div>
          
          <div class="controls">
            <label>Balance</label>
            <input
              type="range"
              step="0.1"
              min="-1"
              max="1"
              v-model="balance"
              @change="updateBalance(balance)"
            />
            <output>
              {{ balance }}&nbsp;&nbsp;&nbsp;&nbsp;
            </output>
          </div>
          
          <div v-for="(item, index) in [60, 170, 350, 1000, 3500, 10000]" :key="index" class="controls">
            <label>{{ item }}Hz</label>
            <input
              type="range"
              step="1"
              min="-30"
              max="30"
              v-model="gains[index]"
              @input="updateGains(index)"
            />
            <output>
              {{ gains[index] }} dB
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
  import { vibrate } from '../utils/vibrate';

  const hidden = ref(false);
  const volumeLevel = ref(10);
  const balance = ref(0);
  
  const gains = ref(['0', '0', '0', '0', '0', '0']);
  const store = useStore();

  const getShowEqualizer = () => {
    return store.getters.showEqualizer;
  };
  
  const updateVolume = (newVolumeLevel: string): void => {
    vibrate();
    store.commit('refreshVolume', parseFloat(newVolumeLevel));
  }
  
  const updateBalance = (newBalance: string): void => {
    vibrate();
    store.commit('refreshBalance', parseFloat(newBalance));
  };
  
  const updateGains = (index: number): void => {
    vibrate();
    store.commit('refreshGain', { 'newValue': parseFloat(gains.value[index]), 'index': index });
  };

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