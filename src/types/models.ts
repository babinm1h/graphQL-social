

export interface IUser {
    username: string
    email: string
    password: string
    comments: IComment[]
    likes: string[]
    id: string
    token?: string
    avatar: string
    background?: string
    posts: IPost[]
}

export interface IPost {
    user: IUser
    body: string
    likes: string[]
    comments: IComment[]
    id: string
    createdAt: string
    likesCount: number
    commentsCount:number
}


export interface IComment {
    user: IUser
    body: string
    post: IPost
    id: string
    createdAt: string
}