<template>
  <div id="app">
    <router-link to="/"></router-link>
    <router-view />
  </div>
</template>

<style lang="scss">
  * {
    padding: 0;
    margin: 0;
  }
  html, body {
    height: 100%;
    overflow: hidden;
    user-select: none;
  }
</style>
<script>
  import Login from "./views/Login";
  export default {
    components: {Login}
  }
</script>