<template>
  <form class="form" @submit.prevent="validateForm">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input v-model="email" type="email" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input v-model="fullname" type="text" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input v-model="password" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input v-model="password2" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox">
        <input v-model="checked" type="checkbox" /> Я согласен с условиями
        <span></span>
      </label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">
        Зарегистрироваться
      </button>
    </div>
    <div class="form__append">
      Уже есть аккаунт?
      <router-link to="/login" class="link">Войдите</router-link>
    </div>
  </form>
</template>

<script>
import { login, register } from '../data';

export default {
  name: 'RegisterPage',
  data() {
    return {
      email: '',
      password: '',
      fullname: '',
      password2: '',
      checked: false,
    };
  },

  methods: {
    validateForm() {
      if (!this.email) {
        alert('Требуется ввести Email');
      } else if (!this.fullname) {
        alert('Требуется ввести полное имя');
      } else if (!this.password) {
        alert('Требуется ввести пароль');
      } else if (this.password !== this.password2) {
        alert('Пароли не совпадают');
      } else if (!this.checked) {
        alert('Требуется согласиться с условиями');
      } else {
        this.sendRegister(this.email, this.fullname, this.password);
      }
    },

    async sendRegister(email, fullname, password) {
      const response = await register(email, fullname, password);
      console.log(response);
      response.id ? alert(response.id) : alert(response.message);
    },
  },
};
</script>

<style scoped></style>
