<template>
    <div class="row justify-content-lg-center my-5">
        <create-update-financial-component />
    </div>
</template>
  
<script>
import CreateUpdateFinancialComponent from "../../components/financial/CreateUpdateComponent.vue";

export default {
    name: "AddFinancialView",
    components: {
        CreateUpdateFinancialComponent
    }
}
</script>
  
<style scoped></style>