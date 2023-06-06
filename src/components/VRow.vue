<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Number,
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

const emit = defineEmits(["update:modelValue"]);

const click = () => emit("update:modelValue", props.option);
</script>

<template>
  <tr>
    <th id="label" scope="row">{{ name }}</th>
    <td v-if="modelValue === null && !readonly">
      <button class="is-discreet" aria-describedby="label" @click="click">
        {{ option }}
      </button>
    </td>
    <td v-else>{{ modelValue === null ? "" : modelValue }}</td>
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
