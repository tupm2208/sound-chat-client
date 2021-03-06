
// Libs & utils
import queryString from 'query-string'
import { restUtils } from '../utils/index'

import config from "../configs" 

export const youtubeApi = {
	/**
	 * Fetch video search results from the Youtube API
	 * @param query
	 * @param videoType
	 * @returns {Promise.<TResult>}
	 */
	fetchYoutubeSearchResults: ( query, videoType = 'any' ) => {
		const options = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		}

		const params = queryString.stringify ( {
			videoType,
			'key': config.YOUTUBE_API_KEY,
			'q': query,
			'part': 'snippet',
			'type': 'video',
			'maxResults': 50
		} )

		return fetch ( `${config.YOUTUBE_SEARCH_URL}?${params}`, options )
			.then ( restUtils.handleRestResponse )
			.then ( ( response ) => response )
	},

	/**
	 * Fetch video search results from the Youtube API
	 * @param id
	 * @param videoType
	 * @returns {Promise.<TResult>}
	 */
	fetchYoutubeIdResults: ( id, videoType = 'any' ) => {
		const options = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		}

		const params = queryString.stringify ( {
			videoType,
			'key': config.YOUTUBE_API_KEY,
			'id': id,
			'part': 'snippet',
		} )

		return fetch ( `${config.YOUTUBE_API_BASE_URL}/videos?${params}`, options )
			.then ( restUtils.handleRestResponse )
			.then ( ( response ) => response )
	}
}