<template>
    <div class="modal fade" tabindex="-1" id="coursesModal" data-keyboard="true" role="dialog"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <fa icon="graduation-cap" /> &nbsp;
                        <strong> {{ isViewOnly ? 'Cursos' : isEdit ? 'Editar Cursos' : 'Agregar Cursos' }} </strong>
                    </h5>
                    <button type="button" class="btn-close" @click="cancel()" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row mx-3" v-if="!isViewOnly">
                        <div class="col-sm-4">
                            <label class="form-label" for="sectionList">Secciones <i class="req">*</i></label>
                            <div class="input-group">
                                <select class="form-select" id="sectionList" v-model="section" required
                                    :disabled="editUser == true">
                                    <option :value="{ code: 'ALL' }">Todas</option>
                                    <option v-for="sect in getSections" v-bind:key="sect.code" :value="sect">
                                        {{ sect.description }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-4">
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
                        </div>
                        <div class="col-sm">
                            <button type="button" class="btn btn-primary mt-1" @click="addCourse()">
                                <fa icon="circle-plus" />
                                Agregar
                            </button>
                        </div>
                        <div class="col-sm">
                            <button type="button" class="btn btn-warning mt-1" @click="resetList()">
                                <fa icon="repeat" />
                                Reiniciar
                            </button>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-sm mt-2" v-for="newCourse in list">
                            <span class="badge rounded-pill text-bg-secondary user-badge">
                                {{ newCourse.description }} &nbsp;
                                <a type="button" class="btn-close" @click="removeCourse(newCourse)" aria-label="Close"
                                    style="font-size: larger;"></a>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" v-if="!isViewOnly">
                    <button type="button" class="btn btn-danger" @click="cancel()">Cancelar</button>
                    <button type="button" class="btn btn-success" @click="confirm()">Confirmar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import coursesList from "@/store/parameters/courses.json";
import sectionsList from "@/store/parameters/sections.json";
import Swal from 'sweetalert2';

export default {
    name: 'ManageCoursesComponent',
    props: {
        courses: [],
        isViewOnly: Boolean,
        isEdit: Boolean
    },
    emits: ['parentEvent', 'viewOnlyEvent'],
    data() {
        return {
            tmpList: [],
            list: [],
            section: {},
            course: {
                code: 'ALL'
            }
        }
    },
    computed: {
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
    watch: {
        courses: function (newValue) {
            if (newValue) {
                this.tmpList = [...newValue];
                this.list = [...newValue];
            }
        },
        list: function (newValue, oldValue) {
            if (newValue != oldValue)
                this.isChanged = true;
            else
                this.isChanged = false;
        }
    },
    methods: {
        addCourse() {
            if ((this.section.code == 'ALL') || (this.course.code == 'ALL')) {
                this.getCourses.forEach(item => {
                    if (!this.list.find(element => element.code == item.code)) {
                        this.list.push(item);
                    }
                });
            } else {
                if (!this.list.find(element => element.code == this.course.code)) {
                    this.list.push(this.course);
                }
            }
        },
        removeCourse(course) {
            let idx = this.list.indexOf(course);
            this.list.splice(idx, 1);
        },
        resetList() {
            if (this.list.length > 0) {
                Swal.fire({
                    title: '¿Esta Seguro?',
                    text: "Esto removera todos los cursos agregados recientemente!",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#42b983',
                    cancelButtonColor: 'DimGray',
                    confirmButtonText: 'Si, reiniciar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.list = { ...this.tmpList };
                    }
                });
            }
        },
        cancel() {
            if (this.isViewOnly) {
                this.$emit('viewOnlyEvent');
            } else {
                if (this.isChanged) {
                    Swal.fire({
                        title: '¿Esta Seguro?',
                        text: "Este cambio no será guardado!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#d33',
                        cancelButtonColor: 'DimGray',
                        confirmButtonText: 'No guardar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.$emit('coursesEvent', this.tmpList)
                        }
                    });
                } else
                    this.$emit('coursesEvent', this.tmpList)
            }
        },
        confirm() {
            Swal.fire({
                title: '¿Esta Seguro?',
                text: "Este cambio será guardado!",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#42b983',
                cancelButtonColor: 'DimGray',
                confirmButtonText: 'Si, guardar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$emit('coursesEvent', this.list)
                }
            });
        },
        removeUser(user) {
            let idx = this.list.indexOf(user);
            this.list.splice(idx, 1);
        },
        resetSearch() {
            this.userToAdd = {};
            this.search = '';
        },
        addNewUser() {
            let item = this.list.find((item) => item.doc == this.userToAdd.doc)
            if (!item) {
                this.list.push(this.userToAdd);
                this.resetSearch();
            } else {
                Swal.fire({
                    title: 'Estudiante Registrado',
                    text: "Este estudiante ya se encuentra registrado!",
                    icon: 'warning',
                    confirmButtonColor: 'blue',
                    confirmButtonText: 'Ok'
                })
            }
        }
    }
}
</script>

<style>
.delete {
    color: red;
    cursor: pointer;
}

.add {
    color: green;
    cursor: pointer;
}

.user-badge {
    font-size: medium;
}

.search {
    background-color: #6c757d;
    color: white;
}
</style>