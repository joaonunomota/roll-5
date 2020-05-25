<template>
  <table>
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="col" colspan="2">UPPER SECTION</th>
      </tr>
      <tr>
        <th scope="row">Aces</th>
        <td></td>
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
        <td></td>
      </tr>
      <tr>
        <th scope="col" colspan="2">TOTALS</th>
      </tr>
      <tr>
        <th scope="row">Total (Upper Section)</th>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Total (Lower Section)</th>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Grand Total</th>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "VScorecard"
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
