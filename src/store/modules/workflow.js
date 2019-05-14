import {SET_TASK} from '../mutation-types'

const workflow={
    namespaced: true,
    state:{
        task:null
    },
    mutations:{
        [SET_TASK](state,task){
            state.task=task
        }
    }
}

export default workflow