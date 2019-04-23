// Libs & utils
import Immutable from 'seamless-immutable'

// Actions
import { mediaActions } from './index'

const initialState = Immutable ( {
	status: 'pausing',
	media_time: 0,
	total_vote: 0,
	url: ''
} )

export const mediaReducer = ( state = initialState, action ) => {
	switch ( action.type ) {

		case mediaActions.SET_VIDEO_PLAYER_STATE:

			// if(action.payload.status === 'seeking' ) {
			// 	action.payload.status = 'pausing'
			// }
			return state.merge(action.payload)
		
		case mediaActions.GET_MEDIA_SUCCESSFUL:
			
			return state.merge(action.payload)

		default:
			return state
	}
}