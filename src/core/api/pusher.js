import Pusher from 'pusher-js';
import { persistUtils } from '../utils/persist'
// import {PUSHER_URL} from '../constants'
import config from '../configs'

const PUSHER_URL = config.PUSHER_URL;

const soket = new Pusher('8ca50ca8ff937987bdce', {
    cluster: 'ap1',
    authEndpoint: `${PUSHER_URL}pusher/auth`,
    auth: {
        headers: {
            'Authorization': `Bearer ${persistUtils.loadProperty('access_token', '')}`
        }
    }
});

export const pusherApi = {
    changeAccessToken: () => {
        soket.config.auth.headers.Authorization = `Bearer ${persistUtils.loadProperty('access_token', '')}`
    },
    pusher: soket
}