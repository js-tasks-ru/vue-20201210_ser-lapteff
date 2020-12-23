export const CounterButton = {
  // Шаблон потребуется отредактировать
  template: '<button type="button" @click="clickHandler">{{ counter }}</button>',

  // Компонент должен иметь входной параметр
  props: {
    count: {
      type: Number,
      default: 0,
      // validator: (value) => value.typeof === 'number',
    },
  },
  data: function () {
    return {
      counter: this.count
    }
  },

  // Компонент должен иметь модель
  model: {
    prop: 'count',
    event: 'increment',
  },
  // Шаблон лучше держать максимально простым, а логику выносить в методы
  methods: {
    clickHandler(e) {
      this.$emit('increment', this.counter = this.counter + 1)
    },
  },
};
