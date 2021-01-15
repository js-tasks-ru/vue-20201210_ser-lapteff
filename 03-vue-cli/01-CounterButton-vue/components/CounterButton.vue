<template>
  <button type="button" @click="handaleClick">{{ count }}</button>
</template>

<script>
export default {

  props: {
    count: {
      type: Number,
      default: 0,
    }
  },

  model: {
    prop: 'count',
    event: 'increment'
  },

  methods: {
    handaleClick() {
      this.$emit('increment', this.count + 1)
    }
  }
};
</script>

<style>
button {
  width: 100px;
}
</style>
