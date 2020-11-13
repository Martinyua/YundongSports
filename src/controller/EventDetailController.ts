
import DetailService from '../service/DetailService'

class EventDetailController{
    constructor(){};

    detailservice = new DetailService;
    //获取对饮id活动
    getEvent(that,raceId:string){
        return async (dispatch) => {
            const res = await this.detailservice.getEventInfo(raceId)
            const resEvent=res.filter(item=>{return item.id==raceId})
            that.setState({
                img:resEvent.imageUrl
            })
            dispatch(this.eventList(resEvent))
        }
    }
    getTeam(pageNum:number,pageSize:number,raceId:string){
        return async (dispatch) => {
            const res = await this.detailservice.getEventTeam(pageNum,pageSize,raceId); //这里的res直接是res.data.data
            dispatch(this.eventTeam(res.runningGroupPOS))
        }
    }
    getNews(pageNum:number,pageSize:number,raceId:string){
        return async (dispatch) => {
            const res = await this.detailservice.getEventNews(pageNum,pageSize,raceId); //这里的res直接是res.data.data
            dispatch(this.eventNews(res))
        }
    }
    getTeamInfo(that,pageNum:number,pageSize:number,id:string){
        return async (dispatch) => {
            const res = await this.detailservice.getEventTeam(pageNum,pageSize,id); //这里的res直接是res.data.data
            const teamInfo=res.runningGroupPOS.filter(item=>{return item.id==id})
            that.setState({
                teamImg:teamInfo[0].logoUrl,
                teamName:teamInfo[0].groupName
            })
            dispatch(this.eventTeam(teamInfo))
        }
    }

    eventTeam(data){
        return{
            type:'EVENTTEAM',
            data
        }
    }
    eventList(data){
        return{
            type:'EVENTLIST',
            data
        }
    }
    eventNews(data){
        return{
            type:'EVENTNEWS',
            data
        }
    }
    eventTeamInfo(data){
        return{
            type:'TEAMINFO',
            data
        }
    }
}

export default EventDetailController;