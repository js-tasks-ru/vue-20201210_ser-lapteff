<script>
export default {
  name: 'FadeTransitionGroup',
  render(h) {
    const clonesSlots = this.$slots.default.map(vnode => {
      vnode.data.class = {
        ...vnode.data.class,
        'fade-list-item': true
      };
      return vnode;
    })
    // console.log(clonesSlots)

    return h('transition-group',
      {
        class: {
          'fade-list': true
        },
        attrs: {
          ...this.$attrs,
          name: 'fade-list'
        },
        on: this.$listeners
      },
      clonesSlots)
  },
};
</script>

<style scoped>
.fade-list {
  position: relative;
}

.fade-list >>> .fade-list-item {
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.fade-list >>> .fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

.fade-list >>> .fade-list-enter,
.fade-list >>> .fade-list-leave-to {
  opacity: 0;
}

.fade-list >>> .fade-list-move {
  transition: transform 0.3s;
}
</style>
