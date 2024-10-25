<template>
  <section class="container text-center" style="min-width: auto; padding: 24px">
    <section class="row">
      <button type="button" class="btn btn-light" @click="googleSignIn">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/noos-41838.appspot.com/o/logos%2Fgoogle-logo.png?alt=media&token=1f1e4ee1-926e-40e1-a151-693ec142d619"
          width="20"
          height="20"
        />
        <label style="margin-left: 8px; font-weight: bolder"> Iniciar sesión con Google </label>
      </button>
    </section>
    <!-- <section class="row" style="margin-top: 16px">
      <button type="button" class="btn btn-light" @click="microsoftSignIn">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/noos-41838.appspot.com/o/logos%2Fmicrosoft-logo.png?alt=media&token=8f3ad7b3-668e-4b9d-bd94-3e23f15470d9"
          width="20"
          height="20"
        />
        <label style="margin-left: 8px; font-weight: bolder"> Iniciar sesión con Microsoft </label>
      </button>
    </section> -->
  </section>
</template>

<script>
import { auth, googleProvider, microsoftProvider } from "@/firebase/init";
import { signInWithPopup, browserSessionPersistence, setPersistence, OAuthProvider } from "firebase/auth";
import UserServices from "@/common/services/user/UsersServices.js";

export default {
  name: "AuthenticationComponent",
  methods: {
    googleSignIn() {
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          return signInWithPopup(auth, googleProvider).then((result) => {
            const user = result.user;
            this.createUser(user);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    microsoftSignIn() {
      // setPersistence(auth, browserSessionPersistence)
      //   .then(() => {
      //     return signInWithPopup(auth, microsoftProvider).then((result) => {
      //       console.log(result, 'RESULTTT');
      //       // console.log(result, 'RESULTTT');
      //       // const user = result.user;
      //       // this.createUser(user);
      //     });
      //   })
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //   });
    },
    async createUser(user) {
      const userByUid = await UserServices.getUserByUid(user?.uid);
      console.log(user, "USERRRRR");
      if (userByUid.empty) {
        const user = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
        };

        await UserServices.create(user);
      }
      this.$router.push({ path: "dashboard" });
    },
  },
};
</script>

<style scoped></style>
