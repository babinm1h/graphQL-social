import { gql } from "@apollo/client";


export const GET_USER = gql`
    query($userId:String!){
        getUser(userId:$userId){
            email,username,id,avatar,background,posts{
                body,createdAt,commentsCount,likesCount,likes,user{
                    email,username,avatar,id,likes
                }
            }
        }
    }
`