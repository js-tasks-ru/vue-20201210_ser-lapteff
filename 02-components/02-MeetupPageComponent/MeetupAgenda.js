import { MeetupAgendaItem } from './MeetupAgendaItem.js';

export const MeetupAgenda = {
  name: 'MeetupAgenda',

  template: `
    <div class="meetup-agenda">
      <meetup-agenda-item v-if="agenda" v-for="agendaItem of agenda"  :agendaItem="agendaItem" :key="agendaItem.id" />
    </div>`,

  // components
  components: {
    MeetupAgendaItem
  },

  // props
  props: {
    agenda: {
      type: Array,
      required: true
    }
  }
};
