<template>
  <calendar-view :month="4" :year="2020">
    <template #default="{day}">
      <calendar-view-event
        v-for="meetup in meetups"
        v-if="new Date(meetup.date).getMonth() === day.monthNum && new Date(meetup.date).getDate() === day.dayNum"
        tag="router-link"
        :to="{ name: 'meetup', params: { meetupId: meetup.id } }"
      >
        {{ meetup.title }}
      </calendar-view-event>
    </template>
  </calendar-view>
</template>

<script>
import CalendarView from './CalendarView';
import CalendarViewEvent from './CalendarViewEvent';

export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  components: {
    CalendarViewEvent,
    CalendarView,
  },
};
</script>

<style></style>
