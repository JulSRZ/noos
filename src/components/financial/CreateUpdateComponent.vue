<template>
  <div class="card shadow-lg bg-white rounded">
    <div class="card-body">
      <h5 class="card-title" v-if="!editFinancial">
        <router-link class="back" :to="{ name: 'financial' }" title="Regresar">
          <fa icon="arrow-circle-left" />
        </router-link> &nbsp;
        <strong>{{ titlelb }}</strong>
      </h5>
      <h6 class="card-subtitle mb-2 text-muted">Recuerde que <i class="req">*</i> son campos obligatorios</h6>
      <form @submit.prevent="send()">
        <div class="card-body">
          <div class="row" v-if="!editFinancial">
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
                        {{ maskMoneyAmount(this.newBill?.amountPastDue || 0) }}
                      </label>
                    </div>
                  </div>
                  <div class="col-sm">
                    <label class="form-label label-title">Monto Total</label>
                    <div class="div-label">
                      <label class="mx-2 label-data" type="text">
                        {{ maskMoneyAmount(this.newBill?.totalAmount) }}
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
          <div class="row mt-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title card-title-noos">Información de (los) Hijo(s)</h5>
                <manage-financial-student-component :students="newBill?.attendant?.parents" :reset="resetDetail"
                  @detailReseted="resetDetailEvent()" @saveFinancialStudent="saveFinancialStudent($event)" />
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
        <div v-if="this.newBill?.attendant !== null" class="card-footer" style="background-color: white; text-align: center;">
          <button class="btn btn-outline-success" style="text-align: center;" type="button" @click="send()">
            <fa :icon="adminuser ? 'user-plus' : !editFinancial ? 'plus' : 'edit'" />
            {{ buttonlb }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
    
<script>
import UserServices from '@/common/services/user/UsersServices.js';
import FinancialServices from '@/common/services/financial/FinancialServices.js';
import ManageFinancialStudentComponent from './components/ManageFinancialStudentComponent.vue';
import { CFinancialStates } from '@/common/constants/financialStates';
import Swal from 'sweetalert2';
import { format } from 'date-fns';

export default {
  name: 'CreateUpdateFinancialComponent',
  components: {
    ManageFinancialStudentComponent,
  },
  emits: ['updateDone'],
  props: {
    financialState: {}
  },
  data() {
    return {
      parentTest: null,
      titlelb: '',
      buttonlb: '',
      adminuser: false,
      editFinancial: false,
      search: '',
      file: null,
      parentModal: null,
      coursesModal: null,
      updateDoneEmit: null,
      resetDetail: false,
      newBill: {
        attendant: null,
        creationDate: null,
        lastDatePayment: null,
        state: CFinancialStates.PENDING_STATE,
        daysPastDue: 0,
        totalAmount: 0,
        studentsBill: []
      }
    };
  },
  created() {
    this.buttonlb = "Agregar Factura";
    this.titlelb = "Agregar Nueva Factura";
    this.newBill.creationDate = format(Date.now(), 'dd/MM/yyyy');
    let lastDate = new Date;
    lastDate.setDate(lastDate.getDate() + 15);
    this.newBill.lastDatePayment = format(lastDate, 'dd/MM/yyyy');
  },
  watch: {
    financialState: function (newValue) {
      if (newValue) {
        console.log(this.financialState , 'this.financialState')
        this.newBill = this.financialState;
        this.newBill.studentsBill = this.financialState.studentBill;
        this.editFinancial = true;
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
            this.resetDetail = true;
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
              if (user.data().role.id === 4) {
                this.newBill.attendant = user.data();
              } else {
                Swal.fire({
                  title: 'Usuario No Acudiente',
                  text: "El usuario debe ser un acudiente!",
                  icon: 'warning',
                  confirmButtonColor: 'blue',
                  confirmButtonText: 'Ok'
                });
              }
            });
          } else {
            Swal.fire({
              title: 'Acudiente No Encontrado',
              text: "Este acudiente no fue encontrado en el sistema!",
              icon: 'warning',
              confirmButtonColor: 'blue',
              confirmButtonText: 'Ok'
            });
          }
        });
    },
    maskMoneyAmount(number) {
      const numberFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      return numberFormat.format(parseFloat(number));
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
          this.resetDetail = true;
        }
      });
    },
    resetDetailEvent() {
      this.resetDetail = false;
    },
    saveFinancialStudent(data) {
      console.log(data, 'DATA')
      this.newBill.studentsBill = data;
      this.newBill.totalAmount = 0;
      this.newBill.studentsBill.forEach((studentBill) => {
        this.newBill.totalAmount = Number.parseInt(this.newBill.totalAmount) + Number.parseInt(studentBill.total);
      });
    },
    async send() {
      console.log('send')
      Swal.fire({
        title: 'Espera!',
        text: this.editFinancial ? 'Actualizaras el estado financiero' : 'Crearas el estado financiero',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#42b983',
        cancelButtonColor: '#d33',
        confirmButtonText: this.editFinancial ? 'Si, actualizar!' : 'Si, crear!',
        showLoaderOnConfirm: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.confirmSend().then(() => {
            Swal.fire({
              title: this.editFinancial ? 'Actualizado!' : 'Creado!',
              text: this.editFinancial ? 'El estado financiero ha sido actualizado' : 'El estado financiero ha sido creado',
              icon: 'success',
              confirmButtonColor: '#42b983'
            });
            if (this.editFinancial)
              this.$emit('updateDone');
            else
              this.cleanForm();
          })
        }
      });
    },
    async confirmSend() {
      return new Promise(resolve => {
        if (this.editFinancial)
          FinancialServices.update(this.newBill).then(() => resolve());
        else
          FinancialServices.create(this.newBill).then(() => resolve());
      });
    },
    cleanForm() {
      this.newBill = {
        attendant: null,
        creationDate: null,
        lastDatePayment: null,
        state: CFinancialStates.PENDING_STATE,
        daysPastDue: 0,
        totalAmount: 0,
        studentsBill: []
      };
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

.div-label {
  margin-top: -10px;
}

.card-title-noos {
  font-weight: bolder;
  color: #879f2d;
}
</style>