//=====================================
//  Party Actions : Containing WEBSOCKET connected actions:
//					These actions automatically get send to the backend/server
//					as messages over websockets. This is handled automatically through
//					the middleware 'redux-socket.io' by prefixing these specific actions
// 					with the string 'WS_TO_SERVER_'.
//-------------------------------------
import { roomApi, youtubeApi, pusherApi } from '../api/index'

export const partyActions = {

	GET_MEDIA_SUCCESSFUL: 'GET_MEDIA_SUCCESSFUL',
	GET_VIDEO_FROM_ID_SUCCESSFUL: 'GET_VIDEO_FROM_ID_SUCCESSFUL',
	ROOM_CREATED: 'ROOM_CREATED',
	GET_ROOM_SUCCESSFUL: 'GET_ROOM_SUCCESSFUL',
	GET_VIDEO_SUCCESSFUL: 'GET_VIDEO_SUCCESSFUL',
	SET_VIDEO_PLAYER_STATE: 'SET_VIDEO_PLAYER_STATE',

	createParty: (videoDetails, videoSource) => {
		return {
			type: partyActions.WS_TO_SERVER_CREATE_PARTY,
			payload: { ...videoDetails, videoSource }
		}
	},


	subscribeRoom: (id) => {
		return dispatch => {
			const channel = pusherApi.pusher.subscribe(`presence-room-${id}-`);
			channel.bind('media_status_changed', (data) => {
				console.log("media_status_changed", data);
				dispatch({
					type: partyActions.SET_VIDEO_PLAYER_STATE,
					payload: data.data
				});
			})
		}
	},

	getParty: (id) => {
		return (dispatch) => {
			roomApi.get(id, 'current').then( res => {
				dispatch({
					type: partyActions.GET_MEDIA_SUCCESSFUL,
					payload: res.data
				})
				const youtubeId = res.data.url.split('v=')[1];
				console.log("res media: ", youtubeId);
				youtubeApi.fetchYoutubeIdResults(youtubeId).then( yRes => {
					console.log("yres: ", yRes);

					dispatch({
						type: partyActions.GET_VIDEO_SUCCESSFUL,
						payload: {
							selectedVideo: {
								videoSource: 'youtube',
								...yRes.items[0],
								...yRes.items[0].snippet
							}
						}
					})
				})
			}, error => {
				console.log("error :", error);
			})
		}
	},

	sendMessageToParty: ( message, userName, partyId ) => ({
		type: partyActions.WS_TO_SERVER_SEND_MESSAGE_TO_PARTY,
		payload: { message, userName, partyId }
	}),

	getRoomInfo: (partyId) => {

		return dispatch => {

			roomApi.getRoomInfo(partyId).then( res => {
				console.log("room info: ", res)

				dispatch({
					type: partyActions.GET_VIDEO_SUCCESSFUL,
					payload: {
						usersInParty: res.data.participants,
						messagesInParty: res.data.messages
					}
				})
			})
		}
	}
}