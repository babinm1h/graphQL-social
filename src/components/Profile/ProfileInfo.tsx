import React, { FC, useContext, useState } from 'react';
import { IUser } from '../../types/models';
import { AuthContext } from '../../context/auth';
import ProfileBackground from './ProfileBackground';
import ProfileAvatar from './ProfileAvatar';


interface IProfileInfoProps {
    profile: IUser
}

const ProfileInfo: FC<IProfileInfoProps> = ({ profile }) => {
    const [bgPreview, setBgPreview] = useState<null | string>(null)

    const { user, setAvatar, setBackground } = useContext(AuthContext)


    return (
        <div className="">
            <div className="relative w-full h-[300px] border border-gray-300 overflow-hidden flex flex-col">
                <div className="w-full h-full bg-cover bg-center bg-no-repeat bg-gray-200"
                    style={{ backgroundImage: `url(${`${bgPreview ? bgPreview : user?.background}`})` }} />

                <ProfileAvatar profile={profile} user={user} setAvatar={setAvatar} />

                {user && user.id === profile.id
                    && <ProfileBackground setBgPreview={setBgPreview} bgPreview={bgPreview} setBackground={setBackground} user={user} />}
            </div>
        </div>
    );
};

export default ProfileInfo;