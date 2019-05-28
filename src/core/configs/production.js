import { BaseConfig } from "../configs/base";

export class ProductionConfig extends BaseConfig {
    BASE_URL = `/api/`;
    PUSHER_URL = `/api/`;
    PUSHER_NAMESPACE = 'soundchat';
    PUSHER_KEY = '212af40d49e82f344e49'
}
