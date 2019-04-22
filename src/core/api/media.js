import { httpRequest } from './httpRequest'

export const mediaApi = {
	/**
	 * Fetch video search results from the Youtube API
	 * @param username
	 * @param password
	 * @returns {Promise.<TResult>}
	 */
	create: ( room_id, url ) => {
        const params = {room_id, url}

		return httpRequest.post('media', params);
	}
}