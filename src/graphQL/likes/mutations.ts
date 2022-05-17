import { gql } from "@apollo/client";



export const LIKE_POST = gql`
    mutation likePost($postId:String!){
        likePost(postId:$postId){
            id,likes,body,likesCount
        }
    }
`

export const UNLIKE_POST = gql`
    mutation unlikePost($postId:String!){
        unlikePost(postId:$postId){
            id,body,likes,likesCount
        }
    }
`