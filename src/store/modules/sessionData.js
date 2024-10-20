import { auth } from "@/firebase/init";

const user = {};

const state = {
  user,
};

const mutations = {
    setCurrentSession(state, payload) {
      state.user = payload;
    },
  };

const actions = {
  async fetchCurrentUser({ commit }) {
    const response = auth.currentUser;
    const user = await response.json();
    commit("setCurrentSession", user);
  },
};

const getters = {};

export default {
  //   data,
  //   listselect,
  user,
  state,
  actions,
  mutations,
  getters,
};
