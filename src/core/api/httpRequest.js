import { restUtils } from '../utils/index'

// Constants
import { BASE_URL } from "../constants"
import { ssStorage } from '../utils/sessionStorage'


function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + ssStorage.get('access_token')
    }
}

export const httpRequest = {
	/**
	 * Fetch video search results from the Youtube API
	 * @param uri
	 * @param params
	 * @returns {Promise.<TResult>}
	 */

    post: (uri, params) => {
        const options = {
            headers: getHeaders(),
            method: "POST",
            body: JSON.stringify(params)
        }

        return fetch ( `${BASE_URL}${uri}`, options )
			.then ( restUtils.handleRestResponse )
			.then ( ( response ) => response )
    },

    /**
	 * Fetch video search results from the Youtube API
	 * @param uri
	 * @param params
	 * @returns {Promise.<TResult>}
	 */

    put: (uri, params) => {
        const options = {
            headers: getHeaders(),
            method: "PUT",
            body: JSON.stringify(params)
        }

        return fetch ( `${BASE_URL}${uri}`, options )
			.then ( restUtils.handleRestResponse )
			.then ( ( response ) => response )
    },

    /**
	 * Fetch video search results from the Youtube API
	 * @param uri
	 * @param params
	 * @returns {Promise.<TResult>}
	 */

    get: (uri) => {
        const options = {
            headers: getHeaders(),
            method: "GET",
        }

        return fetch ( `${BASE_URL}${uri}`, options )
			.then ( restUtils.handleRestResponse )
			.then ( ( response ) => response )
    },

    /**
	 * Fetch video search results from the Youtube API
	 * @param uri
	 * @param params
	 * @returns {Promise.<TResult>}
	 */

    delete: (uri) => {
        const options = {
            headers: getHeaders(),
            method: "DELETE"
        }

        return fetch ( `${BASE_URL}${uri}`, options )
			.then ( restUtils.handleRestResponse )
			.then ( ( response ) => response )
    },
}