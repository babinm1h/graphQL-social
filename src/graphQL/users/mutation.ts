import { gql } from "@apollo/client";



export const REGISTER_USER = gql`
    mutation register($input:RegisterInput){
        register(input:$input){
            token,email,username,id,avatar,background
        }
    },
`


export const LOGIN_USER = gql`
    mutation login($email:String!, $password:String!){
        login(email:$email, password:$password){
            token,email,username,id,avatar,background
        }
    }
`


export const GET_AUTH = gql`
    mutation getAuth{
        getAuth{
            email,username,id,avatar,background,likes
        }
    }
`