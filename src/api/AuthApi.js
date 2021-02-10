import TransportService from '../services/TransportService';

class AuthApi extends TransportService {
    async login(login, password) {
        return new Promise(function(resolve, reject) {
            if (login === 'admin' && password === 'admin') {
                setTimeout(() => {
                    resolve('authToken');
                }, 2000);
            } else {
                setTimeout(() => reject(false), 2000);
            }
        });
    }

    async logout() {
        return new Promise(function(resolve) {
            setTimeout(() => {
                localStorage.removeItem('token');
                resolve();
            }, 500);
        });
    }
}

export default new AuthApi();
