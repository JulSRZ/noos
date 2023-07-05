<!-- eslint-disable linebreak-style -->
<template>
    <div class="row justify-content-lg-center my-5">
      <financial-component/>
    </div>
  </template>
  <script>
  /* eslint-disable */
  import FinancialComponent from '../../components/financial/FinancialComponent.vue'
  
  export default {
    name: 'FinancialView',
    components: {
        FinancialComponent,
    },
  };
  </script>
  