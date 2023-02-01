<template>
  <canvas id="visualizer" ref="canvas">

  </canvas>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  const masterGain = ref(null);

  const store = useStore();
  const changeMasterGain = (value: number) => {
    masterGain.value.gain.value = value / 10;
  };

  const canvas = ref(null);
  const audio = new AudioContext();
  
  const getPlayer = () => {
    return store.getters.player;
  };
  
  const getVolume = () => {
    return store.getters.volume;
  };
  
  const player = getPlayer();
  player.addEventListener('play', (event: Event) => {
    audio.resume();
  });

  onMounted(() => {
    if (window.AudioContext || window.webkitAudioContext) {

      const source = audio.createMediaElementSource(player);
      const analyser = audio.createAnalyser();
      masterGain.value = audio.createGain();
      masterGain.value.gain.value = 1;
      const ctx = canvas.value.getContext('2d');
      const pxlBetweenBars = 2;

      source.connect(masterGain.value);
      masterGain.value.connect(analyser);
      analyser.connect(audio.destination);
      
      analyser.fftSize = 128;
      const bufferLength = analyser.frequencyBinCount;
      const trackData = new Uint8Array(bufferLength);

      const width = canvas.value.width;
      const height = canvas.value.height;

      function draw() {
        ctx.clearRect(0, 0, width, height);
        analyser.getByteTimeDomainData(trackData);
        const barWidth = width / bufferLength;
        let barHeight;
        let x = 0;
        let heightScale = height / 128;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = trackData[i];
          ctx.fillStyle = 'rgb(' + ',127,17,' + barHeight + ')';
          barHeight *= heightScale;
          ctx.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);

          x += barWidth + pxlBetweenBars;
        }
        requestAnimationFrame(draw);
      }
      draw();
      
      store.subscribe((mutation, state) => {
        if (mutation.type === 'refreshVolume') {
          changeMasterGain(getVolume());
        }
      });
    } else alert('Your browser does not support Web Audio');
  });
</script>

<style>
  #visualizer {
    animation: colorize 5s infinite;
  }

  @keyframes colorize {
    50% {
      background: lightskyblue;
    }

    50% {
      background: darkcyan;
    }

    50% {
      background: teal;
    }

    50% {
      background: lightskyblue;
    }
  }

  #visualizer {
    width: 100%;
    height: 25% !important;
    border: 1px solid;
    margin-left: auto;
    margin-right: auto;
  }
</style>