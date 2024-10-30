<template>
  <section style="margin-top: 34px">
    <button type="button" class="btn btn-light" style="border-radius: 12px" @click="googleSignIn">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/noos-41838.appspot.com/o/logos%2Fgoogle-logo.png?alt=media&token=1f1e4ee1-926e-40e1-a151-693ec142d619"
        width="20"
        height="20"
      />
      <label style="margin-left: 8px; font-weight: bolder"> Iniciar sesión con Google </label>
    </button>
  </section>
</template>

<script>
import { auth, googleProvider } from "@/firebase/init";
import { signInWithPopup, browserSessionPersistence, setPersistence } from "firebase/auth";
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
    async createUser(googleUser) {
      const userByUid = await UserServices.getUserByUid(googleUser?.uid);
      const userByEmail = await UserServices.getUserByEmail(googleUser?.email);
      if (userByUid.empty && userByEmail.empty) {
        const user = {
          uid: googleUser.uid,
          name: googleUser.displayName,
          email: googleUser.email,
          phone: googleUser.phoneNumber,
        };
        await UserServices.create(user);
      } else {
        if (!userByEmail.uid) {
          let us;
          userByEmail.forEach((user) => {
            us = user.data();
          });
          const updateUser = {
            ...us,
            name: googleUser.displayName,
            uid: googleUser.uid,
          };
          await UserServices.update(updateUser);
        }
      }

      this.$router.push({ path: "dashboard" });
    },
  },
};
</script>

<style scoped></style>
