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


	login: ( email, password ) => {
		return async function ( dispatch ) {
			await baseApi.login(email, password).then( res => {
				
				const {data, message, access_token} = res;
				sessionStorage.setItem('user', JSON.stringify(data));
				sessionStorage.setItem('access_token', access_token);

				dispatch (loginAction.loginSuccess ({message, status: true}))
			}, error => {
				console.log(error);
				
				dispatch(loginAction.loginError(error))
			})

			
		}
	}
}