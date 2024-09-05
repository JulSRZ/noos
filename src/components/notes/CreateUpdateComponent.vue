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
        <section class="card-body">
          <section class="row">
            <section class="card">
              <div class="card-body">
                <h5 class="card-title card-title-noos">Información Curso(s)</h5>
                <section class="row">
                  <section class="col-sm-4">
                    <label class="form-label" for="sectionList">Secciones <i class="req">*</i></label>
                    <div class="input-group">
                      <select class="form-select" id="sectionList" v-model="section" required
                        :disabled="editUser == true">
                        <option :value="{ code: 'ALL' }" selected>Todas</option>
                        <option v-for="sect in getSections" v-bind:key="sect.code" :value="sect">
                          {{ sect.description }}
                        </option>
                      </select>
                    </div>
                  </section>
                  <section class="col-sm-4">
                    <label class="form-label" for="courseList">Cursos</label>
                    <div class="input-group">
                      <select class="form-select" id="courseList" v-model="course" required
                        :disabled="editUser == true">
                        <option :value="{ code: 'ALL' }" selected>Todos</option>
                        <option v-for="cour in getCourses" v-bind:key="cour.code" :value="cour">
                          {{ cour.description }}
                        </option>
                      </select>
                    </div>
                  </section>
                </section>
              </div>
            </section>
          </section>

          <section class="row mt-3">
            <section class="card">
              <section class="card-body">
                <h5 class="card-title card-title-noos">Observación</h5>
                <section class="row">
                  <div class="col-sm">
                    <label class="form-label label-title" for="email">Nota</label> <i class="req">*</i>
                    <div class="input-group">
                      <span class="input-group-text">
                        <fa icon="comment" />
                      </span>
                      <textarea type="text" class="form-control" id="email"
                        placeholder="Aquí debe poner las descripción de la observación..." autocomplete="off"
                        v-model="user.email" required />
                    </div>
                  </div>
                </section>
              </section>
            </section>
          </section>
        </section>
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
import ManageParentsComponent from '../users/components/ManageParentsComponent.vue';
import ManageCoursesComponent from '../users/components/ManageCoursesComponent.vue';
import UserServices from '@/common/services/user/UsersServices.js';
import doclist from "@/store/parameters/documentstypes.json";
import userlist from "@/store/parameters/userstypes.json";
import coursesList from "@/store/parameters/courses.json";
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';
import sectionsList from "@/store/parameters/sections.json";

export default {
  name: 'CreateUpdateNotesComponent',
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
      parentsList: [],
      section: {
        code: 'ALL'
      },
      course: {
        code: 'ALL'
      }
    };
  },
  computed: {
    doctypes() {
      return doclist.map((doc) => doc);
    },
    usertypes() {
      return userlist.map((user) => user);
    },
    getSections() {
      return sectionsList.map((section) => section);
    },
    getCourses() {
      return coursesList.map((course) => course).filter((item) => {
        if (this.section.code == 'ALL')
          return item;
        else
          return item.section.code == this.section.code
      });
    }
  },
  created() {
    this.buttonlb = "Agregar observación";
    this.titlelb = "Agregar una observación";
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