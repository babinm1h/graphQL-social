import React, { FC, useContext, useRef, useState } from 'react';
import { CameraIcon } from '@heroicons/react/outline';
import { IUser } from '../../types/models';
import { AuthContext } from '../../context/auth';


interface IProfileProps {
    profile: IUser
}

const ProfileInfo: FC<IProfileProps> = ({ profile }) => {
    const [bgFile, setBgFile] = useState<File | null>(null)

    const { user } = useContext(AuthContext)
    const bgRef = useRef<HTMLInputElement>(null)

    const handleBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setBgFile(e.target.files[0])
    }

    return (
        <div className="">
            <div className="relative w-full h-[300px] border border-gray-300 overflow-hidden flex flex-col">
                <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${`https://funart.pro/uploads/posts/2021-04/1618449611_10-funart_pro-p-oboi-fon-zelenaya-trava-fon-10.jpg`})` }} />

                <div className="absolute top-[50%] left-10 z-[2] translate-y-[-50%] flex gap-5 items-center">
                    <img src={profile?.avatar} alt="userimg"
                        className="h-22 w-22 rounded-[50%] relative" />

                    <div className="bg-black bg-opacity-60 text-white px-5 rounded-lg py-2">
                        <p className="font-bold text-lg leading-5">{profile?.username}</p>
                        <p className="">{profile?.email}</p>
                    </div>
                </div>

                {user && user.id === profile.id && <div className="bg-black bg-opacity-60 absolute top-0 right-0 p-2 text-white cursor-pointer" onClick={() => bgRef.current?.click()}>
                    <CameraIcon className="h-6 w-6 text-white" />
                    <input type="file" id="bg" accept="image/png, image/jpg, image/jpeg"
                        className="hidden" ref={bgRef} onChange={handleBackground} />
                </div>}
            </div>
        </div>
    );
};

export default ProfileInfo;