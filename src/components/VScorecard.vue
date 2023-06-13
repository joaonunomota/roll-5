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
import type { Dice, MutableScorecard } from "../types";

const props = defineProps({
  value: {
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
  props.value,
  (val) => {
    if (allowExtraPoints.value && val.fiveOfAKind === null) {
      allowExtraPoints.value = false;
    }
  },
  { deep: true }
);

const update = (property: keyof MutableScorecard, val: number) => {
  let scorecard = Object.assign(new Scorecard(), props.value);

  scorecard[property] = val;

  if (scorecard.fiveOfAKind !== null) {
    if (!allowExtraPoints.value) {
      allowExtraPoints.value = true;
    } else if (fiveOfAKind.value > 0 && val > 0) {
      scorecard.fiveOfAKind += 100;
    }
  }

  emit("score", scorecard);
};
</script>

<template>
  <table>
    <thead>
      <tr>
        <th scope="col">UPPER SECTION</th>
        <th scope="col">{{ value.name === null ? "Player 1" : value.name }}</th>
      </tr>
    </thead>
    <tbody>
      <v-row
        name="Aces"
        :value="value.ones"
        :readonly="readonly"
        :option="ones"
        @update="update('ones', $event)"
      />
      <v-row
        name="Twos"
        :value="value.twos"
        :readonly="readonly"
        :option="twos"
        @update="update('twos', $event)"
      />
      <v-row
        name="Threes"
        :value="value.threes"
        :readonly="readonly"
        :option="threes"
        @update="update('threes', $event)"
      />
      <v-row
        name="Fours"
        :value="value.fours"
        :readonly="readonly"
        :option="fours"
        @update="update('fours', $event)"
      />
      <v-row
        name="Fives"
        :value="value.fives"
        :readonly="readonly"
        :option="fives"
        @update="update('fives', $event)"
      />
      <v-row
        name="Sixes"
        :value="value.sixes"
        :readonly="readonly"
        :option="sixes"
        @update="update('sixes', $event)"
      />
      <tr>
        <th scope="row">Total</th>
        <td>{{ value.upper }}</td>
      </tr>
      <tr>
        <th scope="row">Bonus</th>
        <td>{{ value.bonus }}</td>
      </tr>
      <tr>
        <th scope="col">LOWER SECTION</th>
        <th scope="col">{{ value.name === null ? "Player 1" : value.name }}</th>
      </tr>
      <v-row
        name="3 of a Kind"
        :value="value.threeOfAKind"
        :readonly="readonly"
        :option="threeOfAKind"
        @update="update('threeOfAKind', $event)"
      />
      <v-row
        name="4 of a Kind"
        :value="value.fourOfAKind"
        :readonly="readonly"
        :option="fourOfAKind"
        @update="update('fourOfAKind', $event)"
      />
      <v-row
        name="Full House"
        :value="value.fullHouse"
        :readonly="readonly"
        :option="fullHouse"
        @update="update('fullHouse', $event)"
      />
      <v-row
        name="Small Straight"
        :value="value.smallStraight"
        :readonly="readonly"
        :option="smallStraight"
        @update="update('smallStraight', $event)"
      />
      <v-row
        name="Large Straight"
        :value="value.largeStraight"
        :readonly="readonly"
        :option="largeStraight"
        @update="update('largeStraight', $event)"
      />
      <v-row
        name="ROLL 5 (5 of a Kind)"
        :value="value.fiveOfAKind"
        :readonly="readonly"
        :option="fiveOfAKind"
        @update="update('fiveOfAKind', $event)"
      />
      <v-row
        name="Chance"
        :value="value.chance"
        :readonly="readonly"
        :option="chance"
        @update="update('chance', $event)"
      />
      <tr>
        <th scope="col">TOTALS</th>
        <th scope="col">{{ value.name === null ? "Player 1" : value.name }}</th>
      </tr>
      <tr>
        <th scope="row">Total (Upper Section)</th>
        <td>{{ value.upper + value.bonus }}</td>
      </tr>
      <tr>
        <th scope="row">Total (Lower Section)</th>
        <td>{{ value.lower }}</td>
      </tr>
      <tr>
        <th scope="row">Grand Total</th>
        <td>{{ value.total }}</td>
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
