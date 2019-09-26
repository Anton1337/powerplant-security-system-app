import  {WARNING, NOWARNING, INVERSEWARNING} from "../actions/types"

const initialState = {
    warning: false
}

export default function(state = initialState, action){
    const {
        type,
        payload
    } = action

    switch(type){
        case WARNING:
          return {
              warning: true
          }
        case NOWARNING:
          return {
              warning: false
          }
          case INVERSEWARNING:
          return {
              warning: !state.warning
          }
        default:
          return state
      }
}