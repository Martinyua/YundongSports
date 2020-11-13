const INITIAL_STATE={
    event:[],
    eventTeam:[],
    eventNews:[],
    eventTeamInfo:[]
}

export default function eventDetail(prestate = INITIAL_STATE,action){
    switch(action.type){
        case 'EVENTLIST':
            return{...prestate,event:action.data}
        case 'EVENTTEAM':
            //数组合并
            return {...prestate,eventTeam:action.data}
        case 'EVENTNEWS':
            return{...prestate,eventNews:action.data}
        case "TEAMINFO":
            return{...prestate,eventInfo:action.data}
            default:
            return {...prestate}
    }
}