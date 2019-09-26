import  {CLOCKIN, CLOCKOUT} from "./types"
import axios from 'axios'

export const clockIn = () => async dispatch => {
    dispatch({
        type: CLOCKIN
    })
    const res = await axios.post("https://powerplant-security-system-api.herokuapp.com/api/v1/clocks/clockins/", {})
}
export const clockOut = () => async dispatch => {
    dispatch({
        type: CLOCKOUT
    })
    const res = await axios.post("https://powerplant-security-system-api.herokuapp.com/api/v1/clocks/clockouts/", {})
}