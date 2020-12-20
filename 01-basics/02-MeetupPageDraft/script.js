import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data() {
    return {
      linkMeetup: `${API_URL}/meetups/${MEETUP_ID}`,
      rawMeetup: {},
      agendaTypesTitles: agendaItemTitles,
      agendaIcons: agendaItemIcons
    }
  },

  mounted() {
    // Требуется получить данные митапа с API
     this.fetchMeetup(this.linkMeetup);
  },

  computed: {
    rawMeetupDate() {
      return new Date(this.rawMeetup.date)
    },
    meetupDateLocal(){
      return this.rawMeetupDate.toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
    meetupDateString() {
        const YYYY = this.rawMeetupDate.getUTCFullYear();
        const MM = (this.rawMeetupDate.getUTCMonth() + 1).toString().padStart(2, '0');
        const DD = this.rawMeetupDate.getUTCDate().toString().padStart(2, '0');
        return `${YYYY}-${MM}-${DD}`;
    },
    meetupImage() {
      return this.rawMeetup.imageId
        ? {
          '--bg-url': `url('${getMeetupCoverLink(this.rawMeetup)}')`,
        }
        : {}
    },
  },

  methods: {
    // Получение данных с API предпочтительнее оформить отдельным методом,
    // а не писать прямо в mounted()
    async fetchMeetup (linkMeetup) {
      this.rawMeetup = await fetch(linkMeetup).then((res) => res.json());
    }

  },
});
