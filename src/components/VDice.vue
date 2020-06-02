<template>
  <div class="dice-container">
    <v-lock v-model="value.locked" :disabled="disabled" />
    <br />
    <img
      :alt="alt"
      :class="['dice', pips]"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    />
  </div>
</template>
<script>
import VLock from "./VLock.vue";
import { isDice } from "../utils";

export default {
  name: "VDice",
  components: {
    VLock
  },
  props: {
    value: {
      type: Object,
      required: true,
      validator: value => isDice(value)
    },
    disabled: {
      type: Boolean,
      required: true,
      validator: value => value !== undefined
    }
  },
  computed: {
    alt: function() {
      return `A dice with ${this.pips} pips`;
    },
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
  height: 64px;
  width: 64px;
  background-image: url("../assets/images/dice.png");
  background-size: 600% 200%;

  &.one {
    background-position: 0 -100%;
  }

  &.two {
    background-position: -100% -100%;
  }

  &.three {
    background-position: -200% -100%;
  }

  &.four {
    background-position: -300% -100%;
  }

  &.five {
    background-position: -400% -100%;
  }

  &.six {
    background-position: -500% -100%;
  }
}
</style>
