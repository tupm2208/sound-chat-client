// API
import { youtubeApi, roomApi, mediaApi } from '../api/index'

export const videoListActions = {
	IS_FETCHING: 'IS_FETCHING',
	SET_YOUTUBE_RESULTS: 'SET_YOUTUBE_RESULTS',


	isFetching: bool => ({
		type: videoListActions.IS_FETCHING,
		payload: bool
	}),

	setYoutubeResults: results => ({
		type: videoListActions.SET_YOUTUBE_RESULTS,
		payload: results
	}),

	/**
	 * Handle the selection of a video
	 * 1. create a new party in the backend
	 * 2. set the selected videoDetails for the current party
	 * @param videoDetails
	 * @param videoSource
	 * @returns {Function}
	 */
	handleVideoSelection: (userId, videoId, router) => {
		return function ( dispatch ) {
			
			roomApi.create(userId).then( res => {
				console.log("create room success: ", res)

				mediaApi.create(res.data.id, `https://www.youtube.com/watch?v=${videoId}`).then( mediaRes => {
					console.log("media created: ", mediaRes);
					router.push(`/party/${res.data.id}`);
				})
			})
		}
	},

	/**
	 * Action creator that handles the fetching of videos from Youtube based on given query and videoType
	 * @param query
	 * @param videoType ('any', 'movie' or 'episode')
	 * @returns {Function}
	 */
	loadYoutubeVideos: (query, videoType = 'any') => {
		return async function ( dispatch ) {
			try {
				// Let the rest of the application know we are fetching search results
				dispatch ( videoListActions.isFetching ( true ) )

				// Fetch the search results and save them in store
				const youtubeMovies = await youtubeApi.fetchYoutubeSearchResults ( query, videoType )
				dispatch ( videoListActions.setYoutubeResults ( youtubeMovies.items ) )

				// Let the rest of the application know we are no longer busy fetching
				dispatch ( videoListActions.isFetching ( false ) )
			}
			catch ( err ) {
			}
		}
	}
}