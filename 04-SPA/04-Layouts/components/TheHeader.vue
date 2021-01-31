<template>
  <header class="header">
    <h1>
      <a href="/">
        <img
          src="https://course-vue.javascript.ru/img/logo.9431973c.svg"
          alt=""
        />
      </a>
    </h1>
    <nav data-v-26d177c4="" data-v-3a15ff9e="">
      <!----><a data-v-3a15ff9e="" href="/login" class="" data-v-26d177c4=""
        >Вход</a
      ><a data-v-3a15ff9e="" href="/register" class="" data-v-26d177c4=""
        >Регистрация</a
      ><a data-v-3a15ff9e="" href="/meetups/create" class="" data-v-26d177c4=""
        >Создать митап</a
      >
    </nav>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
};
</script>

<style scoped>
.header {
  padding: 44px 0 32px;
  background-color: var(--white);
}

.header h1,
.header h1 a {
  font-weight: 900;
  font-size: 34px;
  line-height: 30px;
  text-align: center;
  margin: 0 0 24px;
  text-transform: uppercase;
  color: var(--body-color);
  text-decoration: none;
}

.header nav {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 24px;
}

.header nav a {
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  text-decoration: none;
  padding: 0 20px;
  position: relative;
  display: inline-flex;
}

.header nav a + a {
  margin-top: 8px;
}

.header nav a:hover {
  color: var(--blue);
}

.header nav a:before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-2px, -50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--grey);
}

@media all and (min-width: 992px) {
  .header nav {
    flex-direction: row;
    align-items: center;
    margin-left: 0;
  }

  .header nav a,
  .header nav a + a {
    margin-top: 0;
  }

  .header nav a:first-child:before {
    display: none;
  }
}
</style>
