import { restUtils } from '../utils/index'

// Constants
import { BASE_URL } from "../constants"

export const baseApi = {
	/**
	 * Fetch video search results from the Youtube API
	 * @param username
	 * @param password
	 * @returns {Promise.<TResult>}
	 */
	login: ( email, password ) => {
        const params = {email, password}

		const options = {
			method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
		}

		return fetch ( `${BASE_URL}login`, options )
			.then ( restUtils.handleRestResponse )
			.then ( ( response ) => response )
	}
}