// import external actions

export const searchActions = {
	TOGGLE_SEARCH_FIELD: 'TOGGLE_SEARCH_FIELD',


	toggleSearchField: () => ({
		type: searchActions.TOGGLE_SEARCH_FIELD
	}),

	/**
	 * Navigate to search results upon search submission & close the search input bar
	 */
	handleSearch: ( query, router ) => {
		return async function ( dispatch ) {
			// Close the searchField
			dispatch ( searchActions.toggleSearchField() )

			// Navigate to the search results
			router.push(`/search/${query}`)
			// dispatch ( appActions.navigateToPath ( `/search/${query}` ) )
		}
	}
}