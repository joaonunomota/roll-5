<template>
  <table>
    <thead>
      <tr>
        <th scope="col">UPPER SECTION</th>
        <th scope="col">{{ value.name === null ? "P1" : value.name }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Aces</th>
        <td>
          <button
            class="is-discreet"
            @click="assign('ones', ones)"
            :disabled="readonly || value.ones !== null"
          >{{ value.ones === null && !readonly ? ones : value.ones }}</button>
        </td>
      </tr>
      <tr>
        <th scope="row">Twos</th>
        <td>
          <button
            class="is-discreet"
            @click="assign('twos', twos)"
            :disabled="readonly || value.twos !== null"
          >{{ value.twos === null && !readonly ? twos : value.twos }}</button>
        </td>
      </tr>
      <tr>
        <th scope="row">Threes</th>
        <td>
          <button
            class="is-discreet"
            @click="assign('threes', threes)"
            :disabled="readonly || value.threes !== null"
          >{{ value.threes === null && !readonly ? threes : value.threes }}</button>
        </td>
      </tr>
      <tr>
        <th scope="row">Fours</th>
        <td>
          <button
            class="is-discreet"
            @click="assign('fours', fours)"
            :disabled="readonly || value.fours !== null"
          >{{ value.fours === null && !readonly ? fours : value.fours }}</button>
        </td>
      </tr>
      <tr>
        <th scope="row">Fives</th>
        <td>
          <button
            class="is-discreet"
            @click="assign('fives', fives)"
            :disabled="readonly || value.fives !== null"
          >{{ value.fives === null && !readonly ? fives : value.fives }}</button>
        </td>
      </tr>
      <tr>
        <th scope="row">Sixes</th>
        <td>
          <button
            class="is-discreet"
            @click="assign('sixes', sixes)"
            :disabled="readonly || value.sixes !== null"
          >{{ value.sixes === null && !readonly ? sixes : value.sixes }}</button>
        </td>
      </tr>
      <tr>
        <th scope="row">Total</th>
        <td>{{ upper }}</td>
      </tr>
      <tr>
        <th scope="row">Bonus</th>
        <td>{{ bonus }}</td>
      </tr>
      <tr>
        <th scope="col">LOWER SECTION</th>
        <th scope="col">{{ value.name === null ? "P1" : value.name }}</th>
      </tr>
      <tr>
        <th scope="row">3 of a Kind</th>
        <td>
          <button
            class="is-discreet"
            @click="assign('threeOfAKind', threeOfAKind)"
            :disabled="readonly || value.threeOfAKind !== null"
          >{{ value.threeOfAKind === null && !readonly ? threeOfAKind : value.threeOfAKind }}</button>
        </td>
      </tr>
      <tr>
        <th scope="row">4 of a Kind</th>
        <td>
          <button
            class="is-discreet"
            @click="assign('fourOfAKind', fourOfAKind)"
            :disabled="readonly || value.fourOfAKind !== null"
          >{{ value.fourOfAKind === null && !readonly ? fourOfAKind : value.fourOfAKind }}</button>
        </td>
      </tr>
      <tr>
        <th scope="row">Full House</th>
        <td>
          <button
            class="is-discreet"
            @click="assign('fullHouse', fullHouse)"
            :disabled="readonly || value.fullHouse !== null"
          >{{ value.fullHouse === null && !readonly ? fullHouse : value.fullHouse }}</button>
        </td>
      </tr>
      <tr>
        <th scope="row">Small Straight</th>
        <td>
          <button
            class="is-discreet"
            @click="assign('smallStraight', smallStraight)"
            :disabled="readonly || value.smallStraight !== null"
          >{{ value.smallStraight === null && !readonly ? smallStraight : value.smallStraight }}</button>
        </td>
      </tr>
      <tr>
        <th scope="row">Large Straight</th>
        <td>
          <button
            class="is-discreet"
            @click="assign('largeStraight', largeStraight)"
            :disabled="readonly || value.largeStraight !== null"
          >{{ value.largeStraight === null && !readonly ? largeStraight : value.largeStraight }}</button>
        </td>
      </tr>
      <tr>
        <th scope="row">ROLL 5 (5 of a Kind)</th>
        <td>
          <button
            class="is-discreet"
            @click="assign('fiveOfAKind', fiveOfAKind)"
            :disabled="readonly || value.fiveOfAKind !== null"
          >{{ value.fiveOfAKind === null && !readonly ? fiveOfAKind : value.fiveOfAKind }}</button>
        </td>
      </tr>
      <tr>
        <th scope="row">Chance</th>
        <td>
          <button
            class="is-discreet"
            @click="assign('chance', chance)"
            :disabled="readonly || value.chance !== null"
          >{{ value.chance === null && !readonly ? chance : value.chance }}</button>
        </td>
      </tr>
      <tr>
        <th scope="col">TOTALS</th>
        <th scope="col">{{ value.name === null ? "P1" : value.name }}</th>
      </tr>
      <tr>
        <th scope="row">Total (Upper Section)</th>
        <td>{{ upper + bonus }}</td>
      </tr>
      <tr>
        <th scope="row">Total (Lower Section)</th>
        <td>{{ lower }}</td>
      </tr>
      <tr>
        <th scope="row">Grand Total</th>
        <td>{{ grandTotal }}</td>
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
  count
} from "../utils";

export default {
  name: "VScorecard",
  props: {
    value: {
      type: Object,
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
    },
    upper: function() {
      return (
        this.nullToZero(this.value.ones) +
        this.nullToZero(this.value.twos) +
        this.nullToZero(this.value.threes) +
        this.nullToZero(this.value.fours) +
        this.nullToZero(this.value.fives) +
        this.nullToZero(this.value.sixes)
      );
    },
    bonus: function() {
      return this.upper >= 63 ? 35 : 0;
    },
    lower: function() {
      return (
        this.nullToZero(this.value.threeOfAKind) +
        this.nullToZero(this.value.fourOfAKind) +
        this.nullToZero(this.value.fullHouse) +
        this.nullToZero(this.value.smallStraight) +
        this.nullToZero(this.value.largeStraight) +
        this.nullToZero(this.value.fiveOfAKind) +
        this.nullToZero(this.value.chance)
      );
    },
    grandTotal: function() {
      return this.upper + this.bonus + this.lower;
    }
  },
  methods: {
    assign: function(property, value) {
      if (this.fiveOfAKind !== 0 && value !== 0) {
        this.value.fiveOfAKind += 100;
      }

      this.value[property] = value;
      this.$emit("score");
    },
    nullToZero: function(value) {
      return value === null ? 0 : value;
    }
  }
};
</script>
<style lang="scss">
button {
  &.is-discreet {
    color: #1c7c54;

    &:focus,
    &:hover,
    &:active {
      color: #e83f6f;
    }

    &:disabled {
      color: initial;
    }
  }
}
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
