<template>
  <div class="card shadow-lg bg-white rounded  card-container">
    <div class="card-body">
      <h4 class="card-title" v-if="!editNote">
        <router-link class="back" :to="{ path: 'notes' }" title="Regresar">
          <fa icon="arrow-circle-left" />
        </router-link> &nbsp;
        <strong>{{ titlelb }}</strong>
      </h4>
      <h6 class="card-subtitle text-muted" style="text-align: center;">Recuerde que <i class="req">*</i> son campos
        obligatorios</h6>
      <form @submit.prevent="preSend">
        <section class="card-body">
          <section class="row">
            <section class="card">
              <section class="card-body">
                <h5 class="card-title card-title-noos">Información Curso(s)</h5>
                <section class="row">
                  <section class="col-sm-4">
                    <label class="form-label" for="sectionList">Secciones <i class="req">*</i></label>
                    <div class="input-group">
                      <select class="form-select" id="sectionList" v-model="section" required>
                        <option :value="{code: 'ALL', description: 'Todas'}" selected>Todas</option>
                        <option v-for="sect in getSections" :key="sect.code" :value="sect">
                          {{ sect.description }}
                        </option>
                      </select>
                    </div>
                  </section>
                  <section class="col-sm-4">
                    <label class="form-label" for="courseList">Cursos</label>
                    <div class="input-group">
                      <select class="form-select" id="courseList" v-model="course" required>
                        <option :value="{code: 'ALL', description: 'Todos'}" selected>Todos</option>
                        <option v-for="cour in getCourses" :key="cour.code" :value="cour">
                          {{ cour.description }}
                        </option>
                      </select>
                    </div>
                  </section>
                </section>
              </section>
            </section>
          </section>

          <section class="row mt-3">
            <section class="card">
              <section class="card-body">
                <h5 class="card-title card-title-noos">Observación</h5>
                <section class="col-sm">
                  <section class="col-sm">
                    <label class="form-label label-title" for="title">Titulo</label> <i class="req">*</i>
                    <div class="input-group">
                      <input type="text" class="form-control" id="title" placeholder="Aquí debe poner el titulo"
                        autocomplete="off" v-model="note.title" required />
                    </div>
                  </section>
                  <section class="col-sm">
                    <label class="form-label label-title" for="description">Descripción</label> <i class="req">*</i>
                    <div class="input-group">
                      <textarea class="form-control" id="description"
                        placeholder="Aquí debe poner las descripción de la observación..." autocomplete="off"
                        v-model="note.description" required></textarea>
                    </div>
                  </section>
                </section>
              </section>
            </section>
          </section>
        </section>
        <section class="card-footer" style="background-color: white; text-align: center;">
          <button class="btn btn-outline-success" type="submit">
            <fa :icon="adminuser ? 'user-plus' : !editNote ? 'plus' : 'edit'" />
            {{ buttonlb }}
          </button>
        </section>
      </form>
    </div>
  </div>
</template>

<script>
import NotesServices from '@/common/services/note/NotesServices.js';
import coursesList from "@/store/parameters/courses.json";
import Swal from 'sweetalert2';
import sectionsList from "@/store/parameters/sections.json";

export default {
  name: 'CreateUpdateNotesComponent',
  props: {
    noteData: {},
  },
  emits: ['updateDone'],
  data() {
    return {
      titlelb: '',
      buttonlb: '',
      adminuser: false,
      editNote: false,
      updateDoneEmit: null,
      note: {
        id: '',
        section: {
          code: '',
          description: '',
        },
        course: {
          code: '',
          description: '',
        },
        title: '',
        description: '',
      },
      section: {
        code: 'ALL',
        description: 'Todas'
      },
      course: {
        code: 'ALL',
        description: 'Todos'
      }
    };
  },
  computed: {
    getSections() {
      return sectionsList;
    },
    getCourses() {
      return coursesList.filter((item) => {
        return this.section.code === 'ALL' || item.section.code === this.section.code;
      });
    }
  },
  created() {
    this.buttonlb = "Agregar observación";
    this.titlelb = "Agregar una observación";
  },
  watch: {
    noteData(newValue) {
      if (newValue) {
        this.note = { ...newValue };
        this.section = newValue.section;
        this.course = newValue.course;
        this.buttonlb = "Editar Observación";
        this.editNote = true;
      }
    }
  },
  methods: {
    preSend() {
      this.note.course = this.course;
      this.note.section = this.section;
      this.send();
    },
    async send() {
      Swal.fire({
        title: 'Espera!',
        text: this.editNote ? 'Se actualizará la observación' : 'Se agregará una nueva observación',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#42b983',
        cancelButtonColor: '#d33',
        confirmButtonText: this.editNote ? 'Sí, actualizarla!' : 'Sí, crearla!',
        showLoaderOnConfirm: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.confirmSend().then(() => {
            Swal.fire({
              title: this.editNote ? 'Actualizado!' : 'Creado!',
              text: this.editNote ? 'La observación ha sido actualizada' : 'La observación ha sido creada',
              icon: 'success',
              confirmButtonColor: '#42b983'
            });
            if (this.editNote)
              this.$emit('updateDone');
            else
              this.cleanForm();
          });
        }
      });
    },
    async confirmSend() {
      return new Promise(resolve => {
        if (this.editNote)
          NotesServices.update(this.note).then(() => resolve());
        else
          NotesServices.create(this.note).then(() => resolve());
      });
    },
    cleanForm() {
      this.note.title = '';
      this.note.description = '';
      this.note.section = '';
      this.note.course = '';
      this.course = {code: 'ALL', description: 'Todos'};
      this.section = {code: 'ALL', description: 'Todas'};
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

.label-title {
  color: dimgray;
  font-size: small;
}

.card-title-noos {
  font-weight: bolder;
  color: #879f2d;
}

.card-container {
  width: 90%;
}
</style>