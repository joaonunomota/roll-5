<template>
  <main id="app">
    <div v-if="isGameOver">
      <div v-show="!submitted && (isHighscore || isLowscore)">
        <input type="text" v-model="scorecard.name" />
        <button class="is-fancy" :disabled="!scorecard.name" @click="submit">Submit</button>
      </div>
      <button class="is-fancy" @click="resetGame">Play Again</button>
      <v-table v-model="highscores" title="Highscores" />
      <v-table v-model="lowscores" title="Lowscores" />
    </div>
    <div v-else>
      <button class="is-fancy" :disabled="!canRoll" @click="roll">Roll</button>
      <p>Rolls: {{ rolls }}</p>
      <v-dice
        v-for="index in [0, 1, 2, 3, 4]"
        v-model="dice[index]"
        :disabled="!canLock"
        :key="index"
      />
      <v-scorecard v-model="scorecard" :dice="dice" :readonly="!canLock" @score="nextRound" />
    </div>
  </main>
</template>
<script>
import { VDice, VScorecard, VTable } from "./components";
import { high, low, scores, setScore, Scorecard } from "./utils";

export default {
  name: "App",
  components: {
    VDice,
    VScorecard,
    VTable
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
    scorecard: new Scorecard(),
    high: high,
    low: low,
    highscores: [],
    lowscores: [],
    submitted: false
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
    },
    isHighscore: function() {
      return (
        this.highscores.length < 5 ||
        !this.highscores.every(h => h.score >= this.scorecard.grandTotal)
      );
    },
    isLowscore: function() {
      return (
        this.lowscores.length < 5 ||
        !this.lowscores.every(l => l.score <= this.scorecard.grandTotal)
      );
    }
  },
  created: function() {
    this.refresh();
  },
  methods: {
    submit: function() {
      const result = {
        name: this.scorecard.name,
        score: this.scorecard.grandTotal
      };

      this.submitted = true;

      if (this.isHighscore) {
        setScore(high, result);
      }

      if (this.isLowscore) {
        setScore(low, result);
      }

      this.refresh();
    },
    refresh: function() {
      this.highscores = scores(high);
      this.lowscores = scores(low);
    },
    nextRound: function() {
      this.resetRound();
      ++this.round;
    },
    resetGame: function() {
      this.resetRound();
      this.round = 1;
      this.scorecard = new Scorecard();
      this.submitted = false;
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

input[type="image"] {
  &:focus {
    outline: none;
  }
}

input[type="text"] {
  box-shadow: 0 0 0 2px #034732, 0 0 0 4px #4cb963;
  border: none;
  background-color: #4cb963;
  text-align: center;
}

p {
  color: white;
}

button {
  display: block;
  border: none;
  background: transparent;
  margin: auto;
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
