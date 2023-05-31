<template>
  <div class="row">
    <create-update-component/>
  </div>
</template>

<script>
import CreateUpdateComponent from "../../components/users/CreateUpdateComponent.vue";

export default {
  name: "AddUser",
  components: {
    CreateUpdateComponent,
  }
}
</script>

<style scoped>

</style>