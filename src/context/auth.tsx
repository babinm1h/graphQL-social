import React, { createContext, FC, useReducer } from "react";
import { IAuthContext, ActionTypes } from "../types/authContext";
import { IUser } from "../types/models";


const initalState: { user: IUser | null } = {
    user: null,
}



export const AuthContext = createContext<IAuthContext>({
    user: null,
    login: (userData: IUser) => { },
    logout: () => { },
    fetchAuth: (userData: IUser) => { },
    setAvatar: (url: string) => { },
    setBackground: (url: string) => { }
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

        case ActionTypes.SET_AVATAR: {
            return { ...state, user: { ...state.user, avatar: action.payload } }
        }

        case ActionTypes.SET_BACKGROUND: {
            return { ...state, user: { ...state.user, background: action.payload } }
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

    const setAvatar = (url: string) => {
        dispatch({ type: ActionTypes.SET_AVATAR, payload: url })
    }

    const setBackground = (url: string) => {
        dispatch({ type: ActionTypes.SET_BACKGROUND, payload: url })
    }

    return <AuthContext.Provider value={{
        user: state.user,
        login,
        logout,
        fetchAuth,
        setAvatar,
        setBackground
    }}>
        {children}
    </AuthContext.Provider >
}


