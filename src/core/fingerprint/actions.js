
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
				dispatch({
					type: 'TOASTER',
					payload: {
						message: error.message,
						error: 1
					}
				})
			});
		}
	},
}