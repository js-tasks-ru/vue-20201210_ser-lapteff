import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<div>
    <meetup-view :meetup="rawMeetup" />
  </div>`,

  // components
  components:{
    MeetupView
  },

  // data
  data: function () {
    return {
      rawMeetup: {},
    }
  },
  // mounted
  async mounted() {
    this.rawMeetup = await fetchMeetup(MEETUP_ID);
  },
  // methods
};
