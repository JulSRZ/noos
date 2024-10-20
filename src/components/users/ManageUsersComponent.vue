<template>
  <div style="max-width: 90%">
    <div class="table-responsive shadow-lg p-3 mb-5 bg-white rounded">
      <div class="card">
        <div class="card-header">
          <div class="row mt-1 mb-1">
            <div class="col-3">
              <h5 class="card-title mt-2" style="align-content: flex-start">
                <router-link class="back" :to="{ path: 'users' }" title="Regresar">
                  <fa icon="arrow-circle-left" />
                </router-link>
                &nbsp;
                <strong>Usuarios</strong>
              </h5>
            </div>
            <div class="col-md-4"></div>
            <div class="col-sm justify-content-lg-right">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Digita el número de documento del usuario"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  id="search"
                  v-model="search"
                />
                <span class="input-group-text search">
                  <fa icon="search" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body" style="text-align: center">
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
                <th scope="col">Curso</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="u in getList" v-bind:key="u.doc">
                <td>{{ u.tdoc.id }} - {{ u.tdoc.name }}</td>
                <td>{{ u.doc }}</td>
                <td>{{ u.name }}</td>
                <td>{{ u.email }}</td>
                <td>{{ u.address }}</td>
                <td>{{ u.cel }}</td>
                <td>{{ u.role.name }}</td>
                <td>{{ u.role.id == 5 ? u.course.description : "N/A" }}</td>
                <td class="text-center">
                  <!--a v-if="u.role.id != 1 && u.role.id != 2" class="view mx-2"
                    :title="u.role.id == 3 ? 'Ver Cursos' : u.role.id == 4 ? 'Ver Hijos' : 'Ver Padres'"
                    @click="openView(u)">
                    <fa icon="eye" />
                  </a-->
                  <a
                    class="edit mx-2"
                    title="Editar Usuario"
                    @click="openEdit(u)"
                    data-bs-toggle="modal"
                    data-bs-target="#editUserModal"
                  >
                    <fa icon="user-edit" />
                  </a>
                  <a class="delete mx-2" title="Eliminar Usuario" @click="delUser(u)">
                    <fa icon="user-minus" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="editUserModal"
      data-keyboard="true"
      tabindex="-1"
      role="dialog"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              <fa icon="user-edit" /> &nbsp; <strong>Editar Usuario</strong>
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <create-update-user-component :userData="userData" @updateDone="updateDone()" />
          </div>
        </div>
      </div>
    </div>
    <!--div class="modal fade" id="testModal" data-keyboard="true" tabindex="-1" role="dialog"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <manage-parents-component :parents="parentsView" :isViewOnly="true" @viewOnlyEvent="parentEvent()" />
    </div-->
  </div>
</template>

<script>
import UserServices from "@/common/services/user/UsersServices.js";
import Swal from "sweetalert2";
import CreateUpdateUserComponent from "./CreateUpdateComponent.vue";
import ManageParentsComponent from "./components/ManageParentsComponent.vue";
import * as bootstrap from "bootstrap";

export default {
  name: "ManageUsersComponent",
  components: {
    CreateUpdateUserComponent,
    ManageParentsComponent,
  },

  data() {
    return {
      usersList: [],
      titleLabel: "",
      userData: {},
      parentsView: [],
      search: "",
      isUpdate: false,
      modal: null,
      parentModal: null,
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    getList() {
      return this.usersList.filter((item) =>
        item.doc.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal("#editUserModal", {});
    //this.parentModal = new bootstrap.Modal('#testModal', {});
  },
  methods: {
    async loadData() {
      this.usersList = [];
      UserServices.getAll().then((usersList) => {
        usersList.forEach((user) => {
          this.usersList.push({ ...user.data(), id: user.id });
        });
      });
    },
    parentEvent() {
      this.parentModal.hide();
    },
    viewOnlyEvent() {
      this.parentModal.hide();
    },
    openView(user) {
      this.parentsView = [...user.parents];
      this.parentModal.show();
    },
    openEdit(user) {
      this.userData = { ...user };
    },
    delUser(doc) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "DimGray",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          UserServices.delete(doc.id).then(() => {
            Swal.fire("Deleted!", "The user has been deleted", "success").then(() =>
              this.loadData()
            );
          });
        }
      });
    },
    updateDone() {
      this.modal.hide();
      this.loadData();
    },
  },
};
</script>

<style scoped>
.back {
  color: #879f2d;
}

.view {
  color: dimgray;
  cursor: pointer;
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
