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
                const {data, message} = res; 
                
                sessionStorage.setItem('user', JSON.stringify(data));
                dispatch (registerAction.registerSuccess ({message, status: true}))
                router.push('/login')
            }, error => {
                console.log(error); 

                dispatch(registerAction.registerError(error))
            })

            dispatch({type: "STOP_LOADING"})

        }
    }
}