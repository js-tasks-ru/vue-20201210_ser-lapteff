<template>
  <calendar-view>
    <template #default="{currentDate}">
      <calendar-view-event
        v-for="meetup in meetupsByDate[currentDate.toDateString()]"
        :key="meetup.id"
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
  computed: {
    meetupsByDate() {
      const result = {};
      this.meetups.forEach((meetup) => {
        const dateString = new Date(meetup.date).toDateString();
        if (!result[dateString]) {
          result[dateString] = [meetup];
        } else {
          result[dateString].push(meetup);
        }
      });
      return result;
    },
  },
  components: {
    CalendarViewEvent,
    CalendarView,
  }
};
</script>

<style></style>
