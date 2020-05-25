<template>
  <div class="dice-container">
    <v-lock v-model="value.locked" :disabled="disabled" />
    <div :class="['dice', pips]"></div>
  </div>
</template>
<script>
import VLock from "./VLock.vue";

export default {
  name: "VDice",
  components: {
    VLock
  },
  props: {
    value: {
      type: Object,
      required: true,
      validator: value =>
        value !== undefined &&
        value.pips !== undefined &&
        [1, 2, 3, 4, 5, 6].indexOf(value.pips) !== -1 &&
        value.locked !== undefined
    },
    disabled: {
      type: Boolean,
      required: true,
      validator: value => value !== undefined
    }
  },
  computed: {
    pips: function() {
      switch (this.value.pips) {
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
.dice-container {
  display: inline-block;
}

.dice {
  height: 32px;
  width: 32px;
  background-image: url("../assets/images/dice.png");
  background-size: 192px 64px;

  &.one {
    background-position: 0 -32px;
  }

  &.two {
    background-position: -32px -32px;
  }

  &.three {
    background-position: -64px -32px;
  }

  &.four {
    background-position: -96px -32px;
  }

  &.five {
    background-position: -128px -32px;
  }

  &.six {
    background-position: -160px -32px;
  }
}
</style>
