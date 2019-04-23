// Libs & utils
import Immutable from 'seamless-immutable'

// Actions
import { partyActions } from './index'

const initialState = Immutable ( {
	id: null,
	partyState: 'active',
	selectedVideo: {
		id: '',
		title: '',
		description: '',
		thumbnailSrc: '',
		videoSource: ''
	},
	usersInParty: [],
	messagesInParty: [],
} )

export const partyReducer = ( state = initialState, action ) => {
	switch ( action.type ) {

		case partyActions.GET_VIDEO_SUCCESSFUL:
			return state.merge(action.payload)

		default:
			return state
	}
}