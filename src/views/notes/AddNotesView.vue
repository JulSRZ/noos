<template>
  <div class="row justify-content-lg-center my-5">
    <create-update-component />
  </div>
</template>

<script>
import CreateUpdateComponent from "../../components/notes/CreateUpdateComponent.vue";

export default {
  name: "AddNotesView",
  components: {
    CreateUpdateComponent,
  }
}
</script>

<style scoped></style>