import { ArrowLeftIcon } from '@heroicons/react/outline';
import React from 'react';
import { useNavigate } from 'react-router';

const BackButton = () => {
    const nav = useNavigate()

    const handleBack = () => {
        return nav(-1)
    }

    return (
        <button onClick={handleBack} className="text-gray-400 flex items-center text-[16px] transition-colors hover:text-gray-500">
            <ArrowLeftIcon className="h-4 w-4 mr-1 mt-[2px]" /> Back
        </button>
    );
};

export default BackButton;