<script setup lang="ts">
import { computed, ref } from "vue";
import { VDice, VScorecard, VTable } from "./components";
import { type Dice, type Score } from "./types";
import { high, low, scores, setScore, Scorecard } from "./utils";

const dice = ref<Dice[]>([
  { pips: 1, locked: false },
  { pips: 1, locked: false },
  { pips: 1, locked: false },
  { pips: 1, locked: false },
  { pips: 1, locked: false }
]);
const rolls = ref(3);
const round = ref(1);
const scorecard = ref(new Scorecard());
const highscores = ref<Score[]>([]);
const lowscores = ref<Score[]>([]);
const submitted = ref(false);

const canLock = computed(() => rolls.value < 3);
const canRoll = computed(() => {
  return dice.value.some((d) => !d.locked) && rolls.value > 0 && !isGameOver.value;
});
const isGameOver = computed(() => round.value > 13);
const isHighscore = computed(() => {
  return (
    highscores.value.length < 5 || !highscores.value.every((h) => h.score >= scorecard.value.total)
  );
});
const isLowscore = computed(() => {
  return (
    lowscores.value.length < 5 || !lowscores.value.every((l) => l.score <= scorecard.value.total)
  );
});
const submit = () => {
  const result: Score = {
    name: scorecard.value.name!,
    score: scorecard.value.total
  };

  submitted.value = true;

  if (isHighscore.value) {
    setScore(high, result);
  }

  if (isLowscore.value) {
    setScore(low, result);
  }

  refresh();
};
const refresh = () => {
  highscores.value = scores(high);
  lowscores.value = scores(low);
};
const score = (value: Scorecard) => {
  scorecard.value = value;
  nextRound();
};
const nextRound = () => {
  resetRound();
  round.value += 1;
};
const resetGame = () => {
  resetRound();
  round.value = 1;
  scorecard.value = new Scorecard();
  submitted.value = false;
};
const resetRound = () => {
  rolls.value = 3;
  dice.value = dice.value.map((item) => {
    item.locked = false;
    return item;
  });
};
const roll = () => {
  rolls.value -= 1;
  for (let index = 0; index < dice.value.length; index++) {
    if (!dice.value[index].locked) {
      dice.value[index].pips = Math.floor(Math.random() * 6) + 1;
    }
  }
};
</script>

<template>
  <main id="app">
    <div v-if="isGameOver">
      <div v-show="!submitted && (isHighscore || isLowscore)">
        <input type="text" v-model="scorecard.name" />
        <button class="is-fancy" :disabled="!scorecard.name" @click="submit">Submit</button>
      </div>
      <button class="is-fancy" @click="resetGame">Play Again</button>
      <v-table :rows="highscores" title="Highscores" />
      <v-table :rows="lowscores" title="Lowscores" />
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
      <v-scorecard :value="scorecard" :dice="dice" :readonly="!canLock" @score="score" />
    </div>
  </main>
</template>

<style lang="scss">
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
