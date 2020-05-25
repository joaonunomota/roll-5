<template>
  <button :class="['lock', value ? 'closed' : 'open']" :disabled="disabled" @click="toggle"></button>
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
button {
  display: inline-block;
  border: none;
  background: transparent;
  margin: 0;
  text-decoration: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

button:focus {
  outline: none;
}

.lock {
  height: 32px;
  width: 32px;
  background-image: url("../assets/lock.png");
  background-size: 32px 64px;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }

  &.closed {
    background-position: 0 0;
  }

  &.open {
    background-position: 0 -32px;
  }
}
</style>
