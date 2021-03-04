<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="../assets/icons/icon-trash.svg" alt="trash"/>
    </button>

    <div class="form-group">
      <dropdown-button title="Тип" :options="$options.agendaItemTypes" v-model="agendaItem_.type"/>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <app-input type="time" placeholder="00:00" v-model="localStartsAt"/>
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <app-input type="time" placeholder="00:00" v-model="agendaItem_.endsAt"/>
        </div>
      </div>
    </div>

    <form-group v-for="field in $options.fieldSpecifications[agendaItem_.type]" :label="field.title">
      <component :is="field.component"
                 :name="field.field"
                 v-bind="field.props"
                 :[field.model.prop]="agendaItem_[field.field]"
                 @[field.model.event]="$emit(field.model.event, agendaItem_[field.field] = $event)"
      ></component>
    </form-group>
  </div>
</template>

<script>
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import FormGroup from './FormGroup';
import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypes,
} from '../meetup-service';

export default {
  name: 'MeetupAgendaItemForm',

  components: {AppInput, DropdownButton, FormGroup},

  props: {
    agendaItem: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      agendaItem_: {...this.agendaItem},
      fieldSpecifications: this.$options.fieldSpecifications,
    }
  },

  watch: {
    agendaItem_: {
      deep: true,
      handler() {
        this.$emit('update:agendaItem', {...this.agendaItem_});
      }
    }
  },
  computed: {
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
  },
  agendaItemTypes: getAgendaItemTypes(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),
};
</script>

<style></style>
