<template>
    <div id="DetailFinancialModal" class="modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title noos-modal-title">
                        <fa class="card-button-icon" icon="sack-dollar" />
                        Administrar Cuenta
                    </h5>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-4">
                            <label class="form-label label-title" for="description">Descripción</label> <i class="req">*</i>
                            <div class="input-group">
                                <span class="input-group-text">
                                    <fa icon="comment" />
                                </span>
                                <input type="text" class="form-control" id="description" maxlength="50" autocomplete="off"
                                    v-model="detail.description" required>
                            </div>
                        </div>
                        <div class="col-4">
                            <label class="form-label label-title" for="description">Valor</label> <i class="req">*</i>
                            <div class="input-group">
                                <span class="input-group-text">
                                    <fa icon="dollar-sign" />
                                </span>
                                <money3 class="form-control" v-model="detail.amount" v-bind="amountConfig"></money3>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="col-sm">
                                <button type="button" class="btn btn-primary mt-4" @click="addDetail()">
                                    <fa icon="circle-plus" />
                                    {{ buttonLabel }}
                                </button>
                            </div>
                        </div>
                        <div class="col-2" v-if="this.detail.description !== ''">
                            <div class="col-sm">
                                <button type="button" class="btn btn-warning mt-4" @click="empty()">
                                    <fa icon="rotate-right" />
                                    Limpiar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-sm mt-2" v-for="detail in financialDetails">
                            <span class="badge rounded-pill text-bg-secondary user-badge" style="font-size: large;">
                                <a type="button" @click="prepareEditDetail(detail)" class="noos-btn-edit">
                                    <fa icon="pen-to-square" />
                                </a>
                                {{ detail.description }} - ${{ detail.amount }} &nbsp;
                                <a type="button" class="btn-close noos-btn-close" @click="removeDetail(detail)" aria-label="Close"></a>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="cancelDetails()" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" @click="saveDetails()" data-bs-dismiss="modal">Guardar Estado!</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    name: 'DetailFinancialStudentComponent',
    props: {
        financialDetails: []
    },
    data() {
        return {
            buttonLabel: 'Agregar',
            detail: {
                description: '',
                amount: 0
            },
            tmpEdit: null,
            amountConfig: {
                masked: false,
                prefix: '',
                suffix: ' COP',
                thousands: ',',
                decimal: '.',
                precision: 0,
                disableNegative: false,
                disabled: false,
                min: null,
                max: 100000000,
                allowBlank: false,
                minimumNumberOfCharacters: 0,
                shouldRound: true,
                focusOnRight: false,
            },
        }
    },
    methods: {
        addDetail() {
            if (this.tmpEdit == null) {
                if (this.detail.description != '' && this.detail.amount != 0) {
                    this.financialDetails.push(this.detail);
                    this.empty();
                } else {
                    Swal.fire({
                        title: 'Detalle incompleto',
                        text: "Debe ingresar todos los campos requeridos!",
                        icon: 'warning',
                        confirmButtonColor: 'blue',
                        confirmButtonText: 'Ok'
                    });
                }
            } else
                this.editDetail();
        },
        editDetail() {
            Swal.fire({
                title: '¿Esta Seguro?',
                text: "Modificar este detalle!",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#42b983',
                cancelButtonColor: 'red',
                confirmButtonText: 'Si, guardar!',
                cancelButtonText: 'No guardar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.empty();
                } else {
                    this.detail = this.tmpEdit;
                    this.empty();
                }
            });

        },
        removeDetail(detail) {
            let idx = this.financialDetails.indexOf(detail);
            this.financialDetails.splice(idx, 1);
        },
        prepareEditDetail(detail) {
            this.tmpEdit = detail;
            this.buttonLabel = 'Editar';
            this.detail = detail;
        },
        empty() {
            this.buttonLabel = 'Agregar';
            this.tmpEdit = null;
            this.detail = { description: '', amount: 0 };
        },
        saveDetails() {
            this.$emit('saveDetails');
        },
        cancelDetails() {
            this.$emit('cancelDetails');
        }
    }
}
</script>

<style>
.noos-modal-title {
    font-weight: bolder;
    color: #879f2d;
}

.noos-btn-edit {
    font-size: medium;
    color: darkgoldenrod;
    background-color: dimgray;
}

.noos-btn-close {
    font-size: larger;
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
</style>