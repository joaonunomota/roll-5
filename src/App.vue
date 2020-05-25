<template>
  <div id="app">
    <div v-show="!isGameOver">
      <button :disabled="!canRoll" @click="roll">Roll</button>
      <button :disabled="!canScore" @click="score">Score</button>
      <p>Round: {{ round }} / 13</p>
      <p>Rolls Left: {{ rolls }}</p>
      <p>Score: {{ scorecard }}</p>
      <v-dice
        v-for="index in [0, 1, 2, 3, 4]"
        v-model="dice[index]"
        :disabled="!canLock"
        :key="index"
      />
    </div>
    <div v-show="isGameOver">
      <button @click="resetGame">Play Again</button>
      <p>Score: {{ scorecard }}</p>
    </div>
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
    ],
    rolls: 3,
    round: 1,
    scorecard: 0
  }),
  computed: {
    canLock: function() {
      return this.rolls < 3;
    },
    canRoll: function() {
      return (
        this.dice.some(d => !d.locked) && this.rolls > 0 && !this.isGameOver
      );
    },
    canScore: function() {
      return this.rolls < 3 && !this.isGameOver;
    },
    isGameOver() {
      return this.round > 13;
    }
  },
  methods: {
    resetGame: function() {
      this.resetRound();
      this.round = 1;
      this.scorecard = 0;
    },
    resetRound: function() {
      this.rolls = 3;
      this.dice = this.dice.map(item => {
        item.locked = false;
        return item;
      });
    },
    roll: function() {
      --this.rolls;
      for (let index = 0; index < this.dice.length; ++index) {
        if (!this.dice[index].locked) {
          this.dice[index].pips = Math.floor(Math.random() * 6) + 1;
        }
      }
    },
    score: function() {
      this.resetRound();
      ++this.round;
      this.scorecard = this.dice.reduce((total, current) => {
        return total + current.pips;
      }, this.scorecard);
    }
  }
};
</script>
<style lang="scss"></style>
