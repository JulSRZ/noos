import { createStore } from "vuex";
import { auth } from "../firebase/init";
import { onAuthStateChanged, signOut } from "firebase/auth";

const store = createStore({
  state: {
    sessionUser: null,
  },
  getters: {},
  mutations: {
    setSessionUser(state, payload) {
      state.sessionUser = payload;
    },
  },
  actions: {
    async fetchSessionUser({ commit }) {
      onAuthStateChanged(auth, (user) => {
        console.log(user, 'CURRENT USER')
        commit("setSessionUser", user);
      });
    },
  },
  modules: {},
});

export default store;
