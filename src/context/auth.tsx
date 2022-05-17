import React, { createContext, FC, useReducer } from "react";
import { IAuthContext, ActionTypes } from "../types/authContext";
import { IUser } from "../types/models";


const initalState: any = {
    user: null,
}



export const AuthContext = createContext<IAuthContext>({
    user: null,
    login: (userData: IUser) => { },
    logout: () => { },
    fetchAuth: (userData: IUser) => { }
})


const authReducer = (state: any, action: any) => {
    switch (action.type) {

        case ActionTypes.LOGIN: {
            return { ...state, user: action.payload }
        }

        case ActionTypes.LOGOUT: {
            return { ...state, user: null }
        }

        case ActionTypes.FETCH_AUTH: {
            return { ...state, user: action.payload }
        }

        default: {
            return state
        }
    }
}



interface IProps {
    children: React.ReactNode
}

export const AuthProvider: FC<IProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initalState)

    const login = (userData: IUser) => {
        localStorage.setItem('gqlToken', userData.token!)
        dispatch({ type: ActionTypes.LOGIN, payload: userData })
    }


    const logout = () => {
        localStorage.removeItem('gqlToken')
        dispatch({ type: ActionTypes.LOGOUT })
    }

    const fetchAuth = (userData: IUser) => {
        dispatch({ type: ActionTypes.FETCH_AUTH, payload: userData })
    }

    return <AuthContext.Provider value={{ user: state.user, login, logout, fetchAuth }}>
        {children}
    </AuthContext.Provider >
}


