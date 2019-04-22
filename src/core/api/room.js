import { httpRequest } from './httpRequest'

export const roomApi = {
	/**
	 * Fetch video search results from the Youtube API
	 * @param username
	 * @param password
	 * @returns {Promise.<TResult>}
	 */
	create: ( id ) => {
        const params = {id}

		return httpRequest.post('rooms', params);
	}
}