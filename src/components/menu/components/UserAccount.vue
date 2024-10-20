<template>
  <section>
    <section class="row">
      <section class="col-3">
        <img class="profile-image" :src="sessionUser.photoURL" width="98" height="98" />
      </section>
      <section class="col-lg">
        <section class="row">
          <section class="col-3"><strong>Nombre</strong></section>
          <section class="col">{{sessionUser.displayName}}</section>
        </section>
        <section class="row">
          <section class="col-3"><strong>Email</strong></section>
          <section class="col">{{sessionUser.email}}</section>
        </section>
        <section class="row">
          <section class="col-3"><strong>Phone</strong></section>
          <section class="col">{{sessionUser.phoneNumber}}</section>
        </section>
      </section>
    </section>
    <section class="row">
      <section class="col text-center mt-2">
        <span style="font-size: 12px">Version: 1.0.0</span>
      </section>
    </section>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "UserAccountComponent",
  computed: {
    ...mapState(["sessionUser"]),
  },
  create() {
    console.log(this.sessionUser, "session user");
  },
};
</script>

<style scoped>
.profile-image {
  position: relative;
  border-radius: 50%;
}
</style>
