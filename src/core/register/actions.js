import { baseRegisterApi } from '../api/index'


export const registerAction = { 
    REGISTER_SUCCESS_STATE: 'REGISTER_SUCCESS_STATE', 
    REGISTER_ERROR_STATE: 'REGISTER_ERROR_STATE',

    registerSuccess: res => ({
        type: registerAction.REGISTER_SUCCESS_STATE, 
        payload: res
    }),

    registerError: error => ({
        type: registerAction.REGISTER_ERROR_STATE,
        payload: error
    }),

    register: ( email, password, name, router ) => {
        return async function ( dispatch ) {
            dispatch({type: "START_LOADING"})
            await baseRegisterApi.register(email, password, name).then( res => {
                const {message} = res; 
                
                dispatch (registerAction.registerSuccess ({message, status: true}))

                const redirect = router.location.query.redirect
                router.push({pathname: "/login", query: {redirect}})
            }, error => {
                dispatch(registerAction.registerError(error))
                registerAction.handleErrorData(error.error_data, dispatch)
            })

            dispatch({type: "STOP_LOADING"})

        }
    },

    dispatch: (params = {}) => {
        dispatch => {

            dispatch(params)
        }
    }, 
    handleErrorData: (errorData = {}, dispatch) => {

        for(let e in errorData) {
            dispatch({
                type: 'TOASTER',
                payload: {
                    message: errorData[e][0],
                    error: 1
                }
            })
        }
    }
}