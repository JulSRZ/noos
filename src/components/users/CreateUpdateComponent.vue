<template>
  <div class="card shadow-lg bg-white rounded">
    <div class="card-body">
      <h4 class="card-title" v-if="!editUser">
        <router-link class="back" :to="{ name: 'users' }" title="Regresar">
          <fa icon="arrow-circle-left" />
        </router-link> &nbsp;
        <strong>{{ titlelb }}</strong>
      </h4>
      <h6 class="card-subtitle text-muted" style="text-align: center;">Recuerde que <i class="req">*</i> son campos
        obligatorios</h6>
      <form @submit.prevent="checkPass">
        <div class="card-body">
          <div class="row">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title card-title-noos">Información Personal</h5>
                <div class="row">
                  <div class="col-sm">
                    <label class="form-label label-title" for="docType">Tipo de Documento</label> <i class="req">*</i>
                    <div class="input-group">
                      <span class="input-group-text">
                        <fa icon="list-alt" />
                      </span>
                      <select class="form-select" id="docType" v-model="user.tdoc" required :disabled="editUser == true">
                        <option v-for="doc in doctypes" v-bind:key="doc.id" :value="doc">
                          {{ doc.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-sm">
                    <label class="form-label label-title" for="doc">Documento de Identidad</label> <i class="req">*</i>
                    <div class="input-group">
                      <span class="input-group-text">
                        <fa icon="address-card" />
                      </span>
                      <input type="text" class="form-control" id="doc" autocomplete="off" v-model="user.doc" required
                        :disabled="editUser == true">
                    </div>
                  </div>
                  <div class="col-sm">
                    <label class="form-label label-title" for="username">Nombre Completo</label> <i class="req">*</i>
                    <div class="input-group">
                      <span class="input-group-text">
                        <fa icon="user" />
                      </span>
                      <input type="text" class="form-control" id="username" autocomplete="off" v-model="user.name"
                        required>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title card-title-noos">Información de Contacto</h5>
                <div class="row">
                  <div class="col-sm">
                    <label class="form-label label-title" for="email">E-mail</label> <i class="req">*</i>
                    <div class="input-group">
                      <span class="input-group-text">
                        <fa icon="envelope" />
                      </span>
                      <input type="email" class="form-control" id="email" placeholder="name@correo.com" autocomplete="off"
                        v-model="user.email" required>
                    </div>
                  </div>
                  <div class="col-sm">
                    <label class="form-label label-title" for="cel">Celular</label> <i class="req">*</i>
                    <div class="input-group">
                      <span class="input-group-text">
                        <fa icon="phone-square" />
                      </span>
                      <input type="tel" class="form-control" id="cel" autocomplete="off" maxlength="10" v-model="user.cel"
                        required>
                    </div>
                  </div>
                  <div class="col-sm">
                    <label class="form-label label-title" for="dir">Dirección</label> <i class="req">*</i>
                    <a id="infoDirPop" tabindex="0" class="btn btn-sm btn-link infocol" role="button"
                      data-toggle="popover" data-trigger="focus" style="color: #6c757d">
                      <fa icon="info-circle" />
                    </a>
                    <div class="input-group">
                      <span class="input-group-text">
                        <fa icon="map-marker-alt" />
                      </span>
                      <input type="text" class="form-control" id="dir" placeholder="Calle 1 # 2 - 3 Apto:123"
                        autocomplete="off" v-model="user.address" required>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-3" v-if="!this.editUser">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title card-title-noos">Seguridad</h5>
                <div class="row">
                  <div class="col-sm">
                    <label class="form-label label-title" for="pass">Contraseña</label> <i class="req">*</i>
                    <a id="infoConPop" tabindex="0" class="btn btn-sm btn-link infocol" role="button"
                      data-toggle="popover" data-trigger="focus" style="color: #6c757d">
                      <fa icon="info-circle" />
                    </a>
                    <div class="input-group">
                      <span class="input-group-text">
                        <fa icon="unlock" />
                      </span>
                      <input type="password" class="form-control" id="pass" autocomplete="off" minlength="6"
                        v-model="pass" required>
                    </div>
                  </div>
                  <div class="col-sm">
                    <label class="form-label label-title" for="confpass">Confirmar Contraseña</label> <i class="req">*</i>
                    <div class="input-group">
                      <span class="input-group-text">
                        <fa icon="lock" />
                      </span>
                      <input type="password" class="form-control" id="confpass" autocomplete="off" minlength="6"
                        v-model="confpass" required>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title card-title-noos">Información del Role</h5>
                <div class="row">
                  <div class="col-sm">
                    <label class="form-label label-title">Tipo de Usuario</label> <i class="req">*</i>
                    <div class="input-group">
                      <span class="input-group-text">
                        <fa icon="list-alt" />
                      </span>
                      <select class="form-select" v-model="user.role" required>
                        <option v-for="userType in usertypes" v-bind:key="userType.id" :value="userType">
                          {{ userType.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-sm" v-if="user.role.id == 5">
                    <label class="form-label label-title">Curso</label> <i class="req">*</i>
                    <div class="input-group">
                      <span class="input-group-text">
                        <fa icon="graduation-cap" />
                      </span>
                      <select class="form-select" v-model="user.course" required>
                        <option v-for="course in courses" v-bind:key="course.code" :value="course">
                          {{ course.description }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-sm" v-if="user.role.id == 3 || user.role.id == 4">
                    <div class="d-grid gap-2 mt-4" style="max-width: 95%;">
                      <button type="button" class="btn btn-primary position-relative" @click="openModal(user.role.id)">
                        <fa :icon="user.role.id == 3 ? 'graduation-cap' : 'people-group'" /> &nbsp;
                        <span> {{ editUser ? (user.role.id == 3 ? 'Editar Cursos' : 'Editar Hijos') :
                          (user.role.id == 3 ? 'Agregar Cursos' : 'Agregar Hijos') }} </span>
                        <span v-if="user.role.id == 4"
                          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {{ user?.parents ? user.parents.length : 0 }} Asignados
                        </span>
                        <span v-if="user.role.id == 3"
                          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {{ user?.courses ? user.courses.length : 0 }} Asignados
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer" style="background-color: white; text-align: center;">
          <button class="btn btn-outline-success" type="submit">
            <fa :icon="adminuser ? 'user-plus' : !editUser ? 'plus' : 'edit'" />
            {{ buttonlb }}
          </button>
        </div>
      </form>
    </div>
  </div>
  <manage-parents-component :parents="parentsList" :isViewOnly="false" :isEdit="editUser"
    @parentEvent="parentEvent($event)" />
  <manage-courses-component :courses="user.courses" :isViewOnly="false" :isEdit="editUser"
    @coursesEvent="courseEvent($event)" />
</template>
  
<script>
import ManageParentsComponent from './components/ManageParentsComponent.vue';
import ManageCoursesComponent from './components/ManageCoursesComponent.vue';
import UserServices from '@/common/services/user/UsersServices.js';
import doclist from "@/store/parameters/documentstypes.json";
import userlist from "@/store/parameters/userstypes.json";
import coursesList from "@/store/parameters/courses.json";
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

export default {
  name: 'CreateUpdateUserComponent',
  components: {
    ManageParentsComponent,
    ManageCoursesComponent
  },
  props: {
    userdata: {},
  },
  emits: ['updateDone'],
  data() {
    return {
      titlelb: '',
      buttonlb: '',
      adminuser: false,
      editUser: false,
      pass: '',
      confpass: '',
      parentModal: null,
      coursesModal: null,
      updateDoneEmit: null,
      user: {
        id: '',
        name: '',
        email: '',
        tdoc: {
          id: '',
          name: ''
        },
        doc: '',
        cel: '',
        address: '',
        role: {
          id: 1,
          name: ''
        },
        uid: '',
        course: {},
        courses: [],
        parents: []
      },
      parentsList: []
    };
  },
  computed: {
    doctypes() {
      return doclist.map((doc) => doc);
    },
    usertypes() {
      return userlist.map((user) => user);
    },
    courses() {
      return coursesList.map((course) => course);
    }
  },
  created() {
    this.buttonlb = "Agregar Usuario";
    this.titlelb = "Agregar un Usuario";
  },
  mounted() {
    this.parentModal = new bootstrap.Modal('#parentsModal', {});
    this.coursesModal = new bootstrap.Modal('#coursesModal', {});

    //this.updateDoneEmit = defineEmits(["updateDone"]);

    new bootstrap.Popover('#infoDirPop', {
      container: 'body',
      delay: { "show": 200, "hide": 200 },
      title: 'Parámetros Dirección',
      content: 'Por favor ingrese su dirección completa, incluyendo apartamento y/o torre.',
      animation: true,
      trigger: 'focus',
      customClass: 'custom-popover'
    })

    new bootstrap.Popover('#infoConPop', {
      container: 'body',
      delay: { "show": 200, "hide": 200 },
      title: 'Parámetros Contraseña',
      content: 'Debe tener mínimo 6 caracteres.',
      animation: true,
      trigger: 'focus',
      customClass: 'custom-popover'
    })
  },
  watch: {
    userdata: function (newValue) {
      if (newValue) {
        this.user = this.userdata;
        this.parentsList = this.userdata.parents;
        this.editUser = true;
        this.buttonlb = "Editar Usuario";
      }
    }
  },
  methods: {
    openModal(roleId) {
      if (roleId == 4)
        this.parentModal.show();
      if (roleId == 3)
        this.coursesModal.show();
    },
    parentEvent(event) {
      this.user.parents = event;
      this.parentModal.hide();
    },
    courseEvent(event) {
      this.user.courses = event;
      this.coursesModal.hide();
    },
    checkPass() {
      if (this.pass === this.confpass) {
        this.send();
      } else {
        this.erroralert.title = "Contraseña no verificada";
        this.erroralert.message = "Por favor verifique que las contraseñas coincidan";
        this.error = true;
      }
    },
    async send() {
      Swal.fire({
        title: 'Seguro?',
        text: this.editUser ? 'Se actualizara el usuario' : 'Se agregara un nuevo usuario',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#42b983',
        cancelButtonColor: '#d33',
        confirmButtonText: this.editUser ? 'Si, actualizarlo!' : 'Si, crearlo!',
        showLoaderOnConfirm: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.confirmSend().then(() => {
            Swal.fire({
              title: this.editUser ? 'Actualizado!' : 'Creado!',
              text: this.editUser ? 'El usuario ha sido actualizado' : 'El usuario ha sido creado',
              icon: 'success',
              confirmButtonColor: '#42b983'
            });
            if (this.editUser)
              this.$emit('updateDone');
            else
              this.cleanForm();
          })
        }
      });
    },
    async confirmSend() {
      return new Promise(resolve => {
        if (this.editUser)
          UserServices.update(this.user).then(() => resolve());
        else
          UserServices.create(this.user).then(() => resolve());
      });
    },
    cleanForm() {
      this.user.name = '';
      this.user.email = '';
      this.pass = '';
      this.confpass = '';
      this.user.doc = '';
      this.user.tdoc = '';
      this.user.cel = '';
      this.user.address = '';
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
  --bs-popover-border-color: #879f2d;
  --bs-popover-header-bg: #879f2d;
  --bs-popover-header-color: var(--bs-white);
  --bs-popover-body-padding-x: 1rem;
  --bs-popover-body-padding-y: .5rem;
}

.label-title {
  color: dimgray;
  font-size: small;
}

.card-title-noos {
  font-weight: bolder;
  color: #879f2d;
}
</style>