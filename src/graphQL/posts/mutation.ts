import { gql } from "@apollo/client";



export const CREATE_POST = gql`
    mutation createPost($body:String!){
        createPost(body:$body){
    body,
    likes,
    id,
    createdAt,
    likesCount,
    commentsCount,
    user{
        username,email,id,avatar
    },
    comments{
        id,body,user{
            email,username,id,avatar
        }
        }
    }
    }
`


export const DELETE_POST = gql`
    mutation deletePost($postId:String!){
        deletePost(postId:$postId)
    }

`

