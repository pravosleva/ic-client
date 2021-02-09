import TransportService from '../services/TransportService';

class PostApi extends TransportService {
    async getPosts() {
        return await this.httpClient.get('posts');
    }
}

export default new PostApi();
