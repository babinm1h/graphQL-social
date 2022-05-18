import { IUser } from "./models";

export interface IAuthContext {
    user: IUser | null
    login: (userData: IUser) => void,
    logout: () => void
    fetchAuth: (userData: IUser) => void
    setAvatar: (url: string) => void
    setBackground: (url: string) => void
}


export enum ActionTypes {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    FETCH_AUTH = "FETCH_AUTH",
    SET_AVATAR = "SET_AVATAR",
    SET_BACKGROUND = "SET_BACKGROUND"
}
