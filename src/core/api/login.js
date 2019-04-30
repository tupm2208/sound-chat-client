import { httpRequest } from './httpRequest'

export const baseApi = {
	/**
	 * Fetch video search results from the Youtube API
	 * @param username
	 * @param password
	 * @returns {Promise.<TResult>}
	 */
	login: ( email, password ) => {
        const params = {email, password}

		return httpRequest.post('login', params);
	}
}