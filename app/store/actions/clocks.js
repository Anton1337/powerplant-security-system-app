import  {CLOCKIN, CLOCKOUT} from "./types"
import axios from 'axios'

export const clockIn = () => async dispatch => {
    const res = await axios.post("https://powerplant-security-system-api.herokuapp.com/api/v1/clocks/clockins/", {})
    dispatch({
        type: CLOCKIN
    })
}
export const clockOut = () => async dispatch => {
    const res = await axios.post("https://powerplant-security-system-api.herokuapp.com/api/v1/clocks/clockouts/", {})
    dispatch({
        type: CLOCKOUT
    })
}