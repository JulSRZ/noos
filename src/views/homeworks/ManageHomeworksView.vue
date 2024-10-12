<template>
  <div class="row justify-content-lg-center my-5">
    <manage-homeworks-component/>
  </div>
</template>

<script>
import ManageHomeworksComponent from "../../components/homeworks/ManageHomeworksComponent.vue";

export default {
  name: "ManageHomeworksView",
  components: {
    ManageHomeworksComponent,
  }
}
</script>