<template>
  <table>
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">{{ value.name }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="col" colspan="2">UPPER SECTION</th>
      </tr>
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
        <td></td>
      </tr>
      <tr>
        <th scope="row">Threes</th>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Fours</th>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Fives</th>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Sixes</th>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Total</th>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Bonus</th>
        <td></td>
      </tr>
      <tr>
        <th scope="col" colspan="2">LOWER SECTION</th>
      </tr>
      <tr>
        <th scope="row">3 of a Kind</th>
        <td></td>
      </tr>
      <tr>
        <th scope="row">4 of a Kind</th>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Full House</th>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Small Straight</th>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Large Straight</th>
        <td></td>
      </tr>
      <tr>
        <th scope="row">ROLL 5 (5 of a Kind)</th>
        <td></td>
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
        <th scope="col" colspan="2">TOTALS</th>
      </tr>
      <tr>
        <th scope="row">Total (Upper Section)</th>
        <td>{{ upper }}</td>
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
import { isArray, isDice, isScorecard, sumIf } from "../utils";

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
    chance: function() {
      return this.dice.reduce((total, current) => {
        return total + current.pips;
      }, 0);
    },
    upper: function() {
      return this.nullToZero(this.value.ones);
    },
    lower: function() {
      return this.nullToZero(this.value.chance);
    },
    grandTotal: function() {
      return this.upper + this.lower;
    }
  },
  methods: {
    assign: function(property, value) {
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
