<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Network of School</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
       data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link mx-2" :to="{name: 'users'}">
              <fa icon="users"/> Usuarios</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link mx-2" :to="{name: 'home'}">
              <fa icon="book"/> Observador</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link mx-2" :to="{name: 'home'}">
              <fa icon="newspaper"/> Novedades</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link mx-2" :to="{name: 'home'}">
              <fa icon="money-bill-transfer"/> Financiero</router-link>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/init';

/*eslint-disable */
//import firebase from "firebase/compat";
export default {
  name: 'NavbarComponent',
  data() {
    return {
      user: null,
      adminuser: false,
      verifyuser: false,
      classm: 'nav-link',
    };
  },
  methods: {
    async createUser() {
      /*const colRef = collection(db, 'users');

      const dataObject = {
        name: 'julian',
        cel: '123456789',
        address: 'Av siempre viva 743'
      };

      const docRef = await addDoc(colRef, dataObject);

      console.log('Documents was created with Id: ', docRef.id);*/
    },
    changeAdmin(event) {
      /*if (this.$store.state.userdata.data.rol === 1) {
        this.adminuser = true;
      }*/
    },
    logout(event) {
      /*firebase.auth().signOut()
      .then(() => {
        this.$router.push({
          name: 'home'
        })
        location.reload();
      });*/
    },
  },
  created() {
    this.createUser();
  },
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
  }
};
</script>