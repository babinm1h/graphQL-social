import { useMutation } from '@apollo/client';
import { CameraIcon, CheckIcon, XIcon } from '@heroicons/react/outline';
import React, { FC, useRef, useState } from 'react';
import { IGetUserResponse, IUploadAvatarResponse } from '../../graphQL/types';
import { UPLOAD_AVATAR } from '../../graphQL/upload/mutation';
import { GET_USER } from '../../graphQL/users/query';
import { IUser } from '../../types/models';

interface IProfileAvatarProps {
    profile: IUser
    user: IUser | null
    setAvatar: (url: string) => void
}

const ProfileAvatar: FC<IProfileAvatarProps> = ({ profile, user, setAvatar }) => {
    const avaRef = useRef<HTMLInputElement>(null)

    const [avatarFile, setAvatarFile] = useState<null | File>(null)
    const [avatarPreview, setAvatarPreview] = useState<null | string>(null)

    const [uploadAvatar] = useMutation<IUploadAvatarResponse>(UPLOAD_AVATAR, {
        update(proxy, result) {
            const data = proxy.readQuery<IGetUserResponse>({ query: GET_USER, variables: { userId: user?.id } })
            if (data) {
                const avaUrl = URL.createObjectURL(new Blob([avatarFile!]))
                setAvatar(avaUrl)
                const updated = { ...data.getUser, avatar: avaUrl }
                proxy.writeQuery({ query: GET_USER, variables: { userId: user?.id }, data: { getUser: updated } })
            }
        }
    })

    const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        if (e.target.files) {
            setAvatarFile(e.target.files[0])
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (ev) => {
            setAvatarPreview(ev.target?.result as string)
        }
    }

    const resetInput = () => {
        avaRef.current!.value = ""
    }

    const onCancelAvatar = () => {
        setAvatarPreview(null)
        setAvatarFile(null)
        resetInput()
    }

    const handleUpload = async () => {
        await uploadAvatar({ variables: { file: avatarFile } })
        setAvatarPreview(null)
        setAvatarFile(null)
        resetInput()
    }


    return (
        <div className="absolute top-[50%] left-5 xs:left-10 z-[2] translate-y-[-50%] flex xs:gap-5 items-center gap-3">
            <div className="group relative overflow-hidden">
                <img src={avatarPreview ? avatarPreview : profile?.avatar} alt="userimg"
                    className="h-24 w-24 xs:h-28 xs:w-28 rounded-[50%] object-cover object-center" />

                {user && user.id === profile.id
                    && <label htmlFor="ava" className="hidden absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white group-hover:flex items-center justify-center h-full rounded-[50%] cursor-pointer">
                        <CameraIcon className="h-5 w-5 mr-1" />Change
                        <input type="file" id="ava" className="hidden" onChange={handleAvatar}
                            ref={avaRef} />
                    </label>}

            </div>

            <div className="bg-black bg-opacity-60 text-white px-5 rounded-lg py-2">
                <p className="font-bold text-lg leading-5">{profile?.username}</p>
                <p className="">{profile?.email}</p>
            </div>

            {avatarPreview && <div className="bg-black bg-opacity-60 flex justify-center gap-2">
                <button className="p-1 text-green-700 hover:text-green-400" onClick={handleUpload}>
                    <CheckIcon className="h-6 w-6" />
                </button>
                <button className="p-1 text-red-700 opacity-50 hover:opacity-100"
                    onClick={onCancelAvatar}>
                    <XIcon className="h-6 w-6" />
                </button>
            </div>}
        </div>
    );
};

export default ProfileAvatar;