<template>
    <div class="row">
        <div class="col-2" v-for="student in studentsBill">
            <div class="card noos-card">
                <div class="card-body">
                    <h5 class="card-title noos-card-title"> {{ student.studentName }} </h5>
                    <h6 class="card-subtitle mb-2 text-muted"> {{ student.studentCourse }} </h6>
                    <section class="card-button-section">
                        <button class="btn btn-primary" type="button" @click="openDetailModal">
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

    <detail-financial-student-component />
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
                console.log(newValue, 'new value')
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
            studentsBill: []
        }
    },
    mounted() {
        this.detailModal = new bootstrap.Modal('#DetailFinancialModal', {});
    },
    methods: {
        openDetailModal() {
            this.detailModal.show();
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