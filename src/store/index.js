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
          await UserServices.getUserByUid(user.uid).then((result) => {
            if (result) {
              result.forEach((noosUser) => {
                commit("setNoosUser", noosUser.data());
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
