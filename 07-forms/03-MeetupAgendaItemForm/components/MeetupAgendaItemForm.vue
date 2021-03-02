<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <select class="form-control" title="Тип" v-model="agendaItem_.type">
        <option v-for="type in agendaTypes" :value="type.value">{{ type.text }}</option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input class="form-control" type="time" placeholder="00:00" v-model="localStartsAt" />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input class="form-control" type="time" placeholder="00:00" v-model="agendaItem_.endsAt" />
        </div>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">{{ localTitleText }}</label>
      <input class="form-control" v-model="agendaItem_.title" />
    </div>
    <div v-if="agendaItem_.type === 'talk'" class="form-group">
      <label class="form-label">Докладчик</label>
      <input class="form-control" v-model="agendaItem_.speaker" />
    </div>
    <div v-if="agendaItem_.type === 'other' || agendaItem_.type === 'talk'" class="form-group">
      <label class="form-label">Описание</label>
      <textarea class="form-control" v-model="agendaItem_.description"></textarea>
    </div>
    <div v-if="agendaItem_.type === 'talk'" class="form-group">
      <label class="form-label">Язык</label>
      <select class="form-control" v-model="agendaItem_.language">
        <option v-for="item in talkLanguages" :value="item.value">{{ item.text }}</option>
      </select>
    </div>
  </div>
</template>

<script>
const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',
  props: {
    agendaItem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      agendaItem_: this.agendaItem
    }
  },
  watch: {
    agendaItem_: {
      deep: true,
      handler(newValue) {
        this.$emit('update:agendaItem', newValue);
      }
    }
  },
  computed: {
    agendaTypes() {
      return getAgendaItemTypes()
    },
    talkLanguages() {
      return getTalkLanguages()
    },
    localStartsAt: {
      get() {
        return this.agendaItem_.startsAt
      },
      set(newValue) {
        const timeStartMinutes = this.getDateByTime(this.agendaItem_.startsAt)
        const timeEndMinutes = this.getDateByTime(this.agendaItem_.endsAt)
        const timeDifference = timeEndMinutes - timeStartMinutes;

        const timeEndMinutesNew = this.getDateByTime(newValue);
        timeEndMinutesNew.setTime(timeEndMinutesNew.getTime() + timeDifference);
        this.agendaItem_.endsAt = this.timeString(timeEndMinutesNew);

        this.agendaItem_.startsAt = newValue;
      }
    },
    localTitleText() {
      if (this.agendaItem_.type === 'talk') {
        return 'Тема'
      } else if (this.agendaItem_.type === 'other') {
        return 'Заголовок'
      } else {
        return 'Нестандартный текст (необязательно)'
      }
    }
  },
  methods: {
    getDateByTime(time) {
      const date = new Date();
      const [hh, mm] = time.split(':');
      date.setHours(hh, mm, 0, 0);
      return date;
    },
    timeString(valDate) {
      const hours = valDate.getHours().toString().padStart(2, '0');
      const minutes = valDate.getMinutes().toString().padStart(2, '0');
      const ss = valDate.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
  }
};
</script>

<style></style>
