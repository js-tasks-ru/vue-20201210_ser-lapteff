<template>
  <form class="form meetup-form" @submit.prevent="handleSubmit">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <div class="form-group">
          <label class="form-label">Название</label>
          <input class="form-control" v-model="meetup_.title"/>
        </div>
        <div class="form-group">
          <label class="form-label">Дата</label>
          <input class="form-control" type="date" v-model="meetupDate"/>
        </div>
        <div class="form-group">
          <label class="form-label">Место</label>
          <input class="form-control" v-model="meetup_.place"/>
        </div>
        <div class="form-group">
          <label class="form-label">Описание</label>
          <textarea class="form-control" rows="3" v-model="meetup_.description"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Изображение</label>
          <image-uploader v-model="meetup_.imageId"/>
        </div>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
      <meetup-agenda-item-form
        v-for="( agendaItem, index ) in meetup_.agenda"
        :agendaItem.sync="agendaItem"
        :key="agendaItem.id"
        @remove="removeAgendaItem(index)"
        @update:agendaItem="updateAgendaItem(index, $event)"
        class="mb-3"/>

      <div class="form-section_append">
        <button type="button" data-test="addAgendaItem" @click="addAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <button
          class="button button_secondary button_block"
          type="button"
          data-test="cancel"
          @click="$emit('cancel')"
        >
          Отмена
        </button>
        <button
          class="button button_primary button_block"
          type="submit"
          data-test="submit"
        >
          {{ submitText }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import ImageUploader from './ImageUploader';

function buildAgendaItem() {
  return {
    id: Math.random(),
    startsAt: '00:00',
    endsAt: '00:00',
    type: 'other',
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export default {
  name: 'MeetupForm',

  components: {
    ImageUploader,
    MeetupAgendaItemForm,
  },
  data() {
    return {
      meetup_: deepClone(this.meetup),
      // agenda_: [...this.meetup.agenda]
    }
  },
  props: {
    meetup: {
      type: Object,
      required: true
    },
    submitText: {
      type: String
    }
  },
  computed: {
    meetupDate: {
      get() {
        return this.dateString(this.meetup_.date)
      },
      set(date) {
        this.meetup_.date = date;
      }
    }
  },
  methods: {
    dateString(valDate) {
      const curDate = new Date(valDate)
      const YYYY = curDate.getUTCFullYear();
      const MM = (curDate.getUTCMonth() + 1).toString().padStart(2, '0');
      const DD = curDate.getUTCDate().toString().padStart(2, '0');
      return `${YYYY}-${MM}-${DD}`;
    },
    handleUpdateDate($event) {
      this.$emit('change', this.meetup_.date = this.dateString($event.target.valueAsDate))
    },
    addAgendaItem() {
      const item = buildAgendaItem();
      const arrAgenda = this.meetup_.agenda;
      if (arrAgenda.length === 0) {
        arrAgenda.push(item)
      } else {
        item.startsAt = arrAgenda[arrAgenda.length - 1].endsAt;
        this.meetup_.agenda.push(item)
      }
    },
    removeAgendaItem(index) {
      this.meetup_.agenda.splice(index, 1)
    },
    updateAgendaItem(index, newAgendaItem) {
      this.meetup_.agenda.splice(index, 1, newAgendaItem)
    },
    handleSubmit() {
      this.$emit('submit', deepClone(this.meetup_))
    },
  }
};
</script>

<style scoped>
.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>
