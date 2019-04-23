//=====================================
//  Party Actions : Containing WEBSOCKET connected actions:
//					These actions automatically get send to the backend/server
//					as messages over websockets. This is handled automatically through
//					the middleware 'redux-socket.io' by prefixing these specific actions
// 					with the string 'WS_TO_SERVER_'.
//-------------------------------------
import { roomApi } from '../api/index'

export const mediaActions = {

	SET_VIDEO_PLAYER_STATE: 'SET_VIDEO_PLAYER_STATE',
	GET_MEDIA_SUCCESSFUL: 'GET_MEDIA_SUCCESSFUL',

	emitNewPlayerStateForPartyToServer: ( newPlayerState, partyId ) => {
		return (dispatch) => {

			console.log("newPlayerState: ", newPlayerState, partyId)
			dispatch({
				type: mediaActions.SET_VIDEO_PLAYER_STATE,
				payload: { media_time: newPlayerState.media_time}
			})
			roomApi.changeMediaState(partyId, newPlayerState).then( res => {
				console.log("emit: ", res);
			})
		}
	},

}