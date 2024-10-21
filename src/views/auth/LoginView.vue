<template>
    <section class="home text-center" style="gap: 24px">
      <div class="row" style="margin-top: 54px">
        <div class="col text-center">
          <img alt="noos logo" src="../../assets/logo-noos.png" />
        </div>
      </div>
      <div class="row">
        <div class="col text-center">
          <strong class="fs-3">
            Bienvenido a Network of School, su sistema personalizado de interacción educativo online
          </strong>
        </div>
      </div>
      <div class="row" v-if="!sessionUser">
        <authentication-component />
      </div>
    </section>
  </template>
  
  <script>
  import AuthenticationComponent from "../../components/auth/AuthenticationComponent.vue";
  import { mapState } from 'vuex';
  
  export default {
    name: "LoginView",
    components: {
      AuthenticationComponent,
    },
    computed: {
      ...mapState(["sessionUser"]),
    },
  };
  </script>
  