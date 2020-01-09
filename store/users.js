export const state = () => ({
  item: {},
  users: [],
});

export const actions = {
  async getItems ({ commit, state }, pageSize = 1000) {
    const res  = await this.$axios.get(`/users?page_size=${pageSize}`);
    commit('SET_ITEMS', res.data);
  },

  async getItem ({ commit, state }, { id, ...params } = {}) {
    const response = await this.$axios.get(`/users/${id}`, { params })
    commit('SET_ITEM', response.data);
  },

  async createItem({ commit, state }, payload) {
    const res  = await this.$axios.post('/users', payload);
    commit('ADD_ITEM', res);
  },

  async updateItem({ commit, state }, payload) {
    await this.$axios.put(`/users/${payload.id}`, payload.formData)
  },

  async removeItem ({ commit }, params) {
    await this.$axios.delete(`/users/${params}`);
  },
};

export const mutations = {
  SET_ITEMS(state, payload) {
    state.users = payload.data.users
  },
  SET_ITEM(state, payload) {
    state.item = payload.data.user;
  },
  ADD_ITEM(state, payload) {
    state.users.push(payload);
  },
  UPDATE_ITEM(state, payload) {
    state.users = state.users.map((user) => {
      return (payload.id === user.id) ? payload : user;
    });
  },
  DELETE_ITEM(state, id) {
    state.users = state.users.filter((user) => {
      return user.id !== id;
    });
  },
  CLEAR_DATA(state) {
    state.item = {};
    state.users = [];
  },
};

export const getters = {
  data: (state) => state.users,
  item: (state) => state.item,
};
