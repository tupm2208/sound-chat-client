// Libs & utils
import Immutable from 'seamless-immutable'

// Actions
import { roomListActions } from './index'

const initialState = Immutable ( {
	isFetching: false,
	roomList: [],
	error: null
} )

export const roomListReducer = ( state = initialState, action ) => {
	switch ( action.type ) {

		case roomListActions.IS_FETCHING:
			return Immutable.set ( state, 'isFetching', action.payload )

		case roomListActions.SET_ROOM_LIST_RESULTS:
			return Immutable.set ( state, 'roomList', action.payload )

		default:
			return state
	}
}