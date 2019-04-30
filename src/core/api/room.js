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
	},

	get: (id, type) => {
		const params = {type}

		return httpRequest.get(`rooms/${id}/media`, params)
	},

	changeMediaState: (id, params) => {

		return httpRequest.put(`rooms/${id}/media`, params)
	},

	getRoomUsers: (id) => {

		return httpRequest.post(`rooms/${id}/users`)
	},

	getRoomInfo: (id) => {

		return httpRequest.get(`rooms/${id}`)
	},

	joinRoom: (fingerprint) => {

		const params = {fingerprint};

		return httpRequest.post('rooms/fingerprint', params);
	}
}