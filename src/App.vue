<template>
  <div id="app">
    <button @click="roll">Roll</button>
    <v-dice v-for="index in [0, 1, 2, 3, 4]" :value="dice[index]" :key="index" />
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
    dice: [
      { pips: 1, locked: false },
      { pips: 1, locked: false },
      { pips: 1, locked: false },
      { pips: 1, locked: false },
      { pips: 1, locked: false }
    ]
  }),
  methods: {
    roll: function() {
      for (let index = 0; index < this.dice.length; ++index) {
        if (!this.dice[index].locked) {
          this.dice[index].pips = Math.floor(Math.random() * 6) + 1;
        }
      }
    }
  }
};
</script>
<style lang="scss"></style>
