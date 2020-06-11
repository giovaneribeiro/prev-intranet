import Vue from 'vue'
import Vuex from 'vuex'

import snackbar from '@/store/modules/snackbar'
import empresa from '@/store/modules/empresa'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { snackbar, empresa }
})
