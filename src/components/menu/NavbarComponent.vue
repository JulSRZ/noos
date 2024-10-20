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
        <section class="d-flex" role="search">
          <button
            class="btn btn-outline-light"
            style="color: black; border: none; top: 18px; right: 0px; position: absolute"
            type="button"
            @click="googleSignOut"
          >
            <fa icon="sign-out" />
          </button>
        </section>
      </div>
    </div>
  </nav>
</template>

<script>
import { auth } from "@/firebase/init";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";

export default {
  name: "NavbarComponent",
  data() {
    return {
      user: null,
      adminuser: false,
      verifyuser: false,
      classm: "nav-link",
    };
  },
  methods: {
    changeAdmin(event) {
      /*if (this.$store.state.userdata.data.rol === 1) {
        this.adminuser = true;
      }*/
    },
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
          signOut(auth)
            .then(() => {
              Swal.fire(
                "Sesión cerrada",
                "La sesión ha sido cerrada de manera segura",
                "success"
              ).then(() => this.$router.push({ path: "/" }));
            })
            .catch((error) => {
              // An error happened.
              console.log(error, "SIGN OUT ERROR");
            });
        }
      });
    },
  },
  created() {},
  beforeCreate(event) {
    /*firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.firestore().collection('users').where('uid', '==', user.uid).get()
            .then((data) => {
              data.docs.forEach((d) => {
                this.$store.state.userdata.data = d.data();
                this.changeAdmin();
              })
            });
        this.user = user;
        if (user.emailVerified) {
          this.classm = "nav-link";
        }
      } else {
        this.user = null;
      }
    });*/
  },
};
</script>
