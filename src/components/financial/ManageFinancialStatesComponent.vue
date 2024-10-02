<template>
    <div style="max-width: 95%">
        <div class="table-responsive shadow-lg p-3 mb-5 bg-white rounded">
            <div class="card">
                <div class="card-header">
                    <div class="row mt-1 mb-1">
                        <div class="col-3">
                            <h5 class="card-title mt-2" style="align-content: flex-start;">
                                <router-link class="back" :to="{ name: 'financial' }" title="Regresar">
                                    <fa icon="arrow-circle-left" />
                                </router-link> &nbsp;
                                <strong>Estados Financieros</strong>
                            </h5>
                        </div>
                        <div class="col-md-4"></div>
                        <div class="col-sm justify-content-lg-right">
                            <div class="input-group">
                                <input type="text" class="form-control"
                                    placeholder="Digita el número de documento del acudiente"
                                    aria-label="Recipient's username" aria-describedby="basic-addon2" id="search"
                                    v-model="search">
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
                                <th scope="col">ID Factura</th>
                                <th scope="col">Tipo Documento</th>
                                <th scope="col">Documento</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Email</th>
                                <th scope="col">Fecha de Creación <br /> <span
                                        style="font-size: x-small;">(dd/MM/yyyy)</span></th>
                                <th scope="col">Última Fecha de Pago <br /> <span
                                        style="font-size: x-small;">(dd/MM/yyyy)</span></th>
                                <th scope="col">Mora <br /> <span style="font-size: x-small;">COP</span></th>
                                <th scope="col">Sub Total <br /> <span style="font-size: x-small;">COP</span></th>
                                <th scope="col">Total <br /> <span style="font-size: x-small;">COP</span></th>
                                <th scope="col">Estado</th>
                                <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="fState in getlist" v-bind:key="fState.id">
                                <td>{{ fState.id }}</td>
                                <td>{{ fState.attendant.tdoc.name }}</td>
                                <td>{{ fState.attendant.doc }}</td>
                                <td>{{ fState.attendant.name }}</td>
                                <td>{{ fState.attendant.email }}</td>
                                <td>{{ fState.creationDate }}</td>
                                <td>{{ fState.lastDatePayment }}</td>
                                <td>{{ maskMoneyAmount(fState.amountPastDue || 0) }}</td>
                                <td>{{ maskMoneyAmount(fState.totalAmount) }}</td>
                                <td>{{ maskMoneyAmount(getTotalAmount(fState)) }}</td>
                                <td>
                                    <span :class="getStateClass(fState.state)">
                                        {{ fState.state.description }}
                                    </span>
                                </td>
                                <td class="text-center">
                                    <section v-if="fState.state.code !== 'PAID'">
                                        <a class="edit mx-2" title="Editar Cuenta" @click="openEdit(fState, fState.studentsBill)"
                                            data-bs-toggle="modal" data-bs-target="#editUserModal">
                                            <fa icon="pen-to-square" />
                                        </a>
                                        <a class="delete mx-2" title="Eliminar Cuenta"
                                            @click="delFinancialState(fState)">
                                            <fa icon="trash-can" />
                                        </a>
                                        <a class="pay mx-2" title="Pagar Cuenta" @click="payFinancialState(fState)">
                                            <fa icon="credit-card" />
                                        </a>
                                    </section>
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
                            <fa icon="user-edit" /> &nbsp; <strong>Editar Estado de Cuenta</strong>
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <create-update-financial-component :financialState="financialData" @updateDone="updateDone()" />
                        <!--create-update-user-component :userdata="financialData" @updateDone="updateDone()" /-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FinancialServices from '@/common/services/financial/FinancialServices.js';
import CreateUpdateFinancialComponent from './CreateUpdateComponent.vue'
import { CFinancialStates } from '@/common/constants/financialStates';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';
import moment from 'moment';

export default {
    name: "ManageFinancialStateComponent",
    components: {
        CreateUpdateFinancialComponent,
    },

    data() {
        return {
            financialStatelist: [],
            titlelb: "",
            financialData: {},
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
        getlist() {
            return this.financialStatelist.filter((item) => item.attendant.doc.toLowerCase().includes(this.search.toLowerCase()));
        }
    },
    mounted() {
        this.modal = new bootstrap.Modal('#editUserModal', {});
    },
    methods: {
        async loadData() {
            this.financialStatelist = [];
            FinancialServices.getAll()
                .then((financialList => {
                    financialList.forEach((state) => {
                        const data = this.validatefinancialData(state.data());
                        this.financialStatelist.push({ ...data, id: state.id });
                    });
                }));;
        },
        validatefinancialData(fState) {
            let today = new Date();
            let lastDatePayment = new Date(moment(String(fState.lastDatePayment)).format('DD/MM/yyyy'));
            if ((Date.parse(today) > lastDatePayment) && fState.state.code !== CFinancialStates.PAID_STATE.code) {
                const timeDiff = today.getTime() - lastDatePayment.getTime();
                const difference = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                let amount = ((0.15 * Number.parseInt(fState.totalAmount)) / 360) * difference;
                fState.amountPastDue = Math.trunc(amount);
                fState.state = CFinancialStates.LATE_STATE;
            }
            return fState;
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
        openEdit(fState, studentsBillData) {
            // console.log(this.financialStatelist, 'financialStatelist')
            console.log(fState, 'FState')
            // console.log(studentsBillData, 'studentsBill')
            this.financialData = {...fState};
            // this.financialData.studentsBill = studentsBillData;
            // console.log(this.financialData, 'this.financialData')

        },
        delFinancialState(doc) {
            Swal.fire({
                title: 'Esta seguro?',
                text: "No será capaz de revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: 'DimGray',
                confirmButtonText: 'Si, eliminar!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    FinancialServices.delete(doc.id)
                        .then(() => {
                            Swal.fire(
                                'Deleted!',
                                'The user has been deleted',
                                'success'
                            ).then(() => this.loadData());
                        });
                }
            });
        },
        updateDone() {
            this.modal.hide();
            this.loadData();
        },
        async payFinancialState(fState) {
            Swal.fire({
                title: 'Esta seguro?',
                text: 'Usted pagará ésta cuenta!',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#42b983',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, pagar!',
                cancelButtonText: 'Cancelar',
                showLoaderOnConfirm: true
            }).then((result) => {
                if (result.isConfirmed) {
                    FinancialServices.update({ ...fState, state: CFinancialStates.PAID_STATE })
                        .then(() => {
                            Swal.fire({
                                title: 'Pagado!',
                                text: 'La cuenta ha sido pagada!',
                                icon: 'success',
                                confirmButtonColor: '#42b983'
                            }).then(() => this.loadData());
                        });
                }
            });
        },
        getStateClass(state) {
            console.log(state.code, 'code')
            switch (state.code) {
                case CFinancialStates.PENDING_STATE.code:
                    return 'badge rounded-pill text-bg-warning';
                case CFinancialStates.PAID_STATE.code:
                    return 'badge rounded-pill text-bg-success';
                case CFinancialStates.LATE_STATE.code:
                    return 'badge rounded-pill text-bg-danger';
            }
        },
        getTotalAmount(fState) {
            return (fState.amountPastDue || 0) + fState.totalAmount;
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

.pay {
    color: green;
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