import { IUser } from "./models";

export interface IAuthContext {
    user: IUser | null
    login: (userData: IUser) => void,
    logout: () => void
    fetchAuth: (userData: IUser) => void
}


export enum ActionTypes {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    FETCH_AUTH = "FETCH_AUTH"
}
