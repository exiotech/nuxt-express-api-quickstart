export const state = () => {
  return {
    items: [],
  };
};

export const actions = {
  async getItems({ commit }) {
    const { data } = await this.$axios.get(`/exchanges`);
    commit('SET_ITEMS', data.data.exchanges);
  },
};

export const mutations = {
  SET_ITEMS(state, items) {
    state.items = items;
  },
};

export const getters = {
  items: (state) => state.items,
};
