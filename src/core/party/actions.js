//=====================================
//  Party Actions : Containing WEBSOCKET connected actions:
//					These actions automatically get send to the backend/server
//					as messages over websockets. This is handled automatically through
//					the middleware 'redux-socket.io' by prefixing these specific actions
// 					with the string 'WS_TO_SERVER_'.
//-------------------------------------
import { roomApi, youtubeApi, pusherApi, messageApi } from '../api/index'

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
				data.data.status = data.event;
				dispatch({
					type: partyActions.SET_VIDEO_PLAYER_STATE,
					payload: data.data
				});
			})

			channel.bind('new_message', data => {
				console.log("new message: ", data);
			})

			channel.bind('proceed', (data) => {
				console.log("proceed: ", data);
				if(data.url) {
					partyActions.getPlayingVideo(data.url, dispatch, data);
				} else {
					dispatch({
						type: 'TOASTER',
						payload: {
							message: "no song is playing! please adding new url to play!",
							error: 0
						}
					})
				}
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
				if(res.data.url) {
					partyActions.getPlayingVideo(res.data.url, dispatch);
				} else {
					dispatch({
						type: 'TOASTER',
						payload: {
							message: "no song is playing! please adding new url to play!",
							error: 0
						}
					})
				}
			}, error => {
				console.log("error :", error);
			})
		}
	},

	getPlayingVideo: (url, dispatch, data) => {
		const youtubeId = url.split('v=')[1];
		console.log("res media: ", youtubeId);
		youtubeApi.fetchYoutubeIdResults(youtubeId).then(yRes => {
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

			if(data) {
				dispatch({
					type: partyActions.SET_VIDEO_PLAYER_STATE,
					payload: data
				});
			}
		})
	},

	sendMessageToParty: ( message, partyId ) => {
		return dispatch => {
			console.log("partyid: ", partyId);
			messageApi.send(partyId, message)
		}
	},

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