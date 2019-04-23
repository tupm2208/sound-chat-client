// Libs & utils
import { combineReducers } from 'redux'

// Reducers
import { appReducer } from './app'
import { searchReducer } from './search'
import { videoPlayerReducer } from './videoPlayer'
import { videoListReducer } from './videoList'
import { userReducer } from './user'
import { partyReducer } from './party'
import { loginReducer } from './login'
import { loadingReducer } from './loading'
import { mediaReducer } from './media'

export default combineReducers ( {
	app: appReducer,
	videoPlayer: videoPlayerReducer,
	videoList: videoListReducer,
	user: userReducer,
	search: searchReducer,
	party: partyReducer,
	login: loginReducer,
	loading: loadingReducer,
	currentMedia: mediaReducer
} )