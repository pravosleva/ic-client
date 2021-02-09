import TransportService from '../services/TransportService';

class AuthApi extends TransportService {
    async login(login, password) {
        return new Promise(function (resolve, reject) {
            if (login === 'admin' && password === 'admin') {
                setTimeout(() => {
                    localStorage.setItem('token', 'authToken');
                    resolve();
                }, 2000);
            } else {
                setTimeout(() => reject(false), 2000);
            }
        });
    }

    async logout() {}
}

export default new AuthApi();
