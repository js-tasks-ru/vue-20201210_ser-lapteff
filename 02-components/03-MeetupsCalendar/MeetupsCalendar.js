/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
  <div class="rangepicker__calendar">
    <div class="rangepicker__month-indicator">
      <div class="rangepicker__selector-controls">
        <button class="rangepicker__selector-control-left" @click="prevMonth"></button>
        <div>{{ currentMonthLocal }} {{ currentFullYear }}</div>
        <button class="rangepicker__selector-control-right" @click="nextMonth"></button>
      </div>
    </div>
    <div class="rangepicker__date-grid">
      <div class="rangepicker__cell" :class="{ rangepicker__cell_inactive: day.isInactive }" v-for="day in daysArray">
        {{ day.dayNum }}
        <a v-if="day.todaysMeetups" v-for="meetup in day.todaysMeetups" :href="'/meetups/'+meetup.id" class="rangepicker__event">{{ meetup.title }}</a>
      </div>
    </div>
  </div>
  </div>`,

  // Пропсы
  props: {
    meetups: {
      type: Array,
      required: true
    }
  },

  // В качестве локального состояния требуется хранить что-то,
  // что позволит определить текущий показывающийся месяц.
  // Изначально должен показываться текущий месяц
  data: () => ({
    date: new Date(),
  }),

  // Вычислимые свойства помогут как с получением списка дней, так и с выводом информации
  computed: {
    currentMonth(){
      return this.date.getMonth()
    },
    currentMonthLocal() {
      return this.date.toLocaleString(navigator.language, {
        // year: 'numeric',
        month: 'long',
        // day: 'numeric',
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
      let todaysMeetups = [];

      firstDay === 0 ? prevDays = 6 : prevDays = firstDay - 1;
      lastDay === 0 ? nextDays = 0 : nextDays = 7 - lastDay;

      let total = prevDays + (new Date(this.currentFullYear, this.currentMonth+1, 0).getDate()) + nextDays;

      for (let i = 1 - prevDays; daysArray.length < total; i++) {
        currentDate = new Date(this.currentFullYear, this.currentMonth, i);
        todaysMeetups = this.meetups.filter((meetup) => {
          let meetupDateStr = new Date(meetup.date).toLocaleString(navigator.language, {year: 'numeric', month: 'long', day: 'numeric'});
          let currentDateStr = currentDate.toLocaleString(navigator.language, {year: 'numeric', month: 'long', day: 'numeric'});
          return meetupDateStr === currentDateStr;
        });
        daysArray.push({
            dayDate: currentDate,
            dayNum: currentDate.getDate(),
            isInactive: (daysArray.length < prevDays) || (daysArray.length >= (total - nextDays)),
            todaysMeetups: todaysMeetups.length ? todaysMeetups : null,
          }
        );
      }
      return daysArray;
    }
  },

  // Методы понадобятся для переключения между месяцами
  methods: {
    prevMonth(){
      this.date = new Date(this.currentFullYear, this.currentMonth-1);
    },
    nextMonth(){
      this.date = new Date(this.currentFullYear, this.currentMonth+1);
    },
  }
};
