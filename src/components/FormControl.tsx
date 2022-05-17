import React, { FC, HTMLInputTypeAttribute } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface IFormControlProps {
    id: string
    label: string
    register: UseFormRegisterReturn
    error: FieldError | undefined
    type: HTMLInputTypeAttribute
}

const FormControl: FC<IFormControlProps> = ({ id, label, register, error, type }) => {
    return (
        <div className="mb-3 w-full">
            <label htmlFor={id} className="text-gray-400 block mb-1">
                {label}
            </label>

            <input type={type} id={id} placeholder={label} {...register}
                className={`border px-2 py-2 rounded-md w-full bg-transparent
                ${error?.message ? "border-red-700" : "border-cyan-600"}`} />

            {error && <div className="text-red-700 mt-1">
                {error.message}
            </div>}
        </div>
    );
};

export default FormControl;