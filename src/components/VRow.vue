<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
  value: {
    type: Object as PropType<number | null>,
    default: null,
    validator: (value: number) => value !== undefined && (!Number.isNaN(value) || value === null)
  },
  name: {
    type: String,
    required: true,
    validator: (value: string) => [undefined, null, ""].indexOf(value) === -1
  },
  option: {
    type: Number,
    required: true,
    validator: (value: number) => value !== undefined && value !== null
  },
  readonly: {
    type: Boolean,
    required: true,
    validator: (value: boolean) => value !== undefined && value !== null
  }
});

const emit = defineEmits(["update"]);

const click = () => emit("update", props.option);
</script>

<template>
  <tr>
    <th id="label" scope="row">{{ name }}</th>
    <td v-if="value === null && !readonly">
      <button class="is-discreet" aria-describedby="label" @click="click">
        {{ option }}
      </button>
    </td>
    <td v-else>{{ value === null ? "" : value }}</td>
  </tr>
</template>

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
</style>
