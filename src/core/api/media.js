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
	},

	upvote: (media_id, room_id) => {
		const params = {room_id}
		return httpRequest.post(`media/${media_id}/vote`, params)
	},

	downvote: (media_id) => {
		
		return httpRequest.delete(`media/${media_id}/vote`)
	}
}