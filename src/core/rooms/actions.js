// API
import { youtubeApi, roomApi, mediaApi } from '../api/index'

export const roomListActions = {
	IS_FETCHING: 'IS_FETCHING',
	SET_ROOM_LIST_RESULTS: 'SET_ROOM_LIST_RESULTS',


	isFetching: bool => ({
		type: roomListActions.IS_FETCHING,
		payload: bool
	}),

	setRoomListResults: results => ({
		type: roomListActions.SET_ROOM_LIST_RESULTS,
		payload: results
	}),

	/**
	 * Handle the selection of a room
	 */
	handleRoomSelection: (roomId, router) => {
		return function ( dispatch ) {
            router.push(`/party/${roomId}`);
		}
	},

	
	loadRoomList: () => {
		return async function ( dispatch ) {
			try {
				dispatch ( roomListActions.isFetching ( true ) )
				// Fetch the search results and save them in store
                const res = await roomApi.getAllRooms()
				dispatch ( roomListActions.setRoomListResults ( res.data ) )
				dispatch ( roomListActions.isFetching ( false ) )
			}
			catch ( err ) {
			}
		}
	}
}