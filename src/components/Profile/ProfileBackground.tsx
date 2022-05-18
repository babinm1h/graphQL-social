import { useMutation } from '@apollo/client';
import { CameraIcon, CheckIcon, XIcon } from '@heroicons/react/outline';
import React, { FC, SetStateAction, useRef, useState } from 'react';
import { IGetUserResponse } from '../../graphQL/types';
import { UPLOAD_BACKGROUND } from '../../graphQL/upload/mutation';
import { GET_USER } from '../../graphQL/users/query';
import { IUser } from '../../types/models';

interface IProfileBackgroundProps {
    setBgPreview: React.Dispatch<SetStateAction<string | null>>
    bgPreview: string | null
    setBackground: (url: string) => void
    user: IUser | null
}

const ProfileBackground: FC<IProfileBackgroundProps> = ({ user, bgPreview, setBgPreview, setBackground }) => {
    const [bgFile, setBgFile] = useState<File | null>(null)
    const bgRef = useRef<HTMLInputElement>(null)

    const [uploadBackground, { loading }] = useMutation(UPLOAD_BACKGROUND, {
        update(proxy) {
            const bgUrl = URL.createObjectURL(new Blob([bgFile!]))
            setBackground(bgUrl)
            const data = proxy.readQuery<IGetUserResponse>({ query: GET_USER, variables: { userId: user?.id } })
            proxy.writeQuery({
                query: GET_USER,
                variables: { userId: user?.id },
                data: { getUser: { ...data?.getUser, background: bgUrl } }
            })
        }
    })

    const handleBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        if (e.target.files) {
            setBgFile(e.target.files[0])
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (ev) => {
            setBgPreview(ev.target?.result as string)
        }
    }


    const onSubmitBg = async () => {
        await uploadBackground({ variables: { file: bgFile } })
        setBgFile(null)
        setBgPreview(null)
    }

    const onCancelBg = () => {
        setBgPreview(null)
        setBgFile(null)
    }

    return (
        <div className=" absolute top-0 right-0 text-white">
            <div className="bg-black bg-opacity-60 p-2 flex items-center justify-center cursor-pointer"
                onClick={() => bgRef.current?.click()}>
                <CameraIcon className="h-6 w-6 text-white" />
                <input type="file" id="bg" accept="image/png, image/jpg, image/jpeg"
                    className="hidden" ref={bgRef} onChange={handleBackground} />
            </div>

            {bgPreview && <div className="rounded-md bg-black bg-opacity-60 mt-5 flex items-center gap-3">
                <button className="p-1 text-green-700 hover:text-green-400" onClick={onSubmitBg}>
                    <CheckIcon className="h-6 w-6" />
                </button>
                <button className="p-1 text-red-700 opacity-50 hover:opacity-100"
                    onClick={onCancelBg}>
                    <XIcon className="h-6 w-6" />
                </button>
            </div>}
        </div>
    );
};

export default ProfileBackground;