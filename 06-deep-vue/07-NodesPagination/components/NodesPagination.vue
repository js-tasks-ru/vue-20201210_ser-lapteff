<script>
export default {
  name: 'NodesPagination',
  render(h) {
    const startPos = (this.$props.page - 1) * this.$props.perPage;
    const endPos = startPos + this.$props.perPage;
    let content = '';
    if (this.$slots.default) content = this.$slots.default.slice(startPos, endPos)
    return h('div', content);
  },
  props: {
    page: {
      type: Number
    },
    perPage: {
      type: Number
    },
  },
};
</script>

<style scoped></style>
