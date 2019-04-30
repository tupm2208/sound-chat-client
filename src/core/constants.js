//=====================================
//  BACKEND / WEBSOCKET SERVER ADDRESS (BY DEFAULT ON SAME HOST AS FRONTEND)
//  Intended for when you want to run the server on a different host than the front-end
//-------------------------------------
export const WEBSOCKET_URL = '/'

//=====================================
//  YOUTUBE API
//-------------------------------------
// export const YOUTUBE_API_KEY = 'AIzaSyC9gNIsNUmKaIQ1KcOFGwZiX6Uvv530U34'
export const YOUTUBE_API_KEY = 'AIzaSyDTLiPIRIn1PGKsUxJXtn7PEqb-nYTlOOo'

const host = "localhost"

export const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3'
export const YOUTUBE_SEARCH_URL = `${YOUTUBE_API_BASE_URL}/search`
export const BASE_URL = `http://${host}:8000/api/`
export const PUSHER_URL = `http://${host}:8000/`


//=====================================
//  VIDEO PLAYER
//-------------------------------------
export const videoPlayerConfig = {
	youtube: {
		playerVars: { showinfo: 1 }
	}
}

//=====================================
//  VARIOUS
//-------------------------------------
// Initial query for videos to display on the browse page
export const initialVideoQuery = {
	query: 'beautiful destinations',
	videoType: 'any'
}

