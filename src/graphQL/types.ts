import { IComment, IPost, IUser } from "../types/models";


export interface IFetchPostsResponse {
    getPosts: IPost[]
}


export interface IGetAuthResponse {
    getAuth: IUser
}


export interface IDeletePostResponse {
    deletePost: string
}

export interface ILikePostResponse {
    likePost: {
        id: string
    }
}


export interface IUnlikePostResponse {
    unlikePost: {
        id: string
    }
}

export interface IFetchSinglePostResponse {
    getPost: IPost
}


export interface ICreateCommentResponse {
    createComment: IComment
}


export interface IDeleteCommentResponse {
    deleteComment: IPost
}


export interface IGetUserResponse {
    getUser: IUser
}


export interface IUploadAvatarResponse {
    uploadAvatar: boolean
}


export interface ISendLinkResponse {
    sendLink: string
}

