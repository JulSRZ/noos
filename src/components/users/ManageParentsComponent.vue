<template>
    <div class="modal fade" tabindex="-1" id="parentsModal" data-keyboard="true" role="dialog"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <fa icon="people-group" /> &nbsp;
                        <strong> {{ isViewOnly ? 'Hijos' : isEdit ? 'Editar Hijos' : 'Agregar Hijos' }} </strong>
                    </h5>
                    <button type="button" class="btn-close" @click="cancel()" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row mx-3" v-if="!isViewOnly">
                        <div class="col-sm-5">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Documento del estudiante"
                                    aria-label="Recipient's username" aria-describedby="basic-addon2" id="search"
                                    v-model="search">
                                <button class="input-group-text search" @click="searhUser()" title="Buscar Estudiante">
                                    <fa icon="search" />
                                </button>
                            </div>
                        </div>
                        <div class="col-sm-7" v-if="userToAdd?.doc">
                            <div class="row">
                                <span class="badge rounded-pill text-bg-secondary user-badge">
                                    {{ userToAdd?.tdoc?.id }} - {{ userToAdd?.doc }} - {{ userToAdd?.name }} - {{
                                        userToAdd?.course?.description }}
                                </span>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <a class="add mx-2" title="Agregar" @click="addNewUser()">
                                        <fa icon="thumbs-up" />
                                    </a>
                                    <a class="delete mx-2" title="No Agregar" @click="resetSearch()">
                                        <fa icon="thumbs-down" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <table class="table table-hover table-sm table-responsive">
                            <thead class="back">
                                <tr>
                                    <th scope="col">Tipo Documento</th>
                                    <th scope="col">Documento</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Curso</th>
                                    <th scope="col" v-if="!isViewOnly">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="u in list" v-bind:key="u.doc">
                                    <td>{{ u?.tdoc?.id }} - {{ u?.tdoc?.name }}</td>
                                    <td>{{ u?.doc }}</td>
                                    <td>{{ u?.name }}</td>
                                    <td>{{ u?.course?.description }}</td>
                                    <td v-if="!isViewOnly" class="text-center">
                                        <a class="delete mx-2" title="Eliminar Usuario" @click="removeUser(u)">
                                            <fa icon="user-minus" />
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
import UserServices from '@/common/services/user/UsersServices.js';
import Swal from 'sweetalert2';

export default {
    name: 'ManageParentsComponent',
    props: {
        parents: [],
        isViewOnly: Boolean,
        isEdit: Boolean
    },
    emits: ['parentEvent', 'viewOnlyEvent'],
    data() {
        return {
            tmpList: [],
            list: [],
            userToAdd: {},
            isChanged: false,
            search: ''
        }
    },
    watch: {
        parents: function (newValue) {
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
        cancel() {
            if (this.isViewOnly) {
                this.$emit('viewOnlyEvent');
            } else {
                if (this.isChanged) {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "This changes won't be save!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#d33',
                        cancelButtonColor: 'DimGray',
                        confirmButtonText: 'Don\'t save it!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.$emit('parentEvent', this.tmpList)
                        }
                    });
                } else
                    this.$emit('parentEvent', this.tmpList)
            }
        },
        confirm() {
            Swal.fire({
                title: 'Are you sure?',
                text: "This changes will be save!",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#42b983',
                cancelButtonColor: 'DimGray',
                confirmButtonText: 'Yes, save it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$emit('parentEvent', this.list)
                }
            });
        },
        removeUser(user) {
            let idx = this.list.indexOf(user);
            this.list.splice(idx, 1);
        },
        searhUser() {
            UserServices.getStudentByDoc(this.search)
                .then((result) => {
                    if (result.size > 0) {
                        result.forEach((student) => {
                            this.userToAdd = student.data();
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
        resetSearch() {
            this.userToAdd = {};
            this.search = '';
        },
        addNewUser() {
            let item = this.list.find((item) => item.doc == this.userToAdd.doc)
            console.log(item, 'temi')
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