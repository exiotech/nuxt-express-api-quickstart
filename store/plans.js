export const state = () => {
  return {
    plans: [],
  };
};

export const actions = {
  async getItems({ commit }) {
    const { data } = await this.$axios.get(`/plans`);
    commit('SET_ITEMS', data.data.plans);
  },
};

export const mutations = {
  SET_ITEMS(state, payload) {
    state.plans = payload;
  },
};

export const getters = {
  data: (state) => state.plans,
};
