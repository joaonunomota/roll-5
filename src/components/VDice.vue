<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";
import VLock from "./VLock.vue";
import { isDice } from "../utils";
import type { Dice } from "../types";

const props = defineProps({
  modelValue: {
    type: Object as PropType<Dice>,
    required: true,
    validator: (value: Dice) => isDice(value)
  },
  disabled: {
    type: Boolean,
    required: true,
    validator: (value: boolean) => value !== undefined
  }
});

const emit = defineEmits(["update:modelValue"]);

const pips = computed(() => {
  switch (props.modelValue.pips) {
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
});
const alt = computed(() => `A dice with ${pips.value} ${pips.value === "one" ? "pip" : "pips"}`);

const update = (locked: boolean) =>
  emit("update:modelValue", { pips: props.modelValue.pips, locked: locked });
</script>

<template>
  <div class="dice-container">
    <v-lock :value="modelValue.locked" :disabled="disabled" @click="update" />
    <br />
    <img
      :alt="alt"
      :class="['dice', pips]"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    />
  </div>
</template>

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
