import { ADD, MINUS } from '../constants/counter'
const INITIAL_STATE = {
  num:'fgdfgh',
  array:Array()
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        num:state.num,
        array:state.array.concat(state.num)
      }
     case MINUS:
       return {
        //  ...state,
        //  num: state.num - 1
       }
     default:
       return state
  }
}
