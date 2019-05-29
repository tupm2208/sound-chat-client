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
		videoSource: '',
		media_id: 0
	},
	usersInParty: [],
	messagesInParty: [],
	fingerprint: '',
	medias: [],
	name: ''
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
			let flag = false;
			newMedias.forEach(e => {
				if(e.id === action.payload.media.id) {
					flag = true;
				}
			})
			if(!flag) newMedias.push(action.payload.media);

			return state.set("medias", newMedias);

		case partyActions.VOTE_MEDIA:
			const newMedias2 = JSON.parse(JSON.stringify(state.medias))
			newMedias2.forEach(element => {
				if(action.payload.id === element.id) {
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
		
		case partyActions.EXIT_PARTYCIPANT:
			return state.set("usersInParty", state.usersInParty.filter(element => {
				return element.user_id !== action.payload.user_id
			}))

		case partyActions.NEW_PARTYCIPANT:
			const users = JSON.parse(JSON.stringify(state.usersInParty))
			let isContained = false;

			users.forEach(element => {
				if(element.user_id === action.payload.user_id) {
					isContained = true;
				}
			})

			if(!isContained) {
				users.push(action.payload)
			}
			return state.set("usersInParty", users)

		case "URL_CHANGE": 

			return Immutable ( {
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
		default:
			return state
	}
}