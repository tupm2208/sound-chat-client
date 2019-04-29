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
	fingerprint: '',
	medias: []
} )

export const partyReducer = ( state = initialState, action ) => {
	switch ( action.type ) {

		case partyActions.GET_VIDEO_SUCCESSFUL:
			return state.merge(action.payload)

		case partyActions.NEW_INCOME_MESSAGE:
			return state.set("messagesInParty", state.messagesInParty.concat(action.payload))
		
		case partyActions.END_VIDEO:
			return state.set("selectedVideo", {
				id: '',
				title: '',
				description: '',
				thumbnailSrc: '',
				videoSource: ''
			})

		case partyActions.MEDIA_EVENT_DATA:
			const newMedias = JSON.parse(JSON.stringify(state.medias))

			newMedias.push(action.payload.media);

			return state.set("medias", newMedias);

		case partyActions.VOTE_MEDIA:
			const newMedias2 = JSON.parse(JSON.stringify(state.medias))
			newMedias2.forEach(element => {
				if(action.payload.media === element.id || action.payload.id === element.id) {
					if(action.payload.total_vote !== undefined) {
						element.total_vote = action.payload.total_vote;
					}
					if(action.payload.is_voted !== undefined) {
						element.is_voted = action.payload.is_voted;
					}
				}
			});
			return state.set("medias", newMedias2);

		case partyActions.DELETE_MEDIA: 

		return state.set("medias", state.medias.filter(element => {
			return element.id !== action.payload.id
		}))
		default:
			return state
	}
}