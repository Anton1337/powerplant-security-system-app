import  {CLOCKIN, CLOCKOUT, EVENTS, SUIT, COEFFICIENT, NEWROOM} from "../actions/types"

const initialState = {
    clockedIn: false,
    events: [],
}

export default function(state = initialState, action){
    const {
        type,
        payload
    } = action

    switch(type){
        case CLOCKIN:
          return {
            ...state, 
            clockedIn: true
          }
        case CLOCKOUT:
          return {
              ...state,
              events: payload,
              clockedIn: false
          }
        case EVENTS:
            return {
                ...state,
                events: payload
            }
        case NEWROOM:
            return {
                ...state
            }
        case SUIT:
            return {
                ...state
            }
        case COEFFICIENT:
            return {
                ...state
            }
        default:
          return state
      }
}