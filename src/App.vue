<template>
  <div id="app">
    <div v-show="!isGameOver">
      <button class="is-fancy" :disabled="!canRoll" @click="roll">Roll</button>
      <br />
      <v-dice
        v-for="index in [0, 1, 2, 3, 4]"
        v-model="dice[index]"
        :disabled="!canLock"
        :key="index"
      />
      <v-scorecard v-model="scorecard" :dice="dice" :readonly="!canLock" @score="nextRound" />
    </div>
    <div v-show="isGameOver">
      <button class="is-fancy" @click="resetGame">Play Again</button>
      <v-scorecard v-model="scorecard" />
    </div>
  </div>
</template>
<script>
import { VDice, VScorecard } from "./components";

export default {
  name: "App",
  components: {
    VDice,
    VScorecard
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
    scorecard: {
      name: null,
      ones: null,
      twos: null,
      threes: null,
      fours: null,
      fives: null,
      sixes: null,
      threeOfAKind: null,
      fourOfAKind: null,
      fullHouse: null,
      smallStraight: null,
      largeStraight: null,
      fiveOfAKind: null,
      chance: null
    }
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
    nextRound: function() {
      this.resetRound();
      ++this.round;
    },
    resetGame: function() {
      this.resetRound();
      this.round = 1;
      this.scorecard = {
        name: null,
        ones: null,
        twos: null,
        threes: null,
        fours: null,
        fives: null,
        sixes: null,
        threeOfAKind: null,
        fourOfAKind: null,
        fullHouse: null,
        smallStraight: null,
        largeStraight: null,
        fiveOfAKind: null,
        chance: null
      };
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
    }
  }
};
</script>
<style lang="scss">
@import "~normalize.css";
#app {
  font-family: "MinecraftiaRegular";
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 30px;
}

body {
  background-color: #008148;
  background-image: url("./assets/images/background.svg");
}

button {
  display: inline-block;
  border: none;
  background: transparent;
  margin: 0;
  text-decoration: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: default;
  }

  &.is-fancy {
    height: 64px;
    width: 128px;
    color: white;
    background-image: url("./assets/images/button.png");
    background-size: 200% 300%;

    &:focus {
      background-position: 0 -100%;

      &:active {
        background-position: -100% -100%;
      }
    }

    &:active {
      background-position: -100% 0;
    }

    &:disabled {
      background-position: 0 -200%;
      color: white;
    }
  }
}
</style>
