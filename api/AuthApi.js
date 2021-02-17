import TransportService from '../services/TransportService';

const delay = (ms = 500) =>
    new Promise((res, _rej) => {
        setTimeout(res, ms);
    });
class AuthApi extends TransportService {
    async login(login, password) {
        if (login === 'admin' && password === 'admin') {
            await delay(2000);

            const tstToken = 'authToken';
            localStorage.setItem('token', tstToken);
            return Promise.resolve(tstToken);
        } else {
            return Promise.reject('Incorrect input data');
        }
    }

    async logout() {
        await delay(1000);
        localStorage.removeItem('token');
        return Promise.resolve();
    }

    async checkMyToken() {
        const token = localStorage.getItem('token');

        await delay(1000);

        const isOk = token === 'authToken';

        return isOk ? Promise.resolve(`Your token ${token} is Ok`) : Promise.reject('Token is incorrect');
    }
}

export default new AuthApi();
