import Pusher from 'pusher-js';
import { persistUtils } from '../utils/persist'

export { youtubeApi } from './youtube'
export { baseApi } from './login'
export { mediaApi } from './media'
export { roomApi } from './room'



const soket = new Pusher('8ca50ca8ff937987bdce', {
    cluster: 'ap1',
    authEndpoint: 'http://localhost:8000/pusher/auth',
    auth: {
        headers: {
            'Authorization': `Bearer ${persistUtils.loadProperty('access_token', '')}`
        }
    }
});
soket.config.auth.headers = "123"
console.log("soket.auth.headers: ",soket.config.auth.headers);

