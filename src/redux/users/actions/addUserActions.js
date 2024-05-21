import { ADD_USER } from "../types/usersTypes"

export const addUser = (user) => {
    return {
        type: ADD_USER,
        payload: user
    }
}