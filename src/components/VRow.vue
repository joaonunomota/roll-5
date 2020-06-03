<template>
  <tr>
    <th id="label" scope="row">{{ name }}</th>
    <td v-if="value === null && !readonly">
      <button
        class="is-discreet"
        aria-describedby="label"
        @click="$emit('input', option)"
      >{{ option }}</button>
    </td>
    <td v-else>{{ value === null ? "" : value }}</td>
  </tr>
</template>
<script>
export default {
  name: "VRow",
  props: {
    value: {
      type: Number,
      validator: value =>
        value !== undefined && (!Number.isNaN(value) || value === null)
    },
    name: {
      type: String,
      required: true,
      validator: value => [undefined, null, ""].indexOf(value) === -1
    },
    option: {
      type: Number,
      required: true,
      default: () => [],
      validator: value => value !== undefined && value !== null
    },
    readonly: {
      type: Boolean,
      required: true,
      validator: value => value !== undefined && value !== null
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
</style>