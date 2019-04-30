// Libs & utils
import Immutable from 'seamless-immutable'
import { persistUtils } from "../utils/index"

// Actions
import { appActions } from './index'

const initialState = Immutable ( {
	currentPath: '/',
	message: '',
	error: 0,
	isLogin: persistUtils.loadProperty('access_token', '') !== ''
} )

export const appReducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case appActions.NAVIGATE_TO_PATH:
			return Immutable.set ( state, 'currentPath', action.payload )
		case "TOASTER":
			return state.merge(action.payload);
		
		case "LOGIN_STATE":
			return state.merge(action.payload);
		default:
			return state
	}
}