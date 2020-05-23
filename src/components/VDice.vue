<template>
  <div :class="['dice', pips]"></div>
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
  },
  computed: {
    pips: function() {
      switch (this.value) {
        case 6:
          return "six";
        case 5:
          return "five";
        case 4:
          return "four";
        case 3:
          return "three";
        case 2:
          return "two";
        default:
          return "one";
      }
    }
  }
};
</script>
<style lang="scss">
.dice {
  height: 320px;
  width: 320px;
  background-image: url("../assets/dice.png");

  &.one {
    background-position: 0 0;
  }

  &.two {
    background-position: -320px 0;
  }

  &.three {
    background-position: -640px 0;
  }

  &.four {
    background-position: -960px 0;
  }

  &.five {
    background-position: -1280px 0;
  }

  &.six {
    background-position: -1600px 0;
  }
}
</style>
