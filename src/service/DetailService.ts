/*
 * @Author: Martin
 * @Date: 2020-05-08 17:27:58
 * @LastEditTime: 2020-06-22 19:24:20
 * @FilePath: \YundongSports\src\service\DetailService.ts
 */ 
import BaseService from './BaseService'
class DetailService extends BaseService{
    constructor(){
        super();
    }
    async getEventInfo(raceId:string){
        const param = {
            raceId
        }
        const res = await this.http.get(`${this.baseUrl}/queryRace`,param)
        return res;
    }
    async getEventTeam(pageNum:number,pageSize:number,raceId:string){
        const param = {
            pageNum,
            pageSize,
            raceId
        }
        const res = await this.http.get(`${this.baseUrl}/getRaceRunningGroup`,param)
        return res;
    }
    async getEventNews(pageNum:number,pageSize:number,raceId:string){
        const param = {
            pageNum,
            pageSize,
            raceId
        }
        const res = await this.http.get(`${this.baseUrl}/getRaceInformation`,param)
        return res;
    }
    async getTeamDetail(runningGroupId:string){
        const param = {
            runningGroupId
        }
        const res = await this.http.get(`${this.baseUrl}/getRunningGroupDetail`,param)
        return res;
    }
    async verify(data){
        const res=await this.http.post(`${this.baseUrl}/verificationRunningGroup`,data)
        return res
    }
    async createTeam(data){
        const res=await this.http.post(`${this.baseUrl}/insertIntoRace`,data)
        return res
    }
    async signupChild(data){
        const res=await this.http.post(`${this.baseUrl}/signUpParentChild`,data)
        return res
    }
    async payOrder(data){
        const res=await this.http.post(`${this.baseUrl}/payOrder`,data)
        return res
    }
    async getsignup(joinTypeId:string){
        const param={
            joinTypeId
        }
        const res=await this.http.get(`${this.baseUrl}/getRaceUserField`,param)
        return res
    }//已废弃
    async getFormdata(raceId:string){
        const param={
            raceId
        }
        const res=await this.http.get(`${this.baseUrl}/queryRaceUserField`,param)
        return res
    }
    async signupAdult(data){
        const res=await this.http.post(`${this.baseUrl}/signUpAdult`,data)
        return res
    }
    async editAdult(data){
        const res=await this.http.post(`${this.baseUrl}/updateAdultEntryForm`,data)
        return res
    }
    async editChild(data){
        const res=await this.http.post(`${this.baseUrl}/updateParentChildEntryForm`,data)
        return res
    }
}
export default DetailService