<template>
  <div :class="[toggleAnimation ? 'endAnimation' : '', color]" class="light">
    <div class="timer">{{ currentTime }}</div>
  </div>
</template>

<script>
export default {
  props: ["color", "ptime"],
  data() {
    return {
      currentTime: 4,
      timer: null,
      toggleAnimation: false,
    };
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.currentTime--;
        this.setLocalStorage();
      }, 1000);
    },
    stopTimer() {
      clearTimeout(this.timer);
    },
    setLocalStorage() {
      if (this.$route.path !== "/" && this.currentTime >= 0) {
        localStorage.setItem("time", this.currentTime);
        localStorage.setItem("path", this.$route.path);
      }
      else{
        localStorage.clear()
      }
    },
  },
  watch: {
    currentTime(time) {
      if (time === 0) {
        this.toggleAnimation = false;
        this.stopTimer();
        this.currentTime = this.ptime;
        this.startTimer();
      }
      if (time < 3 && time !== 0) {
        this.toggleAnimation = true;
      }
    },
  },
  mounted() {
    this.currentTime = this.ptime;
    this.startTimer();
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

.light {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  width: 200px;
  height: 200px;
  position: absolute;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.green {
  background-color: rgb(44, 230, 44);
}

.yellow {
  background-color: yellow;
  margin-top: 220px;
}

.red {
  background-color: red;
  margin-top: 440px;
}

.timer {
  position: absolute;
  text-align: center;
  font-size: 130px;
  opacity: 0.6;
}

@keyframes end-animation {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.endAnimation {
  animation: end-animation 0.7s infinite;
}
</style>
