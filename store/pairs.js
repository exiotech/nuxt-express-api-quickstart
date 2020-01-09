export const state = () => {
  return {
    items: [],
  };
};

export const actions = {
  async getItems({ commit }, exchangeId) {
    const { data } = await this.$axios.get(`/exchanges/${exchangeId}/pairs?populate[]=base&populate[]=quote`);
    commit('SET_ITEMS', data.data.pairs);
  },
};

export const mutations = {
  SET_ITEMS(state, items) {
    state.items = items;
  },
  UNSET_ITEMS(state) {
    state.items = [];
  },
};

export const getters = {
  items: (state) => state.items,
};
