import * as types from '../mutation-types'

const state = {
    vendor_id: "",
    company: {
        baseinfo: {},
        manager_info: {},
        contacts: [],
        additional_warehouses: [],

        business_license: {},
        medical_business_license: {},
        medical_business_license_second: {},
        other_license: {}
    },
    agent_intention: {},
};

const actions = {
    save_baseinfo({ commit, state }, data) {
        commit(types.SAVE_BASEINFO, data)
    },

    save_certificates({ commit, state }, data) {
        commit(types.SAVE_CERTIFICATES, data)
    },

    save_agentintention({ commit, state }, data) {
        commit(types.SAVE_AGENTINTENTION, data)
    },
    set_vendorinfo({ commit, state }, data) {
        commit(types.SET_VENDORINFO, data)
    },
}

const getters = {
    company: state => { return state.company },

    g_agent_intention: state => { return state.agent_intention },

    baseinfo: state => { return state.company.baseinfo },

    manager_info: state => { return state.company.manager_info },

    contacts: state => { return state.company.contacts },

    additional_warehouses: state => { return state.company.additional_warehouses },

    business_license: state => { return state.company.business_license },
    medical_business_license: state => { return state.company.medical_business_license },
    medical_business_license_second: state => { return state.company.medical_business_license_second },
    other_license: state => { return state.company.other_license }

    

};

const mutations = {
    //代理意向Push到Store
    [types.SAVE_AGENTINTENTION](state, data) {
        state.agent_intention = data;
    },
    //公司基础信息Push到Store
    [types.SAVE_BASEINFO](state, data) {
        state.company.baseinfo = data.baseinfo;
        state.company.manager_info = data.manager_info;
        state.company.contacts = data.contacts;
        state.company.additional_warehouses = data.additional_warehouses;
    },
    //公司证件Push到Store
    [types.SAVE_CERTIFICATES](state, data) {
        state.company.business_license = data.business_license;
        state.company.medical_business_license = data.medical_business_license;
        state.company.medical_business_license_second =
            data.medical_business_license_second;
        state.company.other_license = data.other_license;
    },
    //获取Vendor信息
    [types.SET_VENDORINFO](state, data) {
        state.company = data.company;
        state.agent_intention = data.agent_intention;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};