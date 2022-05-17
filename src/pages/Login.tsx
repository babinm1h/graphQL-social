import LoginForm from "../components/LoginForm";


const Login = () => {


    return (
        <>
            <div className="max-w-lg w-full mx-auto">

                <div className="shadow-md border flex flex-col">
                    <h1 className="text-3xl font-semibold text-center border-b border-b-gray-300 py-3">
                        Login
                    </h1>
                    <LoginForm />
                </div>

            </div>
        </>
    );
};

export default Login;