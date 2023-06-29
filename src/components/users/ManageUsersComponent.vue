<template>
  <div style="max-width: 90%">
    <div class="table-responsive shadow-lg p-3 mb-5 bg-white rounded">
      <div class="card">
        <div class="card-header">
          <div class="row mt-1 mb-1">
            <div class="col-3">
              <h5 class="card-title mt-2" style="align-content: flex-start;">
                <router-link class="back" :to="{ name: 'users' }" title="Regresar">
                  <fa icon="arrow-circle-left" />
                </router-link> &nbsp;
                Administración de Usuarios
              </h5>
            </div>
            <div class="col-md-4"></div>
            <div class="col-sm justify-content-lg-right">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Digita el correo electrónico del usuario"
                  aria-label="Recipient's username" aria-describedby="basic-addon2" id="search" v-model="search">
                <span class="input-group-text search">
                  <fa icon="search" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-hover table-sm table-striped">
            <thead class="back">
              <tr>
                <th scope="col">Tipo Documento</th>
                <th scope="col">Documento</th>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Dirección</th>
                <th scope="col">Celular</th>
                <th scope="col">Tipo</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="u in getlist" v-bind:key="u.doc">
                <td>{{ u.tdoc.id }} - {{ u.tdoc.name }}</td>
                <td>{{ u.doc }}</td>
                <td>{{ u.name }}</td>
                <td>{{ u.email }}</td>
                <td>{{ u.address }}</td>
                <td>{{ u.cel }}</td>
                <td>{{ u.role.name }} </td>
                <td v-if="u.uid != $store.state.userdata.data.uid" class="text-center">
                  <a title="Editar Usuario" class="edit" @click="openEdit(u)" data-bs-toggle="modal"
                    data-bs-target="#editUserModal">
                    <fa icon="user-edit" />
                  </a>
                  <a class="delete mx-4" title="Eliminar Usuario" @click="delUser(u)">
                    <fa icon="user-minus" />
                  </a>
                </td>
                <td v-else>
                  Mi usuario
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="modal fade" id="editUserModal" data-keyboard="true" tabindex="-1" role="dialog"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              <fa icon="user-edit" /> &nbsp; Editar Usuario
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <create-update-user-component :userdata="userdata" @updateDone="updateDone" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserServices from '@/common/services/user/UsersServices.js';
import Swal from 'sweetalert2';
import CreateUpdateUserComponent from './CreateUpdateComponent.vue'
import * as bootstrap from 'bootstrap';

export default {
  name: "ManageUsersComponent",
  components: {
    CreateUpdateUserComponent
  },

  data() {
    return {
      userslist: [],
      titlelb: "",
      userdata: {},
      search: "",
      isUpdate: false,
      modal: null
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    getlist() {
      return this.userslist.filter((item) => item.email.toLowerCase().includes(this.search.toLowerCase()));
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal('#editUserModal', {})
  },
  methods: {
    async loadData() {
      this.userslist = [];
      UserServices.getAll()
        .then((usersList => {
          usersList.forEach((user) => {
            this.userslist.push({ ...user.data(), id: user.id });
          });
        }));;
    },
    openEdit(user) {
      this.userdata = { ...user };
    },
    delUser(doc) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: 'DimGray',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          UserServices.delete(doc.id)
            .then(() => {
              Swal.fire(
                'Deleted!',
                'The user has been deleted',
                'success'
              )
                .then(() => this.loadData());
            });
        }
      });
    },
    updateDone() {
      this.modal.hide();
      this.loadData();
    }
  }
}
</script>

<style scoped>
.back {
  color: #879f2d;
}

.edit {
  color: #2c69aa;
  cursor: pointer;
}

.delete {
  color: red;
  cursor: pointer;
}

.my-float {
  position: fixed;
  bottom: 40px;
  right: 40px;
}

.search {
  background-color: #6c757d;
  color: white;
}
</style>