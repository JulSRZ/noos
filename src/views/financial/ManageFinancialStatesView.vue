<template>
    <div class="row justify-content-lg-center my-5">
      <manage-financial-states-component/>
    </div>
  </template>
  
  <script>
  import ManageFinancialStatesComponent from '@/components/financial/ManageFinancialStatesComponent.vue';
  
  export default {
    name: "ManageFinancialStatesView",
    components: {
        ManageFinancialStatesComponent,
    }
  }
  </script>