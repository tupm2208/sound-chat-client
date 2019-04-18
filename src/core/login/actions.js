// Utils & libs

import { baseApi } from '../api/index'

export const loginAction = {
	LOGIN_SUCCESS_STATE: 'LOGIN_SUCCESS_STATE',
	LOGIN_ERROR_STATE: 'LOGIN_ERROR_STATE',

	loginSuccess: res => ({
		type: loginAction.LOGIN_SUCCESS_STATE,
		payload: res
	}),

	loginError: error => ({
		type: loginAction.LOGIN_ERROR_STATE,
		payload: error
	}),


	login: ( email, password, router ) => {
		return async function ( dispatch ) {
			dispatch({type: "START_LOADING"})
			await baseApi.login(email, password).then( res => {
				
				const {data, message, access_token} = res;
				sessionStorage.setItem('user', JSON.stringify(data));
				sessionStorage.setItem('access_token', access_token);

				dispatch (loginAction.loginSuccess ({message, status: true}))
				// dispatch ({
				// 	type: 'NAVIGATE_TO_PATH',
				// 	payload: '/'
				// })
				router.push('/')
			}, error => {
				console.log(error);
				
				dispatch(loginAction.loginError(error))
			})
			dispatch({type: "STOP_LOADING"})
			
		}
	}
}