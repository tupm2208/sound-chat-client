import { httpRequest } from './httpRequest'

export const messageApi = {
	
	send: ( room_id, content="" ) => {
        const params = {room_id, content}

		return httpRequest.post('messages', params);
	}
}