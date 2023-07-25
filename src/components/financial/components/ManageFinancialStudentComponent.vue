<template>
    <div class="row">
        <div class="col-2" v-for="student in studentsBill">
            <div class="card noos-card">
                <div class="card-body">
                    <h5 class="card-title noos-card-title"> {{ student.studentName }} </h5>
                    <h6 class="card-subtitle mb-2 text-muted"> {{ student.studentCourse }} </h6>
                    <section class="card-button-section">
                        <button class="btn btn-primary" type="button" @click="openDetailModal(student.financialItems)">
                            <fa class="card-button-icon" icon="sack-dollar" />
                            Administrar Cuenta
                        </button>
                    </section>
                </div>
                <div class="card-footer text-muted noos-card-footer">
                    Total: $ {{ student.total }}
                </div>
            </div>
        </div>
    </div>

    <detail-financial-student-component :financialDetails="this.currentFinancialItems" @saveDetails="saveDetails()"/>
</template>

<script>
import DetailFinancialStudentComponent from './DetailFinancialStudentComponent.vue';
import * as bootstrap from 'bootstrap';

export default {
    name: "ManageFinancialStudentComponent",
    components: {
        DetailFinancialStudentComponent
    },
    props: {
        students: [],
        reset: false
    },
    emit: ['detailReseted'],
    watch: {
        students: function (newValue) {
            if (newValue) {
                newValue.forEach((value) => {
                    this.studentsBill.push({
                        studentyId: value.id,
                        studentName: value.name,
                        studentCourse: value.course.description,
                        financialItems: [],
                        total: 0
                    })
                })

            }
        },
        reset: function (newValue) {
            if (newValue === true) {
                this.studentsBill = [];
                this.$emit('detailReseted');
            }
                
        }
    },
    data() {
        return {
            detailModal: null,
            studentsBill: [],
            currentFinancialItems: []
        }
    },
    mounted() {
        this.detailModal = new bootstrap.Modal('#DetailFinancialModal', {});
    },
    methods: {
        openDetailModal(financialItems) {
            this.currentFinancialItems = financialItems;
            this.detailModal.show();
        },
        saveDetails() {
            this.studentsBill.forEach((bill) => {
                bill.total = 0;
                bill.financialItems.forEach((detail) => {
                    bill.total = Number.parseInt(bill.total) + Number.parseInt(detail.amount);
                });
            });
            this.$emit('saveFinancialStudent', this.studentsBill)
        }
    }
}
</script>

<style>
.noos-card {
    width: 18rem;
    border-radius: 24px;
    background-color: whitesmoke;
}

.noos-card-title {
    font-weight: bolder;
}

.noos-card-footer {
    text-align: center;
}

.card-button-section {
    text-align: center;
}

.card-button-icon {
    margin-right: 10px;
}
</style>