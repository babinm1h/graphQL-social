import React, { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { AllRoutes } from '../components/AppRoutes';
import FormControl from '../components/FormControl';
import { useMutation } from '@apollo/client';
import { validate } from '../utils/validate';
import { LOGIN_USER } from '../graphQL/users/mutation';
import { AuthContext } from '../context/auth';

interface IFormFields {
    password: string
    email: string
}

const LoginForm = () => {
    const context = useContext(AuthContext)

    const nav = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormFields>()

    const [loginUser, { error, loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            context.login(result.data.login)
            nav(AllRoutes.home)
            reset()
        }
    })



    const onSubmit: SubmitHandler<IFormFields> = ({ email, password }) => {
        loginUser({ variables: { email, password } })
    }

    return (
        <form action="" className="mt-5 p-5 flex flex-col"
            onSubmit={handleSubmit(onSubmit)}>
            <FormControl type="email" label="Email" error={errors.email}
                register={register("email", validate(40, 6))} id="email" />

            <FormControl type="password" label="Password" error={errors.password}
                register={register("password", validate(30, 6))} id="password" />


            <button className="mt-4 h-10 primaryBtn" disabled={loading}>
                Login
            </button>

            <p className="mt-3">Dont have an account?
                <NavLink to={AllRoutes.register} className="ml-2 text-cyan-600 hover:underline">
                    Registration
                </NavLink>
            </p>

            <p className="mt-1">Forgot password?
                <NavLink to={AllRoutes.forgot} className="ml-2 text-cyan-600 hover:underline">
                    Recover password
                </NavLink>
            </p>

            {error && <div className="text-red-600 mt-4 bg-red-100 p-2 border border-red-600 rounded-md">
                {error.message}
            </div>}
        </form>
    );
};

export default LoginForm;