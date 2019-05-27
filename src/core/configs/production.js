import { BaseConfig } from "../configs/base";

export class ProductionConfig extends BaseConfig {
    BASE_URL = `http://52.221.201.100:8000/api/`;
    PUSHER_URL = `http://52.221.201.100:8000/`;
}
