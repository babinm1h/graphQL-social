import { useMutation } from '@apollo/client';
import React, { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { AllRoutes } from '../components/AppRoutes';
import FormControl from '../components/FormControl';
import { validate } from '../utils/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup"
import { REGISTER_USER } from '../graphQL/users/mutation';
import { AuthContext } from '../context/auth';

interface IFormFields {
    confirmPassword: string
    password: string
    email: string
    username: string
}
const RegisterForm = () => {
    const nav = useNavigate()
    const context = useContext(AuthContext)

    const passwordSchema = Yup.object().shape({
        password: Yup.string(),
        confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords dont mutch")
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormFields>({
        resolver: yupResolver(passwordSchema)
    })


    const [registerUser, { error, loading }] = useMutation(REGISTER_USER, {
        update(_, result) {
            context.login(result.data.register)
            reset()
            nav(AllRoutes.home)
        }
    })


    const onSubmit: SubmitHandler<IFormFields> = (data) => {
        registerUser({ variables: { input: data } })
    }

    return (
        <form action="" className="mt-5 p-5 flex flex-col"
            onSubmit={handleSubmit(onSubmit)}>
            <FormControl type="text" label="Username" error={errors.username}
                register={register("username", validate(40, 4))} id="username" />

            <FormControl type="email" label="Email" error={errors.email}
                register={register("email", validate(40, 6))} id="email" />

            <FormControl type="password" label="Password" error={errors.password}
                register={register("password", validate(30, 6))} id="password" />

            <FormControl type="password" label="Confirm password" error={errors.confirmPassword}
                register={register("confirmPassword", validate(30, 6))} id="confirmPassword" />

            <button className="mt-4 h-10 primaryBtn" disabled={loading}>
                Create account
            </button>

            <p className="mt-3">Already have an account?
                <NavLink to={AllRoutes.login} className="ml-2 text-cyan-600 underline">Login</NavLink>
            </p>

            {error && <div className="text-red-600 mt-4 bg-red-100 p-2 border border-red-600 rounded-md">
                {error.message}
            </div>}
        </form>
    );
};

export default RegisterForm;