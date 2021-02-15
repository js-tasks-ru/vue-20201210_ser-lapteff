<template>
  <AppInput :type="type" :value="localValue" v-bind="$attrs" v-on="$listeners" @input.native="handleUpdate">
    <!-- Так можно передать все слоты в дочерний компонент -->
    <template v-for="slot of Object.keys($slots)" v-slot:[slot] >
      <slot :name="slot" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';

export default {
  name: 'DateInput',
  inheritAttrs: false,

  components: { AppInput },

  computed: {
    localValue() {
      if (this.valueAsNumber || this.valueAsDate) {
        const date = this.valueAsNumber ? new Date(this.valueAsNumber) : this.valueAsDate;
        if (this.type == 'date') return this.dateString(date);
        if (this.type == 'time') return this.timeString(date);
        if (this.type == 'datetime-local') return this.fullDateString(date);
      } else {
        return this.value;
      }
    },
  },
  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    // Чтобы value не было в списке $attrs, его можно указать в списке параметров
    value: {},
    type: {
      type: String,
      default: 'date',
      validator: function (value) {
        return ['date', 'time', 'datetime-local'].indexOf(value) !== -1
      }
    },
    valueAsNumber: Number,
    valueAsDate: Date
  },
  methods: {
    fullDateString(valDate) {
      const YYYY = valDate.getUTCFullYear();
      const MM = (valDate.getUTCMonth() + 1).toString().padStart(2, '0');
      const DD = valDate.getUTCDate().toString().padStart(2, '0');
      const hh = valDate.getUTCHours().toString().padStart(2, '0');
      const mm = valDate.getUTCMinutes().toString().padStart(2, '0');
      return `${YYYY}-${MM}-${DD}T${hh}:${mm}`;
    },
    dateString(valDate) {
      const YYYY = valDate.getUTCFullYear();
      const MM = (valDate.getUTCMonth() + 1).toString().padStart(2, '0');
      const DD = valDate.getUTCDate().toString().padStart(2, '0');
      return `${YYYY}-${MM}-${DD}`;
    },
    timeString(valDate) {
      const hours = valDate.getUTCHours().toString().padStart(2, '0');
      const minutes = valDate.getUTCMinutes().toString().padStart(2, '0');
      const ss = valDate.getUTCSeconds().toString().padStart(2, '0');
      const curSec = !this.$attrs.step || Number(this.$attrs.step) % 60 === 0 ? "" : ':' + ss
      return `${hours}:${minutes}` + curSec;

    },
    handleUpdate($event) {
      this.$emit('update:valueAsNumber', $event.target.valueAsNumber);
      this.$emit('update:valueAsDate', this.type !== 'datetime-local' ? $event.target.valueAsDate : new Date($event.target.valueAsNumber),
      );
    }
  }
};
</script>

<style scoped></style>
