<template>
  <div :class="['lock', value ? 'closed' : 'open']" @click="toggle"></div>
</template>
<script>
export default {
  name: "VLock",
  props: {
    value: {
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
  height: 32px;
  width: 32px;
  background-image: url("../assets/lock.png");
  background-size: 32px 64px;
  cursor: pointer;

  &.closed {
    background-position: 0 0;
  }

  &.open {
    background-position: 0 -32px;
  }
}
</style>
