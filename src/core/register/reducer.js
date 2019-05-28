import Immutable from 'seamless-immutable'

import {registerAction} from './index'

const initialState = Immutable( {
    email: "", 
    name: "",
    id: "",
    message: "",
    status: true
})

export const registerReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case registerAction.REGISTER_SUCCESS_STATE:
            return state.merge(action.payload);
        case registerAction.REGISTER_ERROR_STATE:
            return state.merge(action.payload);
        case 'URL_CHANGE':
            return state.set('message', '')
        default: 
            return state
    }
}