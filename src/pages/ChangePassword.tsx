import { useMutation } from '@apollo/client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { AllRoutes } from '../components/AppRoutes';
import FormControl from '../components/FormControl';
import { CHANGE_PASSWORD } from '../graphQL/users/mutation';
import { validate } from '../utils/validate';

interface IFormFields {
    password: string
}

const ChangePassword = () => {
    const nav = useNavigate()
    const { secretLink } = useParams() as { secretLink: string }

    const [changePassword, { error, loading }] = useMutation(CHANGE_PASSWORD)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormFields>()

    const onSubmit: SubmitHandler<IFormFields> = ({ password }) => {
        changePassword({ variables: { secretLink, password } })
        reset()
        if (!errors.password || !error) {
            nav(AllRoutes.login)
        }
    }

    return (
        <div className="max-w-lg w-full mx-auto">

            <div className="shadow-md border flex flex-col">
                <h1 className="text-3xl font-semibold text-center border-b border-b-gray-300 py-3">
                    Change Your Password
                </h1>
                <form action="" className="p-5" onSubmit={handleSubmit(onSubmit)}>
                    <FormControl register={register("password", validate(40, 6))} id="password"
                        error={errors.password} label="New password" type="password" />

                    <button type="submit" className="primaryBtn px-10 mt-4" disabled={loading}>
                        Change password
                    </button>

                    {error && <div className="text-red-700 mt-1">{error.message}</div>}
                </form>
            </div>

        </div>
    );
};

export default ChangePassword;