<template>
  <div class="row justify-content-lg-center my-5">
    <create-update-homework-component />
  </div>
</template>


<script>
import CreateUpdateHomeworkComponent from "../../components/users/CreateUpdateComponent.vue";

export default {
  name: "AddUser",
  components: {
    CreateUpdateHomeworkComponent,
  }
}
</script>

<style scoped></style>