import Pusher from 'pusher-js';
import { persistUtils } from '../utils/persist'
// import {PUSHER_URL} from '../constants'
import config from '../configs'

const PUSHER_URL = config.PUSHER_URL;

const socket = new Pusher(config.PUSHER_KEY, {
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
        socket.config.auth.headers.Authorization = `Bearer ${persistUtils.loadProperty('access_token', '')}`
    },
    pusher: socket
}