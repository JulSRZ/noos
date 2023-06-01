<template>
  <div style="max-width: 80%">
    <div class="table-responsive shadow-lg p-3 mb-5 bg-white rounded">
      <div class="card" style="align-content: center">
      <div class="card-body">
        <h5 class="card-title">
          <router-link class="back" :to="{ name: 'users' }" title="Regresar" v-if="adminuser">
            <fa icon="arrow-circle-left" />
          </router-link>
          {{ titlelb }}
        </h5>
        <h6 class="card-subtitle mb-2 text-muted">Recuerde que <i class="req">*</i> son campos obligatorios</h6>
        <div class="card-body">
          <form @submit.prevent="checkPass">
            <div class="row mb-2">
              <div class="col-sm">
                  <label class="form-label" for="docType">Tipo de Documento</label> <i class="req">*</i>
                  <div class="input-group">
                    <span class="input-group-text">
                      <fa icon="list-alt" />
                    </span>
                    <select class="form-select form-select-sm" id="docType" v-model="user.tdoc" required>
                      <option v-for="doc in doctypes" v-bind:key="doc.id" :value="doc.id">
                        {{ doc.name }}
                      </option>
                    </select>
                  </div>
              </div>
              <div class="col-sm">
                <label class="form-label" for="doc">Documento de Identidad</label> <i class="req">*</i>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">
                    <fa icon="address-card" />
                  </span>
                  <input type="text" class="form-control" id="doc" autocomplete="off" v-model="user.doc" required>
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-sm">
                  <label class="form-label" for="username">Nombre</label> <i class="req">*</i>
                  <div class="input-group">
                    <span class="input-group-text">
                      <fa icon="user" />
                    </span>
                    <input type="text" class="form-control form-control-sm" id="username" autocomplete="off"
                      v-model="user.name" required>
                  </div>
              </div>
              <div class="col-sm">
                  <label class="form-label" for="email">E-mail</label> <i class="req">*</i>
                  <div class="input-group">
                    <span class="input-group-text">
                      <fa icon="envelope" />
                    </span>
                    <input type="email" class="form-control form-control-sm" id="email" placeholder="name@correo.com"
                      autocomplete="off" v-model="user.email" required>
                  </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-sm">
                  <label class="form-label" for="cel">Celular</label> <i class="req">*</i>
                  <div class="input-group">
                    <span class="input-group-text">
                      <fa icon="phone-square" />
                    </span>
                    <input type="tel" class="form-control form-control-sm" id="cel" autocomplete="off" maxlength="10"
                      v-model="user.cel" required>
                  </div>
              </div>
              <div class="col-sm">
                  <label class="form-label" for="dir">Dirección</label> <i class="req">*</i>
                  <!--a id="infoDirPop" tabindex="0" class="btn btn-sm btn-link infocol"
                       role="button" data-toggle="popover" data-trigger="focus"
                       style="color: #6c757d">
                      <fa icon="info-circle"/>
                    </a-->
                  <div class="input-group">
                    <span class="input-group-text">
                      <fa icon="map-marker-alt" />
                    </span>
                    <input type="text" class="form-control form-control-sm" id="dir"
                      placeholder="Calle 1 # 2 - 3 Apto:123" autocomplete="off" v-model="user.address" required>
                  </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-sm">
                  <label class="form-label" for="pass">Contraseña</label> <i class="req">*</i>
                  <div class="input-group">
                    <span class="input-group-text">
                      <fa icon="unlock" />
                    </span>
                    <input type="password" class="form-control form-control-sm" id="pass" autocomplete="off" minlength="6"
                      v-model="pass" required>
                  </div>
              </div>
              <div class="col-sm">
                  <label class="form-label" for="confpass">Confirmar Contraseña</label> <i class="req">*</i>
                  <div class="input-group">
                    <span class="input-group-text">
                      <fa icon="lock" />
                    </span>
                    <input type="password" class="form-control form-control-sm" id="confpass" autocomplete="off"
                      minlength="6" v-model="confpass" required>
                  </div>
              </div>
            </div>
            <div class="row justify-content-lg-center" v-if="adminuser">
              <div class="col-sm">
                  <label class="form-label">Tipo de Usuario</label> <i class="req">*</i>
                  <div class="input-group">
                    <span class="input-group-text">
                      <fa icon="list-alt" />
                    </span>
                    <select class="form-select form-select-sm" v-model="user.rol" required>
                      <option v-for="user in usertypes" v-bind:key="user.type" :value="user.type">
                        {{ user.name }}
                      </option>
                    </select>
                  </div>
              </div>
            </div>
            <hr>
            <button class="btn btn-outline-success" type="submit">
              <fa v-if="adminuser" icon="user-plus" />
              {{ buttonlb }}
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
    
    <div class="col align-self-end" v-if="error">
      <div class="alert alert-danger shadow-lg p-3 mb-5 rounded my-float" role="alert">
        <h4 class="alert-heading">{{ this.erroralert.title }}</h4>
        <label>{{ this.erroralert.message }}</label>
      </div>
    </div>
    <div class="col align-self-end" v-if="success">
      <div class="alert alert-success shadow-lg rounded my-float" role="alert">
        <h4 class="alert-heading">Listo!</h4>
        <label>Estás registrado correctamente.</label>
        <hr>
        <label class="mb-0">Hemos enviado un correo electrónico para tu verificación.</label>
      </div>
    </div>
  </div>
</template>
  
<script>
import doclist from "@/store/parameters/documentstypes.json";
import userlist from "@/store/parameters/userstypes.json";
import { myCollections } from "@/store/constants/firebaseCollections.js";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/init';

export default {
  name: "CreateUpdateUserComponent",
  data() {
    return {
      erroralert: {
        title: "",
        message: "",
      },
      titlelb: "Registro de Usuario",
      buttonlb: "Registrarme",
      adminuser: false,
      success: false,
      error: false,
      pass: "",
      confpass: "",
      user: {
        name: "",
        email: "",
        tdoc: "",
        doc: "",
        cel: "",
        address: "",
        rol: 3,
        uid: "",
      },
    };
  },
  computed: {
    doctypes() {
      return doclist.map((doc) => doc);
    },
    usertypes() {
      return userlist.map((user) => user);
    }
  },
  watch: {
    success(val) {
      setTimeout(() => {
        if (val) this.success = false;
        this.$router.push({ name: 'home' });
        location.reload();
      }, 4000);
    },
    error(val) {
      setTimeout(() => {
        if (val) this.error = false;
      }, 3000);
    },
  },
  created() {
    //if (this.$store.state.userdata.data.rol === 1) {
    this.adminuser = true;
    this.buttonlb = "Agregar Usuario";
    this.titlelb = "Agregar un Usuario"
    //}
  },
  mounted() {
    /*const popover = new Popover('.popover-dismiss', {
      trigger: 'focus'
    });*/

    // eslint-disable-next-line no-undef
    /* $('#infoConPop').popover({
       container: 'body',
       delay: {"show": 200, "hide": 200},
       title: 'Parámetros Contraseña',
       content: 'Debe tener mínimo 6 caracteres.'
     });
     // eslint-disable-next-line no-undef
     $('#infoDirPop').popover({
       container: 'body',
       delay: {"show": 200, "hide": 200},
       title: 'Parámetros Dirección',
       content: 'Por favor ingrese su dirección completa, incluyendo apartamento y/o torre.'
     });*/
  },
  methods: {
    checkPass() {
      if (this.pass === this.confpass) {
        this.signup();
      } else {
        this.erroralert.title = "Contraseña no verificada";
        this.erroralert.message = "Por favor verifique que las contraseñas coincidan";
        this.error = true;
      }
    },
    async signup() {
      const userCollection = collection(db, myCollections.USER_COLLECTION);
      await addDoc(userCollection, this.user)
      .then ((user) => {
        console.log(user);
        this.success = true;
        this.cleanForm();
      });

      /* firebase.auth().languageCode = "es";
       firebase
           .auth()
           .createUserWithEmailAndPassword(this.user.email, this.pass)
           .then((user) => {
             this.user.uid = user.user.uid;
             firebase.firestore().collection('users').doc(user.user.uid).set(this.user);
             // update user
             user.user
                 .updateProfile({
                   displayName: this.user.name
                 }).then(() => {
               this.success = true;
               this.cleanForm();
             }).catch((error) => {
               console.log(error);
             });
 
             //send verification email
             user.user
                 .sendEmailVerification();
           })
           .catch(error => {
             console.log("Failed!", error);
             if (error.code === "auth/email-already-in-use") {
               this.erroralert.title = "Ups!";
               this.erroralert.message = "Este correo ya se encuentra registrado.";
             } else {
               this.erroralert.title = "Ups!";
               this.erroralert.message = "Hubo un problema al hacer el registro, por favor intentalo de nuevo más tarde.";
             }
             this.error = true;
           });*/
    },
    cleanForm() {
      this.user.name = "";
      this.user.email = "";
      this.pass = "";
      this.confpass = "";
      this.user.doc = "";
      this.user.tdoc = "";
      this.user.cel = "";
      this.user.address = "";
    }
  }
}
</script>
  
<style>
.back {
  color: #879f2d;
}

.req {
  color: red;
}

.my-float {
  position: fixed;
  bottom: 40px;
  right: 40px;
}

.popover-noos {
  color: #6c757d;
}

.custom-popover {
  --bs-popover-max-width: 200px;
  --bs-popover-border-color: var(--bs-primary);
  --bs-popover-header-bg: var(--bs-primary);
  --bs-popover-header-color: var(--bs-white);
  --bs-popover-body-padding-x: 1rem;
  --bs-popover-body-padding-y: .5rem;
}
</style>