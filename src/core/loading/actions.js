export const loadingActions = {
	START: 'START_LOADING',
	STOP: 'STOP_LOADING',

	startLoading: () => ({
		type: loadingActions.START,
		payload: true
	}),

	stopLoading: () => ({
		type: loadingActions.STOP,
		payload: false
	})

}