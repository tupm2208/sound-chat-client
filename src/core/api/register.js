import { restUtils } from '../utils/index'

import { BASE_URL } from '../constants'

export const baseRegisterApi = {

    register: ( email, password, name ) => {
        const params = { email, password, name }
        
        const options = {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(params)
        }

        return fetch( `${BASE_URL}register`, options)
            .then ( restUtils.handleRestResponse)
            .then ((response) => response)
    }
}

