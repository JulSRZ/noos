
<template>
    <div class="container">
      <div class="row">
        <div class="col-md">
          <div class="card shadow-lg p-3 mb-5 bg-white rounded text-center">
            <div class="card-header">
              <h5 class="card-title" style="color: #879f2d;">
                <fa icon="file-invoice-dollar"/>
                Agregar Factura
              </h5>
            </div>
            <div class="card-body">
              <p class="card-text">
                Aquí pordrá agregar todas las facturas de cada acudiente según los hijos que tenga asignados.
              </p>
              <hr>
              <router-link class="btn btn-outline-dark" style="color:
               #879f2d;" :to="{name: 'addfinancial'}">
                Entrar
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md">
          <div class="card shadow-lg p-3 mb-5 bg-white rounded text-center">
            <div class="card-header">
              <h5 class="card-title" style="color: #879f2d;">
                <fa icon="book"/>
                Administrar Estados de Cuenta
              </h5>
            </div>
            <div class="card-body">
              <p class="card-text">
                Aquí pordrá administrar todas las facturas de los padres según los hijos que tenga asignados.
              </p>
              <hr>
              <router-link class="btn btn-outline-dark" style="color:
               #879f2d;" :to="{name: 'managefinancialstates'}">
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
    name: 'FinancialComponent',
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
  