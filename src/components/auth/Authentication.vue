<template>
  <section class="text-center" style="max-width: 100%; padding: 24px">
    <button type="button" class="btn btn-light" @click="googleSignIn">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/noos-41838.appspot.com/o/logos%2Fgoogle-logo.png?alt=media&token=1f1e4ee1-926e-40e1-a151-693ec142d619"
        width="20"
        height="20"
      />
      <label style="margin-left: 8px; font-weight: bolder"> Sign In with Google </label>
    </button>
  </section>
</template>

<script>
import { auth, googleProvider } from "@/firebase/init";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
// import { Button } from 'bootstrap';

//   import UserServices from '@/common/services/user/UsersServices.js';

export default {
  name: "AuthenticationComponent",
  components: {
    //   CreateUpdateUserComponent,
    //   ManageParentsComponent
  },

  data() {
    return {
      currentUser: {},
      // usersList: [],
      // titleLabel: "",
      // userData: {},
      // parentsView: [],
      // search: "",
      // isUpdate: false,
      // modal: null,
      // parentModal: null,
    };
  },
  created() {
    this.loadData();
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
    async loadData() {
      this.currentUser = auth.currentUser;
      console.log(this.currentUser, "CURRENT USER");
    },
    googleSignIn() {
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          console.log(token, "TOKEN");
          // The signed-in user info.
          const user = result.user;
          console.log(user, "USER");

          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          console.log(error, "CATCH ERROR");
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
      // this.parentModal.hide();
    },
  },
};
</script>

<style scoped></style>
