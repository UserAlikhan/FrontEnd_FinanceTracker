import { gql } from "@apollo/client";

export const SIGNUP = gql`
    mutation signUp($email: String!, $password: String!, $username: String!) {
        signUp(registrationInput: {email: $email, password: $password, username: $username}) {
            id
            email
            username
            role
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(loginInput: {username: $username, password: $password}) {
            access_token
            user {
                id
                username
                email
            }
        }
    }
`