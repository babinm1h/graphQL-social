import { gql } from "@apollo/client";



export const CREATE_COMMENT = gql`
    mutation createComment($postId:String!,$body:String!){
        createComment(postId:$postId,body:$body){
            body,id,createdAt,user{
                username,avatar,id,email
            }
        }
    }
`

export const DELETE_COMMENT = gql`
    mutation deleteComment($commentId:String!,$postId:String!){
        deleteComment(commentId:$commentId,postId:$postId){
            id,body,commentsCount,comments{
                id,body
            },
            user{
                email,id,username
            }
        }
    }
`