import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Loading from "../../components/Loading";
import login from "../../api/login";
import ErrorMessage from "../../components/ErrorMessage";

function Login({ setToken }) {
    const [inputs, setInputs] = useState({});
    const [loading, setLoading] = useState(false);
    const [validEmail, setValidEmail] = useState(true);
    const [loginFailed, setLoginFailed] = useState(false);
    
    const handleCheckEmail = (event) => {
        let mail = event.target.value;
        let check = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
        if (!check) setValidEmail(false);
        else setValidEmail(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userToken = await login({
            email: inputs.email,
            password: inputs.password
        });
        if (!userToken) {
            setLoginFailed(true);
            setLoading(false);
            setTimeout(() => {
                setLoginFailed(false);
            }, 5000);
            
        }
        else setToken(userToken);
    }

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    return (
        <div className='bg-white flex flex-col justify-center rounded-xl shadow-lg'>
            {loginFailed && <ErrorMessage />}
            <h2 className='text-2xl dark:text-white font-bold text-center pt-4'>Đăng nhập</h2>
            {loading && <Loading />}
            <form
                className='max-w-[400px] w-full mx-auto rounded-xl bg-white p-4 px-8'
                onSubmit={handleSubmit}
            >
                <div className='flex flex-col text-gray-400 py-2'>
                    <input
                        className='rounded-lg bg-white mt-2 p-2 border border-solid border-gray-200 focus:border-blue-500 focus:outline-none'
                        type="text"
                        name="email"
                        value={inputs.email || ""}
                        placeholder="Email"
                        onBlur={handleCheckEmail}
                        onChange={handleInputChange}
                    />
                    {!validEmail && <span className="text-sm text-red-500 ml-1">Email không hợp lệ</span>}
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <input
                        className='p-2 rounded-lg bg-white mt-2 border border-solid border-gray-200 focus:border-blue-500 focus:outline-none'
                        type="password"
                        name="password"
                        value={inputs.password || ""}
                        onChange={handleInputChange}
                        placeholder="Password"
                    />
                </div>
                <div className='flex justify-between text-gray-400 py-2'>
                    <p className='flex items-center'>
                        <input
                            className='mr-2'
                            type="checkbox"
                            name="remember"
                            checked={inputs.remember || false}
                            onChange={handleInputChange}
                        /> Remember Me
                    </p>
                </div>
                <button
                    className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
                    type="submit"
                >
                    Đăng nhập
                </button>
                <div className="items-center border-b border-solid border-gray-200 flex mt-5 mb-5 mr-4 ml-4 text-center "></div>
                <Link
                    className='w-full inline-block my-5 py-2 bg-green-500 shadow-lg shadow-green-500/50 hover:shadow-green-500/40 text-white text-center font-semibold rounded-lg'
                    to="/sign-up"
                >
                    Tạo tài khoản
                </Link>
            </form>
        </div>
    );
}

export default Login;
Login.propTypes = {
    setToken: PropTypes.func.isRequired
};