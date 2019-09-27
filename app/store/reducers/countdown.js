import  {COUNTDOWN} from "../actions/types"

const initialState = {
    seconds: 0
}

export default function(state = initialState, action){
    const {
        type,
        payload
    } = action

    switch(type){
        case COUNTDOWN:
          return {
              seconds: payload
          }
        default:
          return state
      }
}