import axios from "axios"
import { usersFetched, usersFetchedWithError, usersFetching } from "../reducers/apiUsersReducer";


export const fetchUsers = () => {
    return async (dispatch) => {
        dispatch(usersFetching())
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            const users = response.data;
            dispatch(usersFetched(users));
        } catch (error) {
            const errMessage = error.message
            dispatch(usersFetchedWithError(errMessage))
        }
    }
}