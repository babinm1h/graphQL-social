import RegisterForm from "../components/RegisterForm";

const Register = () => {

    return (
        <>
            <div className="max-w-lg w-full mx-auto">
                <div className="shadow-md border flex flex-col">
                    <h1 className="text-3xl font-semibold text-center border-b border-b-gray-300 py-3">
                        Registration
                    </h1>
                    <RegisterForm />
                </div>
            </div>
        </>
    );
};

export default Register;