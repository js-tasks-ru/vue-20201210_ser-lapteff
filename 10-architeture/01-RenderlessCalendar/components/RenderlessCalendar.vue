<script>
export default {
  name: 'RenderlessCalendar',
  props: {
    month: {
      type: Number
    },
    year: {
      type: Number,
    }
  },
  data() {
    return {
      date: new Date(this.year, this.month),
    }
  },
  computed: {
    currentMonth(){
      return this.date.getMonth()
    },
    currentMonthLocal() {
      return this.date.toLocaleString(navigator.language, {
        month: 'long',
      })
    },
    currentFullYear(){
      return this.date.getFullYear()
    },
    daysArray(){
      let currentDate;
      let prevDays;
      let nextDays;
      let firstDay = new Date(this.currentFullYear, this.currentMonth, 1).getDay();
      let lastDay = new Date(this.currentFullYear, this.currentMonth + 1, 0).getDay();
      let daysArray = [];

      firstDay === 0 ? prevDays = 6 : prevDays = firstDay - 1;
      lastDay === 0 ? nextDays = 0 : nextDays = 7 - lastDay;

      let total = prevDays + (new Date(this.currentFullYear, this.currentMonth+1, 0).getDate()) + nextDays;

      for (let i = 1 - prevDays; daysArray.length < total; i++) {
        currentDate = new Date(this.currentFullYear, this.currentMonth, i);
        daysArray.push({
            currentDate: currentDate,
            isInactive: (daysArray.length < prevDays) || (daysArray.length >= (total - nextDays)),
          }
        );
      }
      return daysArray;
    }
  },

  methods: {
    prevMonth(){
      this.date = new Date(this.currentFullYear, this.currentMonth-1);
    },
    nextMonth(){
      this.date = new Date(this.currentFullYear, this.currentMonth+1);
    }
  },

  render() {
    return this.$scopedSlots.default({
      daysArray: this.daysArray,
      prevMonth: this.prevMonth,
      nextMonth: this.nextMonth,
      currentMonthLocal: this.currentMonthLocal,
      currentFullYear: this.currentFullYear
    });
  },
};
</script>
