import  {CLOCKIN, CLOCKOUT, EVENTS, NEWROOM, COEFFICIENT, SUIT} from "./types"
import axios from 'axios'

export const clockIn = () => async dispatch => {
    const res = await axios.post("https://powerplant-security-system-api.herokuapp.com/api/v1/events/start", {})
    dispatch({
        type: CLOCKIN,
        payload: res.data
    })
}
export const clockOut = (radiation) => async dispatch => {
    const res = await axios({
        method: 'POST',
        url: 'https://powerplant-security-system-api.herokuapp.com/api/v1/events/end',
        data: {radiation: radiation},
        headers: {
        'content-type': 'application/json',
        },
    });
    dispatch({
        type: CLOCKOUT,
        payload: res.data
    })
}

export const getEvents = () => async dispatch => {
    axios.get("https://powerplant-security-system-api.herokuapp.com/api/v1/events")
    .then(function(response){
        console.log(response.data)
        dispatch({
            type: EVENTS,
            payload: response.data
        })
    })
}

export const newRoom = (room) => async dispatch => {
    const res = await axios({
        method: 'POST',
        url: 'https://powerplant-security-system-api.herokuapp.com/api/v1/events/room',
        data: {currentRoom: room},
        headers: {
        'content-type': 'application/json',
        },
    });
    dispatch({
        type: NEWROOM,
        payload: res.data
    })
}

export const toggleSuit = (suit) => async dispatch => {
    const res = await axios({
        method: 'POST',
        url: 'https://powerplant-security-system-api.herokuapp.com/api/v1/events/hazmat',
        data: {isOn: suit === 1 ? true : false},
        headers: {
        'content-type': 'application/json',
        },
    });
    dispatch({
        type: SUIT,
        payload: res.data
    })
}

export const changeCoefficient = (coefficient) => async dispatch => {
    const res = await axios({
        method: 'POST',
        url: 'https://powerplant-security-system-api.herokuapp.com/api/v1/events/k',
        data: {value: coefficient},
        headers: {
        'content-type': 'application/json',
        },
    });
    dispatch({
        type: COEFFICIENT,
        payload: res.data
    })
}

