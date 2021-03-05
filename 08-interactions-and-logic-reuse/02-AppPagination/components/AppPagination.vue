<template>
  <div>
    <template v-for="item in slicedItems">
      <slot :item="item"></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',
  props: {
    page: Number,
    perPage: Number,
    items: Array
  },
  computed: {
    slicedItems() {
      const startPos = (this.page - 1) * this.perPage;
      const endPos = startPos + this.perPage;
      return this.items.slice(startPos, endPos)
    }
  }
};
</script>

<style></style>
