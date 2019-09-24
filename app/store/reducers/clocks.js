import  {CLOCKIN, CLOCKOUT} from "../actions/types"

const initialState = {
    clockedIn: false
}

export default function(state = initialState, action){
    const {
        type,
        payload
    } = action

    switch(type){
        case CLOCKIN:
          return {
              clockedIn: true
          }
        case CLOCKOUT:
          return {
              clockedIn: false
          }
        default:
          return state
      }
}