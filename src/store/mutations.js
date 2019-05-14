import * as types from './mutation-types'

const mutations = {
    [types.SET_LOCATION](state, data) {
        state.location_Provices = data.Province
        state.location_Citys = data.City
    },
    [types.SET_FLOWCATEGORY](state, data) {
        state.flow_category = data
    },
    [types.SET_FLOWTYPE](state, data) {
        state.flowtype = data
    },
    [types.SET_BU](state, data) {
        state.BU = data
    },
    [types.SET_COMMON](state, data) {
        state.Global_Config = data
    },
    [types.SET_USER](state, data) {
        state.user = data
    },
    [types.SET_HOSIPITALS](state, data) {
        state.hosipitals = data
    }
}

export default mutations