<template>
  <div class="card shadow-lg bg-white rounded">
    <div class="card-body">
      <h5 class="card-title" v-if="!editUser">
        <router-link class="back" :to="{ name: 'financial' }" title="Regresar">
          <fa icon="arrow-circle-left" />
        </router-link>
        {{ titlelb }}
      </h5>
      <h6 class="card-subtitle mb-2 text-muted">Recuerde que <i class="req">*</i> son campos obligatorios</h6>
      <form @submit.prevent="checkPass">
        <div class="card-body">
          <div class="row">
            <div class="col-6">
              <div class="input-group">
                <input type="text" class="form-control" maxlength="11" placeholder="Documento del Representante Legal"
                  aria-label="Recipient's username" aria-describedby="basic-addon2" id="search" v-model="search">
                <button class="input-group-text search" type="button" @click="searhClick" title="Buscar Representante">
                  <fa icon="search" />
                </button>
              </div>
            </div>
            <div class="col-2" v-if="this.newBill?.attendant != null">
              <button class="btn btn-warning" type="button" @click="reset">
                <fa icon="repeat" />
                Limpiar
              </button>
            </div>
          </div>
          <div class="row mt-3" v-if="this.newBill?.attendant != null">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title card-title-noos">Información de la Cuenta
                </h5>
                <div class="row">
                  <div class="col-sm">
                    <label class="form-label label-title">Fecha de Creación</label>
                    <div class="div-label">
                      <label class="mx-2 label-data" type="text">
                        {{ this.newBill?.creationDate }}
                      </label>
                    </div>
                  </div>
                  <div class="col-sm">
                    <label class="form-label label-title">Última Fecha de Pago</label>
                    <div class="div-label">
                      <label class="mx-2 label-data" type="text">
                        {{ this.newBill?.lastDatePayment }}
                      </label>
                    </div>
                  </div>
                  <div class="col-sm">
                    <label class="form-label label-title">Estado</label>
                    <div class="div-label">
                      <label class="mx-2 label-data" type="text">
                        {{ this.newBill?.state.description }}
                      </label>
                    </div>
                  </div>
                  <div class="col-sm">
                    <label class="form-label label-title">Días en Mora</label>
                    <div class="div-label">
                      <label class="mx-2 label-data" type="text">
                        {{ this.newBill?.daysPastDue }}
                      </label>
                    </div>
                  </div>
                  <div class="col-sm">
                    <label class="form-label label-title">Monto de Mora</label>
                    <div class="div-label">
                      <label class="mx-2 label-data" type="text">
                        {{ this.newBill?.amountPastDue }}
                      </label>
                    </div>
                  </div>
                  <div class="col-sm">
                    <label class="form-label label-title">Monto Total</label>
                    <div class="div-label">
                      <label class="mx-2 label-data" type="text">
                        {{ this.newBill?.totalAmount }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3" v-if="this.newBill?.attendant != null">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title card-title-noos">Información del Representante Legal
                </h5>
                <div class="row">
                  <div class="col-sm">
                    <label class="form-label label-title">Tipo de Documento</label>
                    <div class="div-label">
                      <label class="mx-2 label-data" type="text">
                        {{ this.newBill?.attendant?.tdoc.id }} - {{ this.newBill?.attendant?.tdoc.name }}
                      </label>
                    </div>
                  </div>
                  <div class="col-sm">
                    <label class="form-label label-title">Documento</label>
                    <div class="div-label">
                      <label class="mx-2 label-data" type="text">{{ this.newBill?.attendant?.doc }}</label>
                    </div>
                  </div>
                  <div class="col-sm">
                    <label class="form-label label-title">Nombre</label>
                    <div class="div-label">
                      <label class="mx-2 label-data" type="text">{{ this.newBill?.attendant?.name }}</label>
                    </div>
                  </div>
                  <div class="col-sm">
                    <label class="form-label label-title">Email</label>
                    <div class="div-label">
                      <label class="mx-2 label-data" type="text">{{ this.newBill?.attendant?.email }}</label>
                    </div>
                  </div>
                  <div class="col-sm">
                    <label class="form-label label-title">Celular</label>
                    <div class="div-label">
                      <label class="mx-2 label-data" type="text">{{ this.newBill?.attendant?.cel }}</label>
                    </div>
                  </div>
                  <div class="col-sm">
                    <label class="form-label label-title">Dirección</label>
                    <div class="div-label">
                      <label class="mx-2 label-data" type="text">{{ this.newBill?.attendant?.address }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3" v-if="this.newBill?.attendant != null">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title card-title-noos">Información de (los) Hijo(s)</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                  content.</p>
              </div>
            </div>
          </div>
          <div class="row mt-3" v-if="this.newBill?.attendant != null">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title card-title-noos">Adjuntar Archivo</h5>
                <div>
                  <input class="form-control form-control-sm" id="formFileLg" type="file" title="Buscar Archivo">
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3" style="text-align: center;" v-if="this.newBill?.attendant == null">
            <fa icon="search" style="color: dimgray; font-size: 60px; margin-bottom: 15px;" />
            <h3 style="color: dimgray;">Debe buscar a un acudiente por el número de documento</h3>
          </div>
        </div>
        <div class="card-footer" style="background-color: white; text-align: center;">
          <button class="btn btn-outline-success" style="text-align: center;" type="submit">
            <fa :icon="adminuser ? 'user-plus' : !editUser ? 'plus' : 'edit'" />
            {{ buttonlb }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
    
<script>
import UserServices from '@/common/services/user/UsersServices.js';
import doclist from "@/store/parameters/documentstypes.json";
import userlist from "@/store/parameters/userstypes.json";
import coursesList from "@/store/parameters/courses.json";
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';
import { format } from 'date-fns';

export default {
  name: 'CreateUpdateFinancialComponent',
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
      search: '',
      file: null,
      parentModal: null,
      coursesModal: null,
      updateDoneEmit: null,
      newBill: {
        attendant: null,
        creationDate: null,
        lastDatePayment: null,
        state: {
          code: 'P',
          description: 'PENDIENTE'
        },
        daysPastDue: 0,
        amountPastDue: 0,
        totalAmount: 1500000
      },
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
    this.buttonlb = "Agregar Factura";
    this.titlelb = "Agregar Nueva Factura";
    this.newBill.creationDate = format(Date.now(), 'dd/MM/yyyy');
    let lastDate = new Date;
    lastDate.setDate(lastDate.getDate() + 15);
    this.newBill.lastDatePayment = format(lastDate, 'dd/MM/yyyy');
  },
  mounted() {
  },
  watch: {
    userdata: function (newValue) {
      if (newValue) {
        this.user = this.userdata;
        this.parentsList = this.userdata.parents;
        this.editUser = true;
        this.buttonlb = "Editar Factura";
      }
    }
  },
  methods: {
    searhClick() {
      if (this.newBill.attendant != null) {
        Swal.fire({
          title: '¿Está seguro?',
          text: 'Perderá los cambios realizados!',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#42b983',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Limpiar!',
          showLoaderOnConfirm: true
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.newBill.attendant = null;
            this.searchUser();
          }
        });
      } else
        this.searchUser();

    },
    searchUser() {
      UserServices.getStudentByDoc(this.search)
        .then((result) => {
          if (result.size > 0) {
            result.forEach((user) => {
              this.newBill.attendant = user.data();
              console.log(this.newBill?.attendant, 'patern')
            });
          } else {
            Swal.fire({
              title: 'Estudiante No Encontrado',
              text: "Este estudiante no fue encontrado en el sistema!",
              icon: 'warning',
              confirmButtonColor: 'blue',
              confirmButtonText: 'Ok'
            });
          }
        });
    },
    reset() {
      Swal.fire({
        title: '¿Está seguro?',
        text: 'Perderá los cambios realizados!',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#42b983',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Limpiar!',
        showLoaderOnConfirm: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.search = '';
          this.newBill.attendant = null;
        }
      });
    },
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
        title: 'Are you sure?',
        text: this.editUser ? 'You will edit the user' : 'You will add a new user',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#42b983',
        cancelButtonColor: '#d33',
        confirmButtonText: this.editUser ? 'Yes, edit it!' : 'Yes, create it!',
        showLoaderOnConfirm: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.confirmSend().then(() => {
            Swal.fire({
              title: this.editUser ? 'Edited!' : 'Created!',
              text: this.editUser ? 'The user has been edited' : 'The user has been created',
              icon: 'success',
              confirmButtonColor: '#42b983'
            });
            if (this.editUser)
              //this.updateDoneEmit.$emit();
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

.search {
  background-color: #6c757d;
  color: white;
}

.label-title {
  color: dimgray;
  font-size: small;
}

.label-data {
  font-size: large;
}

.card-title-noos {
  font-weight: bolder;
  color: #879f2d;
}

.div-label {
  margin-top: -10px;
}
</style>