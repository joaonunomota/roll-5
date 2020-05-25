<template>
  <button
    v-show="!disabled"
    :class="['lock', value ? 'closed' : 'open']"
    :disabled="disabled"
    @click="toggle"
  ></button>
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
