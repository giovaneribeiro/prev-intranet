export default {
  state: {
    empresa: null
  },
  getters: {
    empresa (state) {
      return state.empresa
    }
  },
  mutations: {
    setEmpresa (state, empresa) {
      state.empresa = empresa
    }
  }
}
