<template>
  <div class="container">
    <div class="row">
      <div class="col-md" v-if="noosUser?.role?.id === 1 || noosUser?.role?.id === 2">
        <div class="card shadow-lg p-3 mb-5 bg-white rounded text-center">
          <div class="card-header">
            <h5 class="card-title" style="color: #879f2d">
              <fa icon="file-invoice-dollar" />
              Agregar Factura
            </h5>
          </div>
          <div class="card-body">
            <p class="card-text">
              Agregar todas las facturas de cada acudiente según los hijos que tenga asignados.
            </p>
            <hr />
            <router-link
              class="btn btn-outline-dark"
              style="color: #879f2d"
              :to="{ path: 'add-financial' }"
            >
              Entrar
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-md">
        <div class="card shadow-lg p-3 mb-5 bg-white rounded text-center">
          <div class="card-header">
            <h5 class="card-title" style="color: #879f2d">
              <fa icon="book" />
              Administrar Estados de Cuenta
            </h5>
          </div>
          <div class="card-body">
            <p class="card-text">
              Administrar todas las facturas de los padres según los hijos que tenga asignados.
            </p>
            <hr />
            <router-link
              class="btn btn-outline-dark"
              style="color: #879f2d"
              :to="{ path: 'manage-financial-states' }"
            >
              Entrar
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "FinancialComponent",
  computed: {
    ...mapState(["noosUser"]),
  },
};
</script>

<style scoped>
.titlecolor {
  color: #879f2d;
}
</style>
