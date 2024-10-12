<template>
  <div class="row justify-content-lg-center my-5">
    <manage-notes-component/>
  </div>
</template>

<script>
import ManageNotesComponent from "../../components/notes/ManageNotesComponent.vue";

export default {
  name: "ManageNotesView",
  components: {
    ManageNotesComponent,
  }
}
</script>