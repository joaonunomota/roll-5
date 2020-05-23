<template>
  <div id="app">
    <v-dice :value="1" />
  </div>
</template>
<script>
import { VDice } from "./components";
export default {
  name: "App",
  components: {
    VDice
  }
};
</script>
<style lang="scss"></style>
