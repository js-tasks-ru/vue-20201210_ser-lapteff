<template>
  <button type="button" @click="handaleClick">{{ localCount }}</button>
</template>

<script>
export default {
  data() {
    return {
      localCount: this.count
    }
  },
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
  watch: {
    count: {
      handler(newValue) {
        return this.localCount = newValue
      },
    },
  },
  methods: {
    handaleClick() {
      this.$emit('increment', this.localCount += 1)
    },
  }
};
</script>

<style>
button {
  width: 100px;
}
</style>
