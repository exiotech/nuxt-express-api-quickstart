export const state = () => {
  return {
    items: [],
    item: {},
    options: [],
    history: [],
  };
};

export const actions = {
  async getItems({commit, state}) {
    const { data } = await this.$axios.get(`/alerts?populate[]=pair&populate[]=exchange`);
    commit('SET_ITEMS', data.data.alerts);
  },
  async getItemsHistory({commit, state}) {
    const { data } = await this.$axios.get(`/alertsHistory?populate[]=pair&populate[]=pair.base&populate[]=pair.quote&populate[]=exchange`);
    commit('SET_ITEMS_HISTORY', data.data.alertHistory);
  },
  async getItemOptions({commit, state}) {
    const { data } = await this.$axios.get(`/alert-options`);
    commit('SET_ITEM_OPTIONS', data.data.options);
  },
  async getItem({ commit }, id) {
    const { data } = await this.$axios.get(`/alerts/${id}`);
    commit('SET_ITEM', data.data.alert);
  },
  async updateItem({commit}, payload) {
    const { data } = await this.$axios.put(`/alerts/${payload.id}`, payload.formData);
    return data.data.alert;
  },
  async createItem({commit}, item) {
    const res = await this.$axios.post('/alerts', item);
    commit('CREATE_ITEM', res.data.alert);
  },
  async removeItem({commit}, id) {
    const res = await this.$axios.delete(`alerts/${id}`);
    commit('REMOVE_ITEM', id);
  },
}

export const mutations = {
  SET_ITEMS(state, items) {
    state.items = items;
  },
  SET_ITEMS_HISTORY(state, history) {
    state.history = history;
  },
  SET_ITEM(state, item) {
    state.item = item;
  },
  SET_ITEM_OPTIONS(state, payload) {
    state.options = payload;
  },
  CLEAR_ITEM(state) {
    state.item = {};
  },
  CLEAR_DATA(state) {
    state.item = {};
    state.items = [];
  },
  CREATE_ITEM(state, item) {
    state.items.push(item);
  },
  REMOVE_ITEM(state, id) {
    state.items = state.items.filter(value => value.id !== id);
  },
}

export const getters = {
  items: (state) => state.items,
  item: (state) => state.item,
  options: (state) => state.options,
  history: (state) => state.history,
};
