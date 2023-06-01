<template>
  <div class="row justify-content-lg-center my-5">
    <manage-users-component/>
  </div>
</template>

<script>
import ManageUsersComponent from "../../components/users/ManageUsersComponent.vue";

export default {
  name: "ManageUsers",
  components: {
    ManageUsersComponent,
  }
}
</script>