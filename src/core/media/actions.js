//=====================================
//  Party Actions : Containing WEBSOCKET connected actions:
//					These actions automatically get send to the backend/server
//					as messages over websockets. This is handled automatically through
//					the middleware 'redux-socket.io' by prefixing these specific actions
// 					with the string 'WS_TO_SERVER_'.
//-------------------------------------
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
			dispatch({type: "START_LOADING"})
			mediaApi.upvote(media.id, partyId).then( res => {
				media.is_voted = true;
				dispatch({type: "STOP_LOADING"})
				dispatch({
					type: "VOTE_MEDIA",
					payload: media
				})
			}, error => {
				dispatch({type: "STOP_LOADING"})
			})
		}
	},
	downvote: (media) => {
		return dispatch => {
			dispatch({type: "START_LOADING"})
			mediaApi.downvote(media.id).then( res => {
				media.is_voted = false;
				dispatch({type: "STOP_LOADING"})
				dispatch({
					type: "VOTE_MEDIA",
					payload: media
				})
			}, error => {
				dispatch({type: "STOP_LOADING"})
			})
		}
	},
}