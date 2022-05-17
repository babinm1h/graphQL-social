import { gql } from "@apollo/client";



export const FETCH_POSTS = gql`
    query{
        getPosts {
            body,id,createdAt,likesCount,commentsCount,
            user {
            email,username,id,avatar
            },
            comments {
            body,id,createdAt
            },
            likes
        }
    }
`



export const FETCH_SINGLE_POST = gql`
    query($postId:ID!){
            getPost(postId:$postId){
                body,id,createdAt,likesCount,likes,commentsCount,
                user{
                    email,username,id,avatar
                },
                comments{
                    body,id,createdAt,user{
                        email,username,avatar,id
                    }
                }
            }
        }
`