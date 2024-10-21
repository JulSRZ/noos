import { createStore } from "vuex";
import { auth } from "../firebase/init";
import { onAuthStateChanged } from "firebase/auth";
import UserServices from "@/common/services/user/UsersServices.js";

const store = createStore({
  state: {
    sessionUser: null,
    noosUser: null,
  },
  getters: {},
  mutations: {
    setSessionUser(state, payload) {
      state.sessionUser = payload;
    },
    setNoosUser(state, payload) {
      state.noosUser = payload;
    },
  },
  actions: {
    async fetchSessionUser({ commit }) {
      onAuthStateChanged(auth, async (user) => {
        console.log(user, "CURRENT USER");
        if (user) {
          // await UserServices.getUserByUid(user.uid).then((currentUser) => {
          //   commit("setNoosUser", currentUser.data());
          //   console.log(currentUser.data(), "CURRENT noosUser");
          // });

          await UserServices.getUserByUid(user.uid).then((result) => {
            if (result) {
              result.forEach((noosUser) => {
                commit("setNoosUser", noosUser.data());
                console.log(noosUser.data(), "CURRENT noosUser");
                // if (user.data().role.id === 4) {
                //   this.newBill.attendant = user.data();
                // } else {
                //   Swal.fire({
                //     title: "Usuario No Acudiente",
                //     text: "El usuario debe ser un acudiente!",
                //     icon: "warning",
                //     confirmButtonColor: "blue",
                //     confirmButtonText: "Ok",
                //   });
                // }
              });
            }
          });
        }
        commit("setSessionUser", user);
      });
    },
  },
  modules: {},
});

export default store;
