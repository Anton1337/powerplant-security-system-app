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
            events: [payload, ...state.events],
            clockedIn: true
          }
        case CLOCKOUT:
          return {
              ...state,
              events: [payload, state.events.filter(e => e._id != payload._id)],
              clockedIn: false
          }
        case EVENTS:
            return {
                ...state,
                events: payload
            }
        case NEWROOM:
            return {
                ...state,
                events: [payload, state.events.filter(e => e._id != payload._id)]
            }
        case SUIT:
            return {
                ...state,
                events: [payload, state.events.filter(e => e._id != payload._id)]
            }
        case COEFFICIENT:
            return {
                ...state,
                events: [payload, state.events.filter(e => e._id != payload._id)]
            }
        default:
          return state
      }
}