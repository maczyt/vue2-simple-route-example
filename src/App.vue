<template>
  <div id="app">
    <img src="./assets/logo.png">
    <ol>
      <li>
        <router-link to="/test1">test1</router-link>
      </li>
      <li>
        <router-link to="/test2">test2</router-link>
      </li>
    </ol>
    <router-view></router-view>
  </div>
</template>

<script>
import warning from "warning";
export default {
  name: "App",
  created() {
    // console.log("App", this);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
