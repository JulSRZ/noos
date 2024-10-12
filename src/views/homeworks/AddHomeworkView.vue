<template>
  <div class="row justify-content-lg-center my-5">
    <create-update-component />
  </div>
</template>

<script>
import CreateUpdateComponent from "../../components/homeworks/CreateUpdateComponent.vue";

export default {
  name: "AddHomeworkView",
  components: {
    CreateUpdateComponent,
  }
}
</script>

<style scoped></style>