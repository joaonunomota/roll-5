<script setup lang="ts">
import type { PropType } from "vue";
import { isArray } from "../utils";
import { isScore } from "../utils/validators";
import type { Score } from "../types";

defineProps({
  rows: {
    type: Array as PropType<Score[]>,
    required: true,
    validator: (value) => isArray(value, isScore)
  },
  title: {
    type: String,
    required: true,
    validator: (value) => value !== undefined
  }
});
</script>

<template>
  <table>
    <thead>
      <tr>
        <th scope="col" colspan="2">{{ title }}</th>
      </tr>
      <tr>
        <th>Player</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <td>{{ row.name }}</td>
        <td>{{ row.score }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
table {
  margin: 10px auto;
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
