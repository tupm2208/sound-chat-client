// Utils & libs

import { baseApi, pusherApi } from '../api/index'
import { ssStorage } from '../utils/sessionStorage'

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
				ssStorage.set('user', data);
				ssStorage.set('access_token', access_token);
				pusherApi.changeAccessToken(access_token);
				if(router.location.query.redirect) {
					router.push(router.location.query.redirect)
				} else {
					router.push('/')
				}
				dispatch({
					type: 'LOGIN_SUCCESS'
				})
				dispatch({
					type: 'SET_USER',
					payload: data
				})
				dispatch (loginAction.loginSuccess ({message, status: true}))
				dispatch({
                    type: 'TOASTER',
                    payload: {
                        error: 0,
                        message: "Login successful!"
                    }
                })
			}, error => {
				console.log(error);
				
				// dispatch(loginAction.loginError(error))
				dispatch({
                    type: 'TOASTER',
                    payload: {
                        error: 1,
                        message: "Wrong email or password!"
                    }
                })
			})
			dispatch({type: "STOP_LOADING"})
			
		}
	}
}