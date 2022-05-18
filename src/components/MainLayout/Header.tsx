import React, { useContext, useState } from 'react';
import { LogoutIcon, HomeIcon } from "@heroicons/react/outline"
import { NavLink, useNavigate } from 'react-router-dom';
import { AllRoutes } from '../AppRoutes';
import { AuthContext } from '../../context/auth';
import Popup from '../Popup';

const Header = () => {
    const [popup, setPopup] = useState(false)
    const { user, logout } = useContext(AuthContext)
    const nav = useNavigate()

    const onOpen = () => {
        setPopup(true)
    }

    const onClose = () => {
        setPopup(false)
    }

    const handleLogout = () => {
        logout()
        onClose()
        nav(AllRoutes.login)
    }

    return (
        <>
            <header className="fixed top-0 left-0 right-0 w-full px-5 h-[70px] flex flex-col justify-center shadow-md bg-white z-[5]">
                <div className="flex items-center justify-between">
                    <NavLink to={AllRoutes.home}>
                        <img src="https://miro.medium.com/max/1200/0*V0-GSX2HXk9rI30i.png" alt="logo"
                            className="w-12 h-12 hover:animate-spin" />
                    </NavLink>
                    <nav className="flex items-center xs:gap-6 gap-3">
                        <NavLink to={AllRoutes.home} className="blueLink hidden xs:flex">
                            <HomeIcon className="mr-2 h-5 w-5" /> Home
                        </NavLink>
                        {user
                            ? <>
                                <button className="blueLink" onClick={onOpen}>
                                    <LogoutIcon className="mr-2 h-5 w-5" /> Logout
                                </button>
                                <NavLink to={AllRoutes.profile + `/${user.id}`} className="gap-2 p-2 border border-gray-300 rounded-full flex items-center">
                                    <img src={user.avatar} alt="userimg" className="w-5 h-5 rounded-[50%]" />
                                    <span className="hidden xs:max-w-[100px] truncate xs:inline-flex">
                                        {user.username}
                                    </span>
                                </NavLink>
                            </>
                            : <NavLink to={AllRoutes.login} className="blueLink">
                                <LogoutIcon className="mr-2 h-5 w-5" /> Login
                            </NavLink>
                        }
                    </nav>
                </div>
            </header>
            {popup && <Popup title="Are you sure?" onClose={onClose}>
                <button className="w-full redBtn" onClick={handleLogout}>
                    Logout
                </button>
            </Popup>}
        </>
    );
};

export default Header;