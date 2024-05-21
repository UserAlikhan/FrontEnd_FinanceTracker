import { ADD_USER } from "../types/usersTypes"

const intialState = {
    users: [
        {
            id: 1,
            name: 'Alex',
            lastname: 'Alex',
            city: 'Denmark'
        },
        {
            id: 2,
            name: 'Gary',
            lastname: 'Gary',
            city: 'San-Francisco'
        },
        {
            id: 3,
            name: 'Arman',
            lastname: 'Arman',
            city: 'Astana'
        },
    ]
}

const usersReducer = (state = intialState, action) => {
    switch(action.type) {
        case ADD_USER: 
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        default: return state
    }
}

export default usersReducer