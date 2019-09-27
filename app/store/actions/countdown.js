import  {COUNTDOWN} from "./types"

export const countdownTimer = (seconds) => async dispatch => {
    dispatch({
        type: COUNTDOWN,
        payload: seconds
    })
}