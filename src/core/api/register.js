import { httpRequest } from './httpRequest'

export const baseRegisterApi = {

    register: ( email, password, name ) => {
        const params = { email, password, name }
        
        return httpRequest.post('users', params)
    }
}

