<template>
  <div id="app">
    <div id="wrapper">
      <div class="green-deactivated light-deactivated"></div>
      <div class="yellow-deactivated light-deactivated"></div>
      <div class="red-deactivated light-deactivated"></div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import light from "./components/light.vue";

export default {
  name: "app",
  data() {
    return {
      isPrevGreen: true,
      oldTime: null,
      oldPath: null,
    };
  },

  methods: {
    init() {
      let routeProps = this.$route.matched[0].props.default;

      if (this.$route.path === "/green") {
        this.setLight({ path: "/yellow" }, true, routeProps);
      }

      if (this.$route.path === "/yellow") {
        if (this.isPrevGreen) {
          this.setLight({ path: "/red" }, true, routeProps);
        } else {
          this.setLight({ path: "/green" }, true, routeProps);
        }
      }

      if (this.$route.path === "/red") {
        this.setLight({ path: "/yellow" }, false, routeProps);
      }
    },

    setInitRouterProps() {
      if (localStorage.getItem("time") && localStorage.getItem("path")) {
        try {
          this.$router.push({ path: localStorage.getItem("path") })
          this.oldTime = this.$route.matched[0].props.default.ptime;
          this.oldPath = this.$route.path;
          this.$route.matched[0].props.default.ptime = localStorage.getItem("time");
        } catch (e) {
          console.log("err local");
        }
      }
    },

    resetTime() {
      if (this.oldTime && this.$route.path === this.oldPath) {
        this.$route.matched[0].props.default.ptime = this.oldTime;
      }
    },

    setLight(path, prevGreen, routeProps) {
      setTimeout(() => {
        this.isPrevGreen = prevGreen;
        this.resetTime();
        this.$router.push(path);
        this.init();
      }, routeProps.ptime * 1000);
    },
  },

  created() {
    if (this.$route.path === '/' && !localStorage.getItem("time") && !localStorage.getItem("path")){
      this.$router.push({ path: "/green" });
    }
    this.setInitRouterProps();
    this.init();
  },

  components: {
    light,
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
}

#wrapper {
  width: 200px;
  height: 650px;
  border: 1px solid black;
  padding: 20px 50px 10px 50px;
  background-color: #292f33;
  border-radius: 10px;
}

.light-deactivated {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  width: 200px;
  height: 200px;
  position: absolute;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
}

.green-deactivated {
  background-color: #77b255;
}

.yellow-deactivated {
  background-color: #ffcc4d;
  margin-top: 220px;
}

.red-deactivated {
  background-color: #dd2e44;
  margin-top: 440px;
}
</style>
