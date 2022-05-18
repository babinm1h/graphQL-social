import { XCircleIcon } from '@heroicons/react/outline';
import React, { FC } from 'react';

interface IPopupProps {
    children: React.ReactNode
    onClose: () => void
    title: string
}

const Popup: FC<IPopupProps> = ({ children, onClose, title }) => {
    return (
        <div className="bg-black bg-opacity-40 w-full h-full fixed top-0 left-0 right-0 flex  justify-center z-10" onClick={onClose}>

            <div className="bg-white p-5 rounded-md xs:max-w-[400px] w-full h-[350px] mt-10"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end">
                    <button onClick={onClose}>
                        <XCircleIcon className="w-6 h-6 text-red-700" />
                    </button>
                </div>

                <div className="flex flex-col">
                    <div className="text-center">
                        <h1 className="font-bold text-lg">{title}</h1>
                    </div>

                    <div className="mt-5">
                        {children}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Popup;