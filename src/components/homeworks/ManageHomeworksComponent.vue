<template>
  <div style="max-width: 90%">
    <div class="table-responsive shadow-lg p-3 mb-5 bg-white rounded">
      <div class="card">
        <div class="card-header">
          <div class="row mt-1 mb-1">
            <div class="col-3">
              <h5 class="card-title mt-2" style="align-content: flex-start;">
                <router-link class="back" :to="{ path: 'homeworks' }" title="Regresar">
                  <fa icon="arrow-circle-left" />
                </router-link> &nbsp;
                <strong>Tareas</strong>
              </h5>
            </div>
            <div class="col-md-4"></div>
            <div class="col-sm justify-content-lg-right">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Digita el número de documento del usuario"
                  aria-label="Recipient's username" aria-describedby="basic-addon2" id="search" v-model="search">
                <span class="input-group-text search">
                  <fa icon="search" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body" style="text-align: center;">
          <table class="table table-hover table-sm table-striped">
            <thead class="back">
              <tr>
                <th scope="col">Sección</th>
                <th scope="col">Curso</th>
                <th scope="col">Título</th>
                <th scope="col">Descripción</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="n in getList" v-bind:key="n.id">
                <td>{{ n.section.description ?? 'Todos' }}</td>
                <td>{{ n.course.description ?? 'Todos' }}</td>
                <td>{{ n.title }}</td>
                <td>{{ n.description }}</td>
                <td class="text-center">
                  <a class="edit mx-2" title="Editar Observación" @click="openEdit(n)" data-bs-toggle="modal"
                    data-bs-target="#editUserModal">
                    <fa icon="user-edit" />
                  </a>
                  <a class="delete mx-2" title="Eliminar Observación" @click="delHomework(n)">
                    <fa icon="user-minus" />
                  </a>
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
              <fa icon="user-edit" /> &nbsp; <strong>Editar Usuario</strong>
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <!-- <div class="modal-body">
            <create-update-component :userdata="userdata" @updateDone="updateDone()" />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeworksServices from '@/common/services/homeworks/HomeworksServices.js';
import CreateUpdateComponent from './CreateUpdateComponent.vue';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

export default {
  name: "ManageHomeworksComponent",
  components: {
    CreateUpdateComponent
  },
  data() {
    return {
      notesList: [],
      titlelb: "",
      userdata: {},
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
      // return this.notesList.filter((item) => item.doc.toLowerCase().includes(this.search.toLowerCase()));
      return this.notesList;
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal('#editUserModal', {});
    //this.parentModal = new bootstrap.Modal('#testModal', {});
  },
  methods: {
    async loadData() {
      this.notesList = [];
      HomeworksServices.getAll()
        .then((notes => {
          notes.forEach((note) => {
            this.notesList.push({ ...note.data(), id: note.id });
          });
        }));;
    },
    parentEvent() {
      this.parentModal.hide();
    },
    viewOnlyEvent() {
      this.parentModal.hide();
    },
    openView(user) {
      this.parentsView = [ ...user.parents ];
      this.parentModal.show();
    },
    openEdit(user) {
      this.userdata = { ...user };
    },
    delHomework(doc) {
      Swal.fire({
        title: 'Espera!',
        text: "Esta acción no sera reversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: 'DimGray',
        confirmButtonText: 'Si, eliminarla!'
      }).then((result) => {
        if (result.isConfirmed) {
          HomeworksServices.delete(doc.id)
            .then(() => {
              Swal.fire(
                'Deleted!',
                'LA tarea ha sido creada!',
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