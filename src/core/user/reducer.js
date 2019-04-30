// Libs & utils
import Immutable from 'seamless-immutable'
import { persistUtils } from "../utils/index"

// Actions
import { userActions } from './index'

// read stored userName from local storage -> defaults to null if it doesn't exist
const userFromLocalStorage = persistUtils.loadProperty ( 'user', {} )

const initialState = Immutable ( {
	...userFromLocalStorage
} )

export const userReducer = ( state = initialState, action ) => {
	switch ( action.type ) {

		case userActions.SET_USER:
		
			if(!action.payload) return state;

			persistUtils.saveProperty('user', action.payload)
			return state.merge(action.payload)

		default:
			return state
	}
}