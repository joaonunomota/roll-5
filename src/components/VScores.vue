<script setup lang="ts">
import { computed, ref } from "vue";
import { VTable } from "../components";
import { type Score } from "../types";
import { high, low, scores, setScore } from "../utils";

const props = defineProps({
  score: {
    type: Number,
    required: true
  }
});

const highscores = ref<Score[]>(scores(high));
const lowscores = ref<Score[]>(scores(low));
const name = ref("");
const submitted = ref(false);

const isHighscore = computed(() => {
  return highscores.value.length < 5 || highscores.value.some((h) => h.score < props.score);
});
const isLowscore = computed(() => {
  return lowscores.value.length < 5 || lowscores.value.some((l) => l.score > props.score);
});

const submit = () => {
  const score = { name: name.value, score: props.score };
  submitted.value = true;

  if (isHighscore.value) {
    setScore(high, score);
    highscores.value = scores(high);
  }

  if (isLowscore.value) {
    setScore(low, score);
    lowscores.value = scores(low);
  }

  refresh();
};
const refresh = () => {
  highscores.value = scores(high);
  lowscores.value = scores(low);
};
const emit = defineEmits(["reset"]);
const resetGame = () => {
  emit("reset");
};
</script>

<template>
  <div>
    <div v-show="!submitted && (isHighscore || isLowscore)">
      <label class="is-hidden" for="name">Name</label>
      <input id="name" v-model="name" type="text" />
      <button class="is-fancy" :disabled="!name" @click="submit">Submit</button>
    </div>
    <button class="is-fancy" @click="resetGame">Play Again</button>
    <v-table v-if="highscores.length > 0" :rows="highscores" title="Highscores" />
    <v-table v-if="lowscores.length > 0" :rows="lowscores" title="Lowscores" />
  </div>
</template>

<style lang="scss" scoped>
.is-hidden {
  display: none;
}
</style>
