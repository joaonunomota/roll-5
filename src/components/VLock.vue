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
<script>
export default {
  name: "VLock",
  props: {
    value: {
      type: Boolean,
      required: true,
      validator: value => value !== undefined
    },
    disabled: {
      type: Boolean,
      required: true,
      validator: value => value !== undefined
    }
  },
  computed: {
    alt: function() {
      return this.value
        ? "A closed lock, dice is not re-rolled. Press to unlock."
        : "An open lock, dice is re-rolled. Press to lock.";
    }
  },
  methods: {
    toggle: function() {
      this.$emit("input", !this.value);
    }
  }
};
</script>
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
