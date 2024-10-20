<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="../../assets/logo-noos.png" width="224" height="80" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link mx-2" :to="{ path: 'users' }">
              <fa icon="users" /> Usuarios</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link mx-2" :to="{ path: 'notes' }">
              <fa icon="book" /> Observador</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link mx-2" :to="{ path: 'homeworks' }">
              <fa icon="newspaper" /> Tareas</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link mx-2" :to="{ path: 'financial' }">
              <fa icon="money-bill-transfer" /> Financiero</router-link
            >
          </li>
        </ul>
        <section class="d-flex">
          <section
            style="color: black; border: none; top: -12px; right: -38px; position: absolute"
          >
            <div class="btn-group">
              <button
                class="btn btn-light custom-dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img class="profile-image" :src="sessionUser.photoURL" width="38" height="38" />
              </button>
              <ul class="dropdown-menu dropdown-menu-end custom-dropdown-menu" style="position: absolute; top: 58px; right: 34px">
                <li>
                  <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#accountModal">
                    <fa icon="user" width="12" height="12" /> <label style="margin-left: 4px"> Cuenta </label>
                  </a>
                  <li><hr class="dropdown-divider"></li>
                  <a class="dropdown-item" href="#" @click="googleSignOut">
                    <label style="margin-right: 4px"> Salir </label> <fa icon="sign-out" width="16" height="16" />
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </section>
      </div>
    </div>
  </nav>
  <div
      class="modal fade"
      id="accountModal"
      data-keyboard="true"
      tabindex="-1"
      role="dialog"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              <fa icon="user" /> &nbsp; <strong>Mi cuenta</strong>
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <user-account-component />
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import UserAccountComponent from './components/UserAccount.vue'
import { auth } from "@/firebase/init";
import { signOut } from "firebase/auth";
import { mapState } from "vuex";
import Swal from "sweetalert2";
import * as bootstrap from "bootstrap";

export default {
  name: "NavbarComponent",
  components: {
    UserAccountComponent
  },
  data() {
    return {
      user: null,
      adminuser: false,
      verifyuser: false,
      classm: "nav-link",
      toastTrigger: null,
      toastLiveExample: null,
    };
  },
  mounted() {
    this.modal = new bootstrap.Modal("#accountModal", {});
  },
  computed: {
    ...mapState(["sessionUser"]),
  },
  methods: {
    googleSignOut() {
      Swal.fire({
        title: "Desea cerrar sesión?",
        text: "Deberá ingresar al sistema nuevamente!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "DimGray",
        confirmButtonText: "Cerrarla!",
      }).then((result) => {
        if (result.isConfirmed) {
          signOut(auth).then(() => {
            Swal.fire(
              "Sesión cerrada",
              "La sesión ha sido cerrada de manera segura",
              "success"
            ).then(() => this.$router.push({ path: "/" }));
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.profile-image {
  top: 18px;
  right: 48px;
  position: absolute;
  border-radius: 50%;
}

.custom-dropdown-toggle {
  background: none;
  border: none;
  padding: 0;
}

.custom-dropdown-menu {
  text-align: right;
  min-width: auto;
  width: auto;
  padding: 4px 8px; 
}
</style>
