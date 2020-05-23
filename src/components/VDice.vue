<template>
  <span>{{ value }}</span>
</template>
<script>
export default {
  name: "VDice",
  props: {
    value: {
      type: Number,
      required: true,
      validator: value =>
        value !== undefined && [1, 2, 3, 4, 5, 6].indexOf(value) !== -1
    }
  }
};
</script>
<style lang="scss"></style>
