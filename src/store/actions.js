import * as types from './mutation-types'

//设置流程类别的过滤条件
export const set_FlowCategory = function ({ commit, state }, data) {
    commit(types.SET_FLOWCATEGORY, data)
}

//首页一次性加载并保存到VUEX
export const set_flowtype = function ({ commit, state }, data) {
    commit(types.SET_FLOWTYPE, data)
}
export const set_user = function ({ commit, state }, data) {
    commit(types.SET_USER, data)
}
export const set_bu = function ({ commit, state }, data) {
    commit(types.SET_BU, data)
}
export const set_Common = function ({ commit, state }, data) {
    commit(types.SET_COMMON, data)
}
export const set_hosipitals = function ({ commit, state }, data) {
    commit(types.SET_HOSIPITALS, data)
}
export const set_location = function ({ commit, state }, data) {
    commit(types.SET_LOCATION, data)
}