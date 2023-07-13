<template>
    <div id="DetailFinancialModal" class="modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title noos-modal-title">
                        <fa class="card-button-icon" icon="sack-dollar" />
                        Administrar Cuenta
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-6">
                            <label class="form-label label-title" for="description">Descripción</label> <i class="req">*</i>
                            <div class="input-group">
                                <span class="input-group-text">
                                    <fa icon="comment" />
                                </span>
                                <input type="text" class="form-control" id="description" maxlength="50" autocomplete="off"
                                    v-model="description" required>
                            </div>
                        </div>
                        <div class="col">
                            <label class="form-label label-title" for="description">Valor</label> <i class="req">*</i>
                            <div class="input-group">
                                <span class="input-group-text">
                                    <fa icon="dollar-sign" />
                                </span>
                                <money3 class="form-control" v-model="amount" v-bind="amountConfig"></money3>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="col-sm">
                            <button type="button" class="btn btn-primary mt-4" @click="addDetail()">
                                <fa icon="circle-plus" />
                                Agregar
                            </button>
                        </div>
                        </div>
                    </div>
                    <div class="row">
                        <pre>{{ financialDetails }}</pre>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary">Guardar Estado!</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailFinancialStudentComponent',
    data() {
        return {
            description: '',
            amount: 0,
            amountConfig: {
                masked: false,
                prefix: '',
                suffix: ' COP',
                thousands: ',',
                decimal: '.',
                precision: 2,
                disableNegative: false,
                disabled: false,
                min: null,
                max: 100000000,
                allowBlank: false,
                minimumNumberOfCharacters: 0,
                shouldRound: true,
                focusOnRight: false,
            },
            financialDetails: []
        }
    },
    methods: {
        addDetail() {
            this.financialDetails.push({
                description: this.description,
                amount: this.amount
            });
            this.description = '';
            this.amount = 0;
        }
    }
}
</script>

<style>
.noos-modal-title {
    font-weight: bolder;
    color: #879f2d;
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