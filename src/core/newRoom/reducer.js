// Libs & utils
import Immutable from 'seamless-immutable'

// Actions
import { newRoomAction } from './index'

const initialState = Immutable ( {
	name: "",
	isShow: false,
	userId: 0,
	videoId: ''
} )

export const newRoomReducer = ( state = initialState, action ) => {
	switch ( action.type ) {

		case newRoomAction.SET_ROOM_NAME:
			return state.merge(action.payload);

		case newRoomAction.TOGGLE_SET_ROOM_NAME_POPUP:
			return state.set('isShow', action.payload)
			
		case 'URL_CHANGE':
			return Immutable ( {
				name: "",
				isShow: false,
				userId: 0,
				videoId: ''
			} )
		default:
			return state
	}
}