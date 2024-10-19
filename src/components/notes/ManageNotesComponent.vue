<template>
  <div style="max-width: 90%">
    <div class="table-responsive shadow-lg p-3 mb-5 bg-white rounded">
      <div class="card">
        <div class="card-header">
          <div class="row mt-1 mb-1">
            <div class="col-3">
              <h5 class="card-title mt-2" style="align-content: flex-start;">
                <router-link class="back" :to="{ path: 'notes' }" title="Regresar">
                  <fa icon="arrow-circle-left" />
                </router-link> &nbsp;
                <strong>Observaciones</strong>
              </h5>
            </div>
            <div class="col-md-4"></div>
            <div class="col-sm justify-content-lg-right">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Digite una sección o curso"
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
                <td>{{ n.section.description }}</td>
                <td>{{ n.course.description }}</td>
                <td>{{ n.title }}</td>
                <td>{{ n.description }}</td>
                <td class="text-center">
                  <a class="edit mx-2" title="Editar Observación" @click="openEdit(n)" data-bs-toggle="modal"
                    data-bs-target="#editUserModal">
                    <fa icon="user-edit" />
                  </a>
                  <a class="delete mx-2" title="Eliminar Observación" @click="delNote(n)">
                    <fa icon="user-minus" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <section class="modal fade" id="editNoteModal" data-keyboard="true" tabindex="-1" role="dialog"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <section class="modal-dialog modal-dialog-centered modal-lg">
        <section class="modal-content">
          <section class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              <fa icon="user-edit" /> &nbsp; <strong>Editar observación</strong>
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </section>
          <section class="modal-body">
            <create-update-notes-component :noteData="noteData" @updateDone="updateDone()" />
          </section>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
import CreateUpdateNotesComponent from './CreateUpdateComponent.vue'
import NotesServices from '@/common/services/note/NotesServices.js';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

export default {
  name: "ManageNotesComponent",
  components: {
    CreateUpdateNotesComponent,
  },
  data() {
    return {
      notesList: [],
      noteData: {},
      search: "",
      isUpdate: false,
      modal: null,
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    getList() {
      return this.notesList.filter((item) => item.section?.description?.toLowerCase().includes(this.search.toLowerCase()) || item.course?.description?.toLowerCase().includes(this.search.toLowerCase()));
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal('#editNoteModal', {});
  },
  methods: {
    async loadData() {
      this.notesList = [];
      NotesServices.getAll()
        .then((notes => {
          notes.forEach((note) => {
            this.notesList.push({ ...note.data(), id: note.id });
          });
        }));;
    },
    openEdit(note) {
      this.noteData = { ...note };
    },
    delNote(doc) {
      Swal.fire({
        title: 'Espera!',
        text: "No será posible revertir este cambio!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: 'DimGray',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          NotesServices.delete(doc.id)
            .then(() => {
              Swal.fire(
                'Eliminado!',
                'La observación ha sido eliminada',
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