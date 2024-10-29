<template>
  <div class="container">
    <div class="row">
      <div class="col-md" v-if="noosUser?.role?.id === 3 || noosUser?.role?.id === 1">
        <div class="card shadow-lg p-3 mb-5 bg-white rounded text-center">
          <div class="card-header">
            <h5 class="card-title" style="color: #879f2d">
              <fa icon="check-to-slot" />
              Agregar Tarea
            </h5>
          </div>
          <div class="card-body">
            <p class="card-text">Agregar todas todas las tareas de los estudiantes o del curso.</p>
            <hr />
            <router-link
              class="btn btn-outline-dark"
              style="color: #879f2d"
              :to="{ path: 'add-homework' }"
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
              <fa icon="list-check" />
              {{ getTitleByRole() }} tareas
            </h5>
          </div>
          <div class="card-body">
            <p class="card-text">{{ getTitleByRole() }} todas las tareas de los estudiantes o curso.</p>
            <hr />
            <router-link
              class="btn btn-outline-dark"
              style="color: #879f2d"
              :to="{ path: 'manage-homeworks' }"
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
import store from "../../store/index";
const noosUser = store.state.noosUser;

export default {
  name: "HomeworksComponent",
  computed: {
    ...mapState(["noosUser"]),
  },
  methods: {
    getTitleByRole() {
      return noosUser?.role?.id === 4 ? "Visualizar" : "Administrar";
    },
  },
};
</script>

<style scoped>
.titlecolor {
  color: #879f2d;
}
</style>
