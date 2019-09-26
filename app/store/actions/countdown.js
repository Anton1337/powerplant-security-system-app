import  {COUNTDOWN} from "./types"

export const countdownTimer = (seconds) => async dispatch => {
    console.log("FROM ACTION")
    console.log(seconds)
    dispatch({
        type: COUNTDOWN,
        payload: seconds
    })
}