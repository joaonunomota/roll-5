<template>
  <table>
    <thead>
      <tr>
        <th scope="col">UPPER SECTION</th>
        <th scope="col">{{ value.name === null ? "Player 1" : value.name }}</th>
      </tr>
    </thead>
    <tbody>
      <v-row v-model="value.ones" name="Aces" :readonly="readonly" :option="ones" @input="assign" />
      <v-row v-model="value.twos" name="Twos" :readonly="readonly" :option="twos" @input="assign" />
      <v-row
        v-model="value.threes"
        name="Threes"
        :readonly="readonly"
        :option="threes"
        @input="assign"
      />
      <v-row
        v-model="value.fours"
        name="Fours"
        :readonly="readonly"
        :option="fours"
        @input="assign"
      />
      <v-row
        v-model="value.fives"
        name="Fives"
        :readonly="readonly"
        :option="fives"
        @input="assign"
      />
      <v-row
        v-model="value.sixes"
        name="Sixes"
        :readonly="readonly"
        :option="sixes"
        @input="assign"
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
        v-model="value.threeOfAKind"
        name="3 of a Kind"
        :readonly="readonly"
        :option="threeOfAKind"
        @input="assign"
      />
      <v-row
        v-model="value.fourOfAKind"
        name="4 of a Kind"
        :readonly="readonly"
        :option="fourOfAKind"
        @input="assign"
      />
      <v-row
        v-model="value.fullHouse"
        name="Full House"
        :readonly="readonly"
        :option="fullHouse"
        @input="assign"
      />
      <v-row
        v-model="value.smallStraight"
        name="Small Straight"
        :readonly="readonly"
        :option="smallStraight"
        @input="assign"
      />
      <v-row
        v-model="value.largeStraight"
        name="Large Straight"
        :readonly="readonly"
        :option="largeStraight"
        @input="assign"
      />
      <v-row
        v-model="value.fiveOfAKind"
        name="ROLL 5 (5 of a Kind)"
        :readonly="readonly"
        :option="fiveOfAKind"
        @input="assign"
      />
      <v-row
        v-model="value.chance"
        name="Chance"
        :readonly="readonly"
        :option="chance"
        @input="assign"
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
        <td>{{ value.grandTotal }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
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

export default {
  name: "VScorecard",
  components: {
    VRow
  },
  props: {
    value: {
      type: Scorecard,
      required: true,
      validator: value => isScorecard(value)
    },
    dice: {
      type: Array,
      required: false,
      default: () => [],
      validator: value => isArray(value, isDice)
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false,
      validator: value => value !== undefined
    }
  },
  data: () => ({
    allowExtraPoints: false
  }),
  computed: {
    ones: function() {
      return sumIf(this.dice, 1);
    },
    twos: function() {
      return sumIf(this.dice, 2);
    },
    threes: function() {
      return sumIf(this.dice, 3);
    },
    fours: function() {
      return sumIf(this.dice, 4);
    },
    fives: function() {
      return sumIf(this.dice, 5);
    },
    sixes: function() {
      return sumIf(this.dice, 6);
    },
    threeOfAKind: function() {
      return [1, 2, 3, 4, 5, 6].some(x => count(this.dice, x) >= 3)
        ? sum(this.dice)
        : 0;
    },
    fourOfAKind: function() {
      return [1, 2, 3, 4, 5, 6].some(x => count(this.dice, x) >= 4)
        ? sum(this.dice)
        : 0;
    },
    fullHouse: function() {
      return hasFullHouse(this.dice) ? 25 : 0;
    },
    smallStraight: function() {
      return hasSequence(this.dice, 4) ? 30 : 0;
    },
    largeStraight: function() {
      return hasSequence(this.dice, 5) ? 40 : 0;
    },
    fiveOfAKind: function() {
      return [1, 2, 3, 4, 5, 6].some(x => count(this.dice, x) >= 5) ? 50 : 0;
    },
    chance: function() {
      return this.dice.reduce((total, current) => {
        return total + current.pips;
      }, 0);
    }
  },
  watch: {
    value: {
      deep: true,
      handler: function(val) {
        if (this.allowExtraPoints && val.fiveOfAKind === null) {
          this.allowExtraPoints = false;
        }
      }
    }
  },
  methods: {
    assign: function(value) {
      if (this.value.fiveOfAKind !== null) {
        if (!this.allowExtraPoints) {
          this.allowExtraPoints = true;
        } else if (this.fiveOfAKind > 0 && value > 0) {
          this.value.fiveOfAKind += 100;
        }
      }

      this.$emit("score");
    }
  }
};
</script>
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
