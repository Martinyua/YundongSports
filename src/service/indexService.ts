
import BaseService from './BaseService';

class IndexService extends BaseService {
    constructor() {
        super();
    }
    //*第一个参数是地址，第二个参数是data，第三个是contentType,可选
    async raceList(data) {
        return this.http.get(`${this.baseUrl}/queryRace`, data)
    }
    async listCount() {
        return this.http.get(`${this.baseUrl}/countRace`)
    }
    async groupList(data) {
        return this.http.get(`${this.baseUrl}/getRunningGroupUserWithJoinType`,data)
    }
    async groupPro(data) {
        return this.http.get(`${this.baseUrl}/getRaceRunningGroup`, data)
    }
    async getImage(data) {
        return this.http.get(`${this.baseUrl}/getUnlimited`, data)
    }
}
export default IndexService
