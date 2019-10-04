import  {COUNTDOWN, RESETTIMER} from "./types"

export const countdownTimer = (seconds) => async dispatch => {
    console.log("ACTION COUNTDOWN", seconds)
    dispatch({
        type: COUNTDOWN,
        payload: seconds
    })
}

export const resetTimer = () => async dispatch => {
    dispatch({
        type: RESETTIMER,
    })
}