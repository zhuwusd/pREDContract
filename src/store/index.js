import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger' // 打印修改日志

import Distributor from './modules/Distributor'
import workflow from './modules/workflow'

Vue.use(Vuex)
    // 调试工具
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    modules: {
        Distributor,
        workflow
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})