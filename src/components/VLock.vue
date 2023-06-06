<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  value: {
    type: Boolean,
    required: true,
    validator: (value) => value !== undefined
  },
  disabled: {
    type: Boolean,
    required: true,
    validator: (value) => value !== undefined
  }
});

const emit = defineEmits(["click"]);

const alt = computed(() => {
  return props.value
    ? "A closed lock, dice is not re-rolled. Press to unlock."
    : "An open lock, dice is re-rolled. Press to lock.";
});

const toggle = () => emit("click", !props.value);
</script>

<template>
  <input
    v-show="!disabled"
    :alt="alt"
    :aria-pressed="value"
    :class="['lock', value ? 'closed' : 'open']"
    :disabled="disabled"
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    type="image"
    @click="toggle"
  />
</template>

<style lang="scss">
.lock {
  height: 64px;
  width: 64px;
  background-image: url("../assets/images/lock.png");
  background-size: 200% 200%;

  &.closed {
    background-position: 0 0;

    &:focus {
      background-position: -100% 0;
    }
  }

  &.open {
    background-position: 0 -100%;

    &:focus {
      background-position: -100% -100%;
    }
  }
}
</style>
