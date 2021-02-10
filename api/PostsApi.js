import TransportService from '../services/TransportService';

class PostsApi extends TransportService {
    async getPosts() {
        return await this.httpClient.get('posts');
    }

    async savePost(data) {
        // return await this.httpClient.post('post', data);

        return new Promise(function(resolve) {
            setTimeout(() => {
                resolve(data);
            }, 2000);
        });
    }
}

export default new PostsApi();
