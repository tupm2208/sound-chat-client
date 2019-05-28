
import { roomApi, mediaApi } from '../api/index'

export const mediaActions = {

	SET_VIDEO_PLAYER_STATE: 'SET_VIDEO_PLAYER_STATE',
	GET_MEDIA_SUCCESSFUL: 'GET_MEDIA_SUCCESSFUL',

	emitNewPlayerStateForPartyToServer: ( newPlayerState, partyId ) => {
		return (dispatch) => {
		
			if(newPlayerState.status === "finished") {
				dispatch({
					type: "END_VIDEO"
				})
			}
			roomApi.changeMediaState(partyId,newPlayerState);
		}
	},
	upvote: (media, partyId) => {
		return dispatch => {
			mediaApi.upvote(media.id, partyId).then( res => {
				media.is_voted = true;
				media.total_vote = res.data.total_vote
				dispatch({
					type: "VOTE_MEDIA",
					payload: media
				})
			}, error => {
			})
		}
	},
	downvote: (media) => {
		return dispatch => {
			dispatch({type: ""})
			mediaApi.downvote(media.id).then( res => {
				media.is_voted = false;
				media.total_vote = res.data.total_vote
				dispatch({
					type: "VOTE_MEDIA",
					payload: media
				})
			}, error => {
			})
		}
	},
}