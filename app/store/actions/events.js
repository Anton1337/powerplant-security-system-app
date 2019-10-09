import  {CLOCKIN, CLOCKOUT, EVENTS, NEWROOM, COEFFICIENT, SUIT} from "./types"
import axios from 'axios'

export const clockIn = () => async dispatch => {
    //try {
        const res = await axios.post("https://powerplant-security-system-api.herokuapp.com/api/v1/events/start", {})
        dispatch({
            type: CLOCKIN,
            payload: res.data
        })
    //} catch (err) {
    //    console.error('clockIn', err);
    //}
    
}
export const clockOut = (radiation) => async dispatch => {
    //try {
        const res = await axios({
            method: 'POST',
            url: 'https://powerplant-security-system-api.herokuapp.com/api/v1/events/end',
            data: {radiation: radiation},
            headers: {
            'content-type': 'application/json',
            },
        })
        dispatch({
            type: CLOCKOUT,
            payload: res.data
        })
    //} catch (err) {
    //    console.error('clockOut', err);
    //}
}

export const getEvents = () => async dispatch => {
    //try {
        const res = await axios.get("https://powerplant-security-system-api.herokuapp.com/api/v1/events")
        dispatch({
            type: EVENTS,
            payload: res.data
        })
    //} catch (err) {
    //    console.error('getEvents', err);
    //}
}

export const newRoom = (room) => async dispatch => {
    //console.log("FICK VI IN ROOM I ACTIONEN?",room)
    //try {
        const res = await axios({
            method: 'POST',
            url: 'https://powerplant-security-system-api.herokuapp.com/api/v1/events/room',
            data: {currentRoom: room},
            headers: {
            'content-type': 'application/json',
            },
        })
        dispatch({
            type: NEWROOM,
            payload: res.data
        })
    //} catch (err) {
    //    console.error('newRoom', err);
    //}
}

export const toggleSuit = (suit) => async dispatch => {
    //try {
        const res = await axios({
            method: 'POST',
            url: 'https://powerplant-security-system-api.herokuapp.com/api/v1/events/hazmat',
            data: {isOn: suit === 1 ? true : false},
            headers: {
            'content-type': 'application/json',
            },
        })
        dispatch({
            type: SUIT,
            payload: res.data
        })
    //} catch (err) {
    //    console.error('toggleSuit', err);
    //}
}

export const changeCoefficient = (coefficient) => async dispatch => {
    //try {
        const res = await axios({
            method: 'POST',
            url: 'https://powerplant-security-system-api.herokuapp.com/api/v1/events/k',
            data: {value: coefficient},
            headers: {
            'content-type': 'application/json',
            },
        })
        dispatch({
            type: COEFFICIENT,
            payload: res.data
        })
    //} catch (err) {
    //    console.error('changeCoefficient', err);
    //}
}

