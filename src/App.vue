<template>
  <section id="nav" class="container-fluid">
    <navbar-component v-if="sessionUser !== null" />
    <router-view/>
  </section>
</template>

<script>
import NavbarComponent from './components/menu/NavbarComponent.vue';
import { mapState } from 'vuex';

export default {
  components: {
    NavbarComponent,
  },
  created() {
    this.$store.dispatch('fetchSessionUser');
  },
  computed: {
    ...mapState(['sessionUser']),
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
