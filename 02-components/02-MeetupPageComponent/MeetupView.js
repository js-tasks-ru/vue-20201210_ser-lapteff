import { MeetupCover } from './MeetupCover.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
import { MeetupInfo } from './MeetupInfo.js';
import { getMeetupCoverLink } from './data.js';

export const MeetupView = {
  name: 'MeetupView',

  template: `
    <div>
      <!-- meetup cover -->
      <meetup-cover :link="meetupImage" :title="meetup.title" />
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <!-- meetup description -->
            <meetup-description :description="meetup.description" />
            <h3>Программа</h3>
            <!-- meetup agenda -->
            <meetup-agenda :agenda="meetup.agenda" />
          </div>
          <div class="meetup__aside">
            <!-- meetup info -->
            <meetup-info :organizer="meetup.organizer" :place="meetup.place" :date="rawMeetupDate" />
          </div>
        </div>
      </div>
    </div>`,

  components: {
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo
  },

  // props
  props: {
    meetup: {
      type: Object,
      required: true,
    }
  },
  computed: {
    rawMeetupDate() {
      return new Date(this.meetup.date)
    },
    meetupImage() {
      return getMeetupCoverLink(this.meetup)
    },
  },
};
