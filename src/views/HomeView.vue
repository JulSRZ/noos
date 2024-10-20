<template>
  <section class="home text-center" style="gap: 24px">
    <div class="row" style="margin-top: 54px">
      <div class="col text-center">
        <img alt="Vue logo" src="../assets/logo-noos.png" />
      </div>
    </div>
    <div class="row">
      <div class="col text-center">
        <strong class="fs-3">
          Bienvenido a Network of School, su sistema personalizado de interacción educativo online
        </strong>
      </div>
    </div>
    <div class="row">
      <authentication-component />
    </div>
  </section>
</template>

<script>
import AuthenticationComponent from "../components/auth/Authentication.vue";
export default {
  name: "HomeView",
  components: {
    AuthenticationComponent,
  },

  data() {
    return {
    };
  },
  created() {
    //   this.loadData();
  },
  computed: {
    //   getList() {
    //     return this.usersList.filter((item) => item.doc.toLowerCase().includes(this.search.toLowerCase()));
    //   },
  },
  mounted() {
    //   this.modal = new bootstrap.Modal('#editUserModal', {});
    //this.parentModal = new bootstrap.Modal('#testModal', {});
  },
  methods: {
    //   async loadData() {
    //     this.usersList = [];
    //     UserServices.getAll()
    //       .then((usersList => {
    //         usersList.forEach((user) => {
    //           this.usersList.push({ ...user.data(), id: user.id });
    //         });
    //       }));;
    //   },
    googleSignIn() {
      // this.parentModal.hide();
    },
  },
};
</script>
