import { useState } from "react";
import { Link } from "react-router-dom";
import signup from "../../api/signup";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import SuccessMessage from "../../components/SuccessMessage";
import { useStateContext } from "../../context/ContextProvider";

function SignUp() {
    const [inputs, setInputs] = useState({ role: 'Cơ sở sản xuất' });
    const [validEmail, setValidEmail] = useState(true);
    const [error, setError] = useState(false);
    const [errorContent, setErrorContent] = useState('');
    const [loading, setLoading] = useState(false);
    const { showSuccessModal, setShowSuccessModal } = useStateContext();

    const handleCheckEmail = (event) => {
        let mail = event.target.value;
        let check = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
        if (!check) setValidEmail(false);
        else setValidEmail(true);
    }

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const showErrorMessage = (content) => {
        setError(true);
        setErrorContent(content);
        setLoading(false);
        setTimeout(() => {
            setError(false);
        }, 5000);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (inputs.password !== inputs.confirmPassword) {
            showErrorMessage('Mật khẩu nhập lại không đúng!');
        } else {
            let { confirmPassword, ...newInputs } = inputs;
            const checkSignUp = await signup(newInputs);
            if (!checkSignUp) {
                showErrorMessage('Tên đăng nhập hoặc email đã tồn tại! Vui lòng kiểm tra lại thông tin tài khoản!');
            } else {
                setLoading(false);
                setShowSuccessModal(true);
            }
        }
    }

    return (
        <>
            <div className='bg-white flex flex-col justify-center rounded-xl shadow-lg'>
                {error && <ErrorMessage content={errorContent} />}
                <h2 className='text-2xl dark:text-white font-bold text-center pt-4'>Đăng ký</h2>
                {loading && <Loading />}
                <form
                    className='max-w-[500px] w-full mx-auto rounded-xl bg-white p-4 px-8 flex flex-col'
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-row gap-5">
                        <div className="basis-1/2">
                            <div className='text-gray-400 py-2'>
                                <input
                                    className='p-2 rounded-lg bg-white mt-2 border border-solid border-gray-200 focus:border-blue-500 focus:outline-none'
                                    type="text"
                                    name="username"
                                    value={inputs.username || ""}
                                    onChange={handleInputChange}
                                    placeholder="Username"
                                />
                            </div>
                            <div className='text-gray-400 py-2'>
                                <input
                                    className='p-2 rounded-lg bg-white mt-2 border border-solid border-gray-200 focus:border-blue-500 focus:outline-none'
                                    type="text"
                                    name="name"
                                    value={inputs.name || ""}
                                    onChange={handleInputChange}
                                    placeholder="Name"
                                />
                            </div>
                            <div className='text-gray-400 py-2'>
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
                            <div className='text-gray-400 py-2'>
                                <select
                                    name="role"
                                    value={inputs.role}
                                    onChange={handleInputChange}
                                    className='w-full rounded-lg bg-white mt-2 p-2 border border-solid border-gray-200 focus:border-blue-500 focus:outline-none'
                                >
                                    <option value="Cơ sở sản xuất">Cơ sở sản xuất</option>
                                    <option value="Trung tâm bảo hành">Trung tâm bảo hành</option>
                                    <option value="Đại lý">Đại lý</option>
                                </select>
                            </div>
                        </div>

                        <div className="basis-1/2">
                            <div className='text-gray-400 py-2'>
                                <input
                                    className='p-2 rounded-lg bg-white mt-2 border border-solid border-gray-200 focus:border-blue-500 focus:outline-none'
                                    type="password"
                                    name="password"
                                    value={inputs.password || ""}
                                    onChange={handleInputChange}
                                    placeholder="Password"
                                />
                            </div>
                            <div className='text-gray-400 py-2'>
                                <input
                                    className='p-2 rounded-lg bg-white mt-2 border border-solid border-gray-200 focus:border-blue-500 focus:outline-none'
                                    type="password"
                                    name="confirmPassword"
                                    value={inputs.confirmPassword || ""}
                                    onChange={handleInputChange}
                                    placeholder="Confirm password"
                                />
                            </div>
                            <div className='text-gray-400 py-2'>
                                <input
                                    className='p-2 rounded-lg bg-white mt-2 border border-solid border-gray-200 focus:border-blue-500 focus:outline-none'
                                    type="text"
                                    name="phoneNumber"
                                    value={inputs.phoneNumber || ""}
                                    onChange={handleInputChange}
                                    placeholder="PhoneNumber"
                                />
                            </div>
                            <div className='text-gray-400 py-2'>
                                <input
                                    className='p-2 rounded-lg bg-white mt-2 border border-solid border-gray-200 focus:border-blue-500 focus:outline-none'
                                    type="text"
                                    name="address"
                                    value={inputs.address || ""}
                                    onChange={handleInputChange}
                                    placeholder="Address"
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        className='w-full my-5 py-2 bg-green-500 shadow-lg shadow-green-500/50 hover:shadow-green-500/40 text-white font-semibold rounded-lg'
                        type="submit"
                    >
                        Đăng ký
                    </button>
                </form>
                <div className='text-black py-2 text-center mb-4'>
                    <p>Bạn đã có tài khoản?<Link to={'/'} className="underline">Đăng nhập tại đây</Link></p>
                </div>
            </div>
            {showSuccessModal && <SuccessMessage content="Đăng ký thành công! Tài khoản của bạn sẽ được quản trị viên phê duyệt." />}
        </>
    );
}

export default SignUp;