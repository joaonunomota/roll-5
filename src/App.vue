<template>
  <div id="app">
    <button @click="roll">Roll</button>
    <v-dice :value="dice" />
  </div>
</template>
<script>
import { VDice } from "./components";

export default {
  name: "App",
  components: {
    VDice
  },
  data: () => ({
    dice: { pips: 1, locked: false }
  }),
  methods: {
    roll: function() {
      if (!this.dice.locked) {
        this.dice.pips = Math.floor(Math.random() * 6) + 1;
      }
    }
  }
};
</script>
<style lang="scss"></style>
