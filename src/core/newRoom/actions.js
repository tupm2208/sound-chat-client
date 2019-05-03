

export const newRoomAction = {
	SET_ROOM_NAME: 'SET_ROOM_NAME',
	TOGGLE_SET_ROOM_NAME_POPUP: 'TOGGLE_SET_ROOM_NAME_POPUP',

	setRoomName: (name, callback) => dispatch => {
		if(!name) {
			dispatch({
				type: 'TOASTER',
				payload: {
					error: 0,
					message: 'room name cannot be null!'
				}
			})
		} else {
			dispatch({
				type: newRoomAction.SET_ROOM_NAME,
				payload: {
					isShow: false,
					name
				}
			})
			callback(name);
		}
	},

	showPopup: () => dispatch => {
		dispatch( {
			type: newRoomAction.TOGGLE_SET_ROOM_NAME_POPUP,
			payload: true
		})
	},

	setPreData: (userId, videoId) => dispatch => {
		dispatch({
			type: newRoomAction.SET_ROOM_NAME,
			payload: {
				userId, videoId
			}
		})
	}
}