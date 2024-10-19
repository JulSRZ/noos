<template>
  <div class="row justify-content-lg-center my-5">
    <create-update-notes-component />
  </div>
</template>

<script>
import CreateUpdateNotesComponent from "../../components/notes/CreateUpdateComponent.vue";

export default {
  name: "AddNotesView",
  components: {
    CreateUpdateNotesComponent,
  }
}
</script>

<style scoped></style>