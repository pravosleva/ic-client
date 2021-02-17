export default class ConfigService {
    constructor() {
        this.apiPath = `${process.env.NEXT_PUBLIC_API_HOST}`;
    }
}
