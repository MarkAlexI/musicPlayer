<template>
  <div :class="{ 'card-panel': true, 'hidden': !hidden }">
    <div>
      <div class="">
        <form action="#">
          <p class="range-field">
            <input
              class="range"
              type="range"
              min="-50"
              max="50"
              value="0"
            />
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useStore } from 'vuex';

  const hidden = ref(false);
  const store = useStore();
  
  const getShowEqualizer = () => {
    return store.getters.showEqualizer;
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
</style>