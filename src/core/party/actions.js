//=====================================
//  Party Actions : Containing WEBSOCKET connected actions:
//					These actions automatically get send to the backend/server
//					as messages over websockets. This is handled automatically through
//					the middleware 'redux-socket.io' by prefixing these specific actions
// 					with the string 'WS_TO_SERVER_'.
//-------------------------------------
import { roomApi, youtubeApi, pusherApi, messageApi, mediaApi } from '../api/index'

export const partyActions = {

	GET_MEDIA_SUCCESSFUL: 'GET_MEDIA_SUCCESSFUL',
	GET_VIDEO_FROM_ID_SUCCESSFUL: 'GET_VIDEO_FROM_ID_SUCCESSFUL',
	ROOM_CREATED: 'ROOM_CREATED',
	GET_ROOM_SUCCESSFUL: 'GET_ROOM_SUCCESSFUL',
	GET_VIDEO_SUCCESSFUL: 'GET_VIDEO_SUCCESSFUL',
	SET_VIDEO_PLAYER_STATE: 'SET_VIDEO_PLAYER_STATE',
	NEW_INCOME_MESSAGE: 'NEW_INCOME_MESSAGE',
	END_VIDEO: 'END_VIDEO',
	MEDIA_EVENT_DATA: 'MEDIA_EVENT_DATA',
	VOTE_MEDIA: 'VOTE_MEDIA',
	DELETE_MEDIA: 'DELETE_MEDIA',
	EXIT_PARTYCIPANT: 'EXIT_PARTYCIPANT',
	NEW_PARTYCIPANT: 'NEW_PARTYCIPANT',

	createParty: (videoDetails, videoSource) => {
		return {
			type: partyActions.WS_TO_SERVER_CREATE_PARTY,
			payload: { ...videoDetails, videoSource }
		}
	},

	unSubscribeRoom: (id) => {
		return dispatch => {
			pusherApi.pusher.unsubscribe(`presence-room-${id}-`);
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
				dispatch({
					type: partyActions.NEW_INCOME_MESSAGE,
					payload: data
				})
			})

			channel.bind('proceed', (data) => {
				console.log("proceed: ", data);
				if(data.url) {
					partyActions.getPlayingVideo(data.url, dispatch, data, data.id);
					dispatch({
						type: partyActions.DELETE_MEDIA,
						payload: data
					})
				} else {
					dispatch({
						type: 'TOASTER',
						payload: {
							message: "No song is playing! Please adding new url to play!",
							error: 0
						}
					})
				}
			})

			channel.bind('new_media', (data) => {
				console.log("new media created: ", data)
				const id = getYoutubeId(data.url);
				youtubeApi.fetchYoutubeIdResults(id).then( res => {
					if(res.items.length) {
						data.data = res.items[0].snippet
					}

					dispatch({
						type: partyActions.MEDIA_EVENT_DATA,
						payload: {
							media: data
						}
					})
				})
			})

			channel.bind('up_vote', data => {
				console.log("upvote: ", data);
				dispatch({
					type: partyActions.VOTE_MEDIA,
					payload: data
				})
			})

			channel.bind('down_vote', data => {
				console.log("down_vote: ", data);
				dispatch({
					type: partyActions.VOTE_MEDIA,
					payload: data
				})
			})

			channel.bind('new_participant', data => {
				console.log("new_participant: ", data);
				data.user = {
					name: data.name,
					id: data.user_id
				}
				dispatch({
					type: partyActions.NEW_PARTYCIPANT,
					payload: data
				})
			})

			channel.bind('exit_participant', data => {
				console.log("exit_participant: ", data);
				dispatch({
					type: partyActions.EXIT_PARTYCIPANT,
					payload: data
				})
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
							message: "No song is playing! Please adding new url to play!",
							error: 0
						}
					})
				}
			}, error => {
				console.log("error :", error);
			})
		}
	},

	getPlayingVideo: (url, dispatch, data, id) => {
		const youtubeId = getYoutubeId(url);
		console.log("res media: ", youtubeId);
		youtubeApi.fetchYoutubeIdResults(youtubeId).then(yRes => {
			console.log("yres: ", yRes);

			dispatch({
				type: partyActions.GET_VIDEO_SUCCESSFUL,
				payload: {
					selectedVideo: {
						videoSource: 'youtube',
						...yRes.items[0],
						...yRes.items[0].snippet,
						media_id: id
					}
				}
			})

			if(id) {
				dispatch({
					type: partyActions.DELETE_MEDIA,
					payload: {id}
				})
			}

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
			dispatch({type: "START_LOADING"})
			console.log("partyid: ", partyId);
			messageApi.send(partyId, message).then(res => {
				dispatch({type: "STOP_LOADING"})
			}, error => {
				dispatch({type: "STOP_LOADING"})
			})
		}
	},

	getRoomInfo: (partyId) => {

		return dispatch => {
			dispatch({type: "START_LOADING"})
			dispatch({
				type: partyActions.GET_VIDEO_SUCCESSFUL,
				payload: {
					usersInParty: [],
					messagesInParty: [],
					fingerprint: [],
					medias: []
				}
			})

			roomApi.getRoomInfo(partyId).then( res => {
				console.log("room info: ", res)

				dispatch({
					type: partyActions.GET_VIDEO_SUCCESSFUL,
					payload: {
						usersInParty: res.data.participants,
						messagesInParty: res.data.messages,
						fingerprint: res.data.fingerprint
					}
				})
				dispatch({type: "STOP_LOADING"})
				partyActions.getVideoInfo(res.data.media, dispatch)
			}, error => {
				dispatch({type: "STOP_LOADING"})
			})
		}
	},

	addMediaLink: (url, partyId) => {

		return dispatch => {
			const id = getYoutubeId(url);
			youtubeApi.fetchYoutubeIdResults(id).then( video => {
				if(video.items.length) {
					
					mediaApi.create(partyId, url).then(res => {
					}, error => {
						dispatch({
							type: "TOASTER",
							payload: {
								error: 1,
								message: `cannot create media?${new Date().getTime()}`
							}
						})
					})
				} else {
					dispatch({
						type: "TOASTER",
						payload: {
							error: 1,
							message: `invalid youtube link?${new Date().getTime()}`
						}
					})
				}
			})
			
		}
	},

	getVideoInfo: (medias = [], dispatch) => {

		if(!medias.length) {
			dispatch({
				type: partyActions.GET_VIDEO_SUCCESSFUL,
				payload: {
					medias: []
				}
			})

			return;
		}
		const infoMedias = [];
		medias.forEach( (media, index) => {
			const videoId = getYoutubeId(media.url);
			youtubeApi.fetchYoutubeIdResults(videoId).then(data => {
				if(data.items.length) {
					media.data = data.items[0].snippet
					infoMedias.push(media)

					dispatch({
						type: partyActions.GET_VIDEO_SUCCESSFUL,
						payload: {
							medias: infoMedias.concat()
						}
					})
				}
			})
		})

		
	}
}

function getYoutubeId(url) {
	if(url) {
		if(url.split('v=')[1]) {
			return url.split('v=')[1].split("&")[0]
		}
	}
	return ''
}
