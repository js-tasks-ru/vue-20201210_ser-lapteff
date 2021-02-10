<script>
export default {
  render: function (h) {
    var self = this
    return h(
      this.tag,
      {
        staticClass: "button",
        class: {
          button_block: this.block
        },
        on: {
          click: function () {
            self.$emit('click')
          }
        },
      },
      this.$slots.default
    )
  },
  name: 'BaseButton',
  props: {
    block: Boolean,
    tag: {
      type: String,
      default: 'button',
      validator: function (value) {
        // Значение должно соответствовать одной из этих строк
        return ['button', 'a', 'router-link'].indexOf(value) !== -1
      }
    }
  }
};
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition: 0.2s all;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}

.button.button_block {
  display: block;
  width: 100%;
}
</style>
