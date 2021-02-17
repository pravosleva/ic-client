import axios from 'axios';
import ConfigService from './ConfigService';

export default class TransportService {
    constructor(options = {}) {
        this.config = new ConfigService();

        this.httpClient =
            options.client ||
            axios.create({
                baseURL: this.config.apiPath,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

        this.initResponseInterceptor();
    }

    initResponseInterceptor = () => {
        this.httpClient.interceptors.response.use(this.handleResponse);
    };

    handleResponse = ({ data }) => data;
}
