// Libs & utils
import Immutable from 'seamless-immutable'

// Actions
import { loadingActions } from './index'

const initialState = Immutable ( {
	status: false
} )

export const loadingReducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case loadingActions.START:
			return Immutable.set ( state, 'status', true )

		case loadingActions.STOP:
			return Immutable.set ( state, 'status', false )

		default:
			return state
	}
}