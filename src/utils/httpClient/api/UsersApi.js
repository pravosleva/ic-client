import TransportService from '~/utils/httpClient/services/TransportService';

class UsersApi extends TransportService {
    async getUsers() {
        return await this.httpClient.get('users');
    }

    async getUser(id) {
        return await this.httpClient.get(`users/${id}`);
    }

    async saveUser(data) {
        // return await this.httpClient.post('post', data);

        return new Promise(function (resolve) {
            setTimeout(() => {
                resolve(data);
            }, 2000);
        });
    }
}

export default new UsersApi();
