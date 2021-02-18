<template>
  <div class="container">
    <meetups-view
      :view.sync="view"
      :date.sync="date"
      :participation.sync="participation"
      :search.sync="search"
    />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

export default {
  name: 'PageWithQuery',
  components: { MeetupsView },
  data() {
    return {
      view: 'list',
      date: 'all',
      participation: 'all',
      search: '',
    };
  },
  watch: {
    $route: {
      handler: function (to) {
        this.query = to.query;
      },
      immediate: true,
    },
    query(value) {
      this.$router.push(value).catch((err) => {
        if (err.name !== 'NavigationDuplicated') {
          throw err;
        }
      });
    },
  },
  computed: {
    query: {
      get: function () {
        return {
          query: {
            ...(this.view === 'list' ? {} : { view: this.view }),
            ...(this.date === 'all' ? {} : { date: this.date }),
            ...(this.participation === 'all'
              ? {}
              : { participation: this.participation }),
            ...(this.search === '' ? {} : { search: this.search }),
          },
        };
      },
      set: function (query) {
        this.view = query.view || this.view;
        this.date = query.date || this.date;
        this.participation = query.participation || this.participation;
        this.search = query.search || this.search;
      },
    },
  },
};
</script>

<style scoped></style>
