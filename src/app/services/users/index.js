import { apolloClient } from "../../graphql"
import { LOGIN, SIGNUP } from "./queries"

class UsersService {
    async signUp(email, password, username) {
        try {
            const response = await apolloClient.mutate({
                mutation: SIGNUP,
                variables: { email, password, username }
            })

            if (!response || !response.data) {
                throw new Error('SignUp Error')
            } else {
                return response.data.signUp
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async signIn(username, password) {
        try {
            const response = await apolloClient.mutate({
                mutation: LOGIN,
                variables: { username, password }
            })

            if (!response || !response.data) {
                throw new Error('LogIn Error')
            } else {
                return response.data.login
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default new UsersService()