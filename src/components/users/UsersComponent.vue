<template>
  <div class="container">
    <div class="row">
      <div class="col-md">
        <div class="card shadow-lg p-3 mb-5 bg-white rounded text-center">
          <div class="card-header">
            <h5 class="card-title" style="color: #879f2d;">
              <fa icon="user-plus"/>
              Agregar Usuario
            </h5>
          </div>
          <div class="card-body">
            <p class="card-text">
              Agregar todos los usuarios administradores, docentes,
              padres y estudiantes que necesite para el sistema.
            </p>
            <hr>
            <router-link class="btn btn-outline-dark" style="color:
             #879f2d;" :to="{path: 'add-user'}">
              Entrar
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-md">
        <div class="card shadow-lg p-3 mb-5 bg-white rounded text-center">
          <div class="card-header">
            <h5 class="card-title" style="color: #879f2d;">
              <fa icon="users-cog"/>
              Administrar Usuarios
            </h5>
          </div>
          <div class="card-body">
            <p class="card-text">
              Administrar todos los usuarios administradores, docentes, padres
              y estudiantes que posee el sistema.
            </p>
            <hr>
            <router-link class="btn btn-outline-dark" style="color:
             #879f2d;" :to="{path: 'manage-users'}">
              Entrar
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
export default {
  name: 'UsersComponent',
  methods: {
    changeuls(param) {
      /*this.$store.state.userdata.listselect = param;
      this.$router.push({ name: 'manageusers' });*/
    },
  },
};
</script>

<style scoped>
.titlecolor {
  color: #879f2d;
}
</style>
