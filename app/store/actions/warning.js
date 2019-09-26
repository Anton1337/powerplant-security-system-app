import  {WARNING, NOWARNING, INVERSEWARNING} from "./types"

export const warning = () => async dispatch => {
    dispatch({
        type: WARNING
    })
}

export const inverseWarning = () => async dispatch => {
    dispatch({
        type: INVERSEWARNING
    })
}

export const removeWarning = () => async dispatch => {
    dispatch({
        type: NOWARNING
    })
}