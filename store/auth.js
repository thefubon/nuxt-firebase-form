import { SET_AUTH } from "./types";
export const state = () => ({
  isAuth: false
});

export const getters = {};

export const actions = {};

export const mutations = {
  [SET_AUTH](state, payload) {
    state.isAuth = payload;
  }
};
