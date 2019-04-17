// Libs & utils
import Immutable from 'seamless-immutable'

// Actions
import { loginAction } from './index'

const initialState = Immutable ( {
	access_token: "",
	email: "",
	name: "",
	id: "",
	message: "",
	status: true
} )

export const loginReducer = ( state = initialState, action ) => {
	switch ( action.type ) {

		case loginAction.LOGIN_SUCCESS_STATE:
			return state.merge(action.payload);

		case loginAction.LOGIN_ERROR_STATE:
			return state.merge(action.payload);

		default:
			return state
	}
}