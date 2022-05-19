import { useMutation } from '@apollo/client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormControl from '../components/FormControl';
import { ISendLinkResponse } from '../graphQL/types';
import { SEND_LINK } from '../graphQL/users/mutation';
import { validate } from '../utils/validate';

interface IFormFields {
    email: string
}

const ForgotPassword = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm<IFormFields>()

    const [sendLink, { error, loading, data }] = useMutation<ISendLinkResponse>(SEND_LINK)

    const onSubmit: SubmitHandler<IFormFields> = ({ email }) => {
        sendLink({ variables: { email } })
        reset()
    }

    return (
        <div className="max-w-lg w-full mx-auto">

            <div className="shadow-md border flex flex-col">
                <h1 className="text-3xl font-semibold text-center border-b border-b-gray-300 py-3">
                    Recover password
                </h1>
                <form action="" className="p-5" onSubmit={handleSubmit(onSubmit)}>
                    <FormControl register={register("email", validate(40, 6))} id="email"
                        label="Your Email" error={errors.email} type="email" />

                    <button type="submit" className="primaryBtn px-10 mt-4" disabled={loading}>
                        Send link
                    </button>

                    {error && <div className="text-red-700 mt-1">{error.message}</div>}
                    {data?.sendLink && <div className="text-green-600 mt-1">{data.sendLink}</div>}
                </form>
            </div>

        </div>
    );
};

export default ForgotPassword;