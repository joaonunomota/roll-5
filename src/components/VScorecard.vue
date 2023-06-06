<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  isArray,
  isDice,
  isScorecard,
  sum,
  sumIf,
  hasFullHouse,
  hasSequence,
  count,
  Scorecard
} from "../utils";
import VRow from "./VRow.vue";
import type { Dice } from "../types";

const props = defineProps({
  modelValue: {
    type: Scorecard,
    required: true,
    validator: (value: Scorecard) => isScorecard(value)
  },
  dice: {
    type: Array<Dice>,
    required: false,
    default: () => [],
    validator: (value: Dice[]) => isArray(value, isDice)
  },
  readonly: {
    type: Boolean,
    required: false,
    default: false,
    validator: (value: boolean) => value !== undefined
  }
});

const emit = defineEmits(["score"]);

const allowExtraPoints = ref(false);

const ones = computed(() => sumIf(props.dice, 1));
const twos = computed(() => sumIf(props.dice, 2));
const threes = computed(() => sumIf(props.dice, 3));
const fours = computed(() => sumIf(props.dice, 4));
const fives = computed(() => sumIf(props.dice, 5));
const sixes = computed(() => sumIf(props.dice, 6));
const threeOfAKind = computed(() => {
  return [1, 2, 3, 4, 5, 6].some((x) => count(props.dice, x) >= 3) ? sum(props.dice) : 0;
});
const fourOfAKind = computed(() => {
  return [1, 2, 3, 4, 5, 6].some((x) => count(props.dice, x) >= 4) ? sum(props.dice) : 0;
});
const fullHouse = computed(() => (hasFullHouse(props.dice) ? 25 : 0));
const smallStraight = computed(() => (hasSequence(props.dice, 4) ? 30 : 0));
const largeStraight = computed(() => (hasSequence(props.dice, 5) ? 40 : 0));
const fiveOfAKind = computed(() =>
  [1, 2, 3, 4, 5, 6].some((x) => count(props.dice, x) >= 5) ? 50 : 0
);
const chance = computed(() => {
  return props.dice.reduce((total, current) => {
    return total + current.pips;
  }, 0);
});

watch(
  props.modelValue,
  (val) => {
    if (allowExtraPoints.value && val.fiveOfAKind === null) {
      allowExtraPoints.value = false;
    }
  },
  { deep: true }
);

const assign = (val: number) => {
  if (props.modelValue.fiveOfAKind !== null) {
    if (!allowExtraPoints.value) {
      allowExtraPoints.value = true;
    } else if (fiveOfAKind.value > 0 && val > 0) {
      props.modelValue.fiveOfAKind += 100;
    }
  }

  emit("score");
};
</script>

<template>
  <table>
    <thead>
      <tr>
        <th scope="col">UPPER SECTION</th>
        <th scope="col">{{ modelValue.name === null ? "Player 1" : modelValue.name }}</th>
      </tr>
    </thead>
    <tbody>
      <v-row
        name="Aces"
        v-model="modelValue.ones"
        :readonly="readonly"
        :option="ones"
        @click="assign"
      />
      <v-row
        name="Twos"
        v-model="modelValue.twos"
        :readonly="readonly"
        :option="twos"
        @click="assign"
      />
      <v-row
        name="Threes"
        v-model="modelValue.threes"
        :readonly="readonly"
        :option="threes"
        @click="assign"
      />
      <v-row
        name="Fours"
        v-model="modelValue.fours"
        :readonly="readonly"
        :option="fours"
        @click="assign"
      />
      <v-row
        name="Fives"
        v-model="modelValue.fives"
        :readonly="readonly"
        :option="fives"
        @click="assign"
      />
      <v-row
        name="Sixes"
        v-model="modelValue.sixes"
        :readonly="readonly"
        :option="sixes"
        @click="assign"
      />
      <tr>
        <th scope="row">Total</th>
        <td>{{ modelValue.upper }}</td>
      </tr>
      <tr>
        <th scope="row">Bonus</th>
        <td>{{ modelValue.bonus }}</td>
      </tr>
      <tr>
        <th scope="col">LOWER SECTION</th>
        <th scope="col">{{ modelValue.name === null ? "Player 1" : modelValue.name }}</th>
      </tr>
      <v-row
        name="3 of a Kind"
        v-model="modelValue.threeOfAKind"
        :readonly="readonly"
        :option="threeOfAKind"
        @click="assign"
      />
      <v-row
        name="4 of a Kind"
        v-model="modelValue.fourOfAKind"
        :readonly="readonly"
        :option="fourOfAKind"
        @click="assign"
      />
      <v-row
        name="Full House"
        v-model="modelValue.fullHouse"
        :readonly="readonly"
        :option="fullHouse"
        @click="assign"
      />
      <v-row
        name="Small Straight"
        v-model="modelValue.smallStraight"
        :readonly="readonly"
        :option="smallStraight"
        @click="assign"
      />
      <v-row
        name="Large Straight"
        v-model="modelValue.largeStraight"
        :readonly="readonly"
        :option="largeStraight"
        @click="assign"
      />
      <v-row
        name="ROLL 5 (5 of a Kind)"
        v-model="modelValue.fiveOfAKind"
        :readonly="readonly"
        :option="fiveOfAKind"
        @click="assign"
      />
      <v-row
        name="Chance"
        v-model="modelValue.chance"
        :readonly="readonly"
        :option="chance"
        @click="assign"
      />
      <tr>
        <th scope="col">TOTALS</th>
        <th scope="col">{{ modelValue.name === null ? "Player 1" : modelValue.name }}</th>
      </tr>
      <tr>
        <th scope="row">Total (Upper Section)</th>
        <td>{{ modelValue.upper + modelValue.bonus }}</td>
      </tr>
      <tr>
        <th scope="row">Total (Lower Section)</th>
        <td>{{ modelValue.lower }}</td>
      </tr>
      <tr>
        <th scope="row">Grand Total</th>
        <td>{{ modelValue.total }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
table {
  margin: 30px;
  margin-left: auto;
  margin-right: auto;
  background: #4cb963;
  border: 1px solid #034732;
  box-shadow: 0 0 0 2px #4cb963;
  border: collapse;
  border-spacing: 0;

  tr,
  th,
  td {
    border: 1px solid #034732;
    padding: 8px 10px;
  }

  th {
    text-align: initial;
  }
}
</style>
