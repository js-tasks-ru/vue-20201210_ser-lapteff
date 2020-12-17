import Vue from './vue.esm.browser.js';

// const app = ...
// Рекомендуется использовать МЕТОД в качестве обработчика события

const app = new Vue({
  el: '#btn',
  data() {
    return {
      value: 0
    }
  },
  methods: {
    clickHandler(e) {
      this.value = this.value + 1;
    },
  },
});
