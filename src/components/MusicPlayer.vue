<template>
  <div class="main card-panel">
    <canvas id="visualizer" ref="canvas">

    </canvas>

    <div class="duration-info">
      <p class="deep-purple-text">{{ currTime + ' \/ ' + duration }}</p>

      <div class="marquee">
        <p class="wave">{{ trackName || 'Selected to play...' }}</p>
      </div>
    </div>

    <button class="btn waves-effect waves-light" @click="changeTrack(-1)">
      <i class="material-icons">skip_previous</i>
    </button>
    <button class="btn waves-effect waves-light" v-show="isPlaying" @click="pause">Pause
      <i class="material-icons right">pause</i>
    </button>
    <button class="btn waves-effect waves-light" v-show="!isPlaying" @click="play">Play
      <i class="material-icons right">play_arrow</i>
    </button>
    <button class="btn waves-effect waves-light" @click="changeTrack(1)">
      <i class="material-icons">skip_next</i>
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();

  const canvas = ref(null);
  var audio = new AudioContext();
  const getPlayer = () => {
    return store.getters.player;
  };

  const getTrack = (index: number): File => {
    return store.getters.track(index);
  };

  const getTrackListLength = (): number => {
    return store.getters.trackListLength;
  };

  const getCurrTrack = (): number => {
    return store.getters.currentTrack;
  };

  const updateCurrTrack = (newCurrTrack: number): void => {
    store.commit('refreshCurrentTrack', newCurrTrack);
  }

  const player = new Audio();
  store.commit('refreshPlayer', player);

  const currTime = ref(0);
  const duration = ref(0);
  const currTrack = ref(0);
  const isPlaying = ref(false);
  const trackName = ref('');

  player.addEventListener('timeupdate', () => {
    currTime.value = Math.round(player.currentTime);
    if (player.currentTime === player.duration) {
      const track = getTrack(currTrack.value + 1);
      updateCurrTrack(!!track ?
        currTrack.value + 1 :
        0);
    }
  });

  const pause = () => !!player.src && (isPlaying.value = !isPlaying.value, player.pause());
  const play = () => !!player.src && (isPlaying.value = !isPlaying.value, player.play());

  const playNewTrack = async (index: number) => {
    const track = getTrack(index);
    if (!!!track) return;

    trackName.value = track.name;

    if (!!player.src) {
      player.pause();
      player.src = '';
      isPlaying.value = false;
    }

    player.src = URL.createObjectURL(track);
    try {
      await player.play();
      audio.resume();
      isPlaying.value = true;
      duration.value = Math.round(player.duration) || 0;
    } catch (error) {
      console.log('Failed to play, error: ' + error);
    }

    URL.revokeObjectURL(player.src);
  };

  const changeTrack = (direction: number): void => {
    const trackListLength = getTrackListLength();
    if (trackListLength === 0) return;
    let nextTrack = currTrack.value + direction;
    nextTrack = nextTrack > trackListLength ?
      0 :
      nextTrack < 0 ?
      trackListLength - 1 :
      nextTrack;

    updateCurrTrack(nextTrack);
  };

  store.subscribe((mutation, state) => {
    if (mutation.type === 'refreshTrackList') {
      updateCurrTrack(0);
    }

    if (mutation.type === 'refreshCurrentTrack') {
      currTrack.value = getCurrTrack();
      playNewTrack(currTrack.value);
    }
  });

  onMounted(() => {
    if (window.AudioContext || window.webkitAudioContext) {

      const source = audio.createMediaElementSource(getPlayer());
      const analyser = audio.createAnalyser();

      const ctx = canvas.value.getContext('2d');
      const pxlBetweenBars = 2;

      source.connect(analyser);
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
    } else alert('Your browser does not support Web Audio');
  });
</script>

<style>
  .main {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
  }

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


  .duration-info {
    width: 420px;
    break-after: always;
  }

  .marquee {
    overflow: hidden;
    background-color: teal;
    color: whitesmoke;
    margin: .75rem auto;
    padding: .3rem;
  }

  .wave {
    display: inline-block;
    z-index: 0;
    font-size: 1.1rem;
    animation: marquee 10s linear infinite;
  }

  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }

    100% {
      transform: translateX(-100%);
    }
  }

  .btn {
    display: block;
  }
</style>