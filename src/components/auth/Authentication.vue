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
import {
  signInWithPopup,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";

export default {
  name: "AuthenticationComponent",
  methods: {
    googleSignIn() {
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          signInWithPopup(auth, googleProvider);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
  },
};
</script>

<style scoped></style>
