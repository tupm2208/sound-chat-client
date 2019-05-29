// Libs & utils
import Immutable from 'seamless-immutable'

// Actions
import { fingerprintActions } from './index'

const initialState = Immutable ( {
	isInit: false
} )

export const fingerprintReducer = ( state = initialState, action ) => {
	switch ( action.type ) {

		case fingerprintActions.SET_IS_INIT:
			return state.set('isInit', action.payload)

		default:
			return state
	}
}