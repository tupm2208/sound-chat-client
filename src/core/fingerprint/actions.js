//=====================================
//  Party Actions : Containing WEBSOCKET connected actions:
//					These actions automatically get send to the backend/server
//					as messages over websockets. This is handled automatically through
//					the middleware 'redux-socket.io' by prefixing these specific actions
// 					with the string 'WS_TO_SERVER_'.
//-------------------------------------
import { roomApi } from '../api/index'
import {ssStorage} from '../utils/sessionStorage'

export const fingerprintActions = {

	joinRoom: ( fingerprint, router) => {
		return (dispatch) => {
			
			const access_token = ssStorage.get('access_token');

			if(!access_token) {
				router.push({pathname: "/login", query: {redirect: router.location.pathname}});
				return;
			}
			dispatch({type: "START_LOADING"})
			roomApi.joinRoom(fingerprint).then( res => {
				dispatch({type: 'STOP_LOADING'})
				console.log("join room: ", res);
				router.push(`/party/${res.data.id}`)
			}, error => {
				dispatch({type: 'STOP_LOADING'})
				console.log("error join room: ", error);
			});
		}
	},
}