import { useState } from 'react';
import Header from '../../../components/Layout/DefaultLayout/Header';
import { useStateContext } from '../../../context/ContextProvider';
import productAPI from '../../../api/product';
import SuccessMessage from '../../../components/SuccessMessage';

const options = [
    'Samsung Galaxy S22',
    'Samsung Galaxy S21',
    'Samsung Galaxy S20',
    'Samsung Galaxy A23',
    'Samsung Galaxy A33',
    'Samsung Galaxy A53',
    'Samsung Galaxy A73',
    'Samsung Galaxy M33',
    'Samsung Galaxy M53',
    'Samsung Galaxy Z Flip 4',
];

function ReceiveProducts() {
    const [inputs, setInputs] = useState({});
    const { userProfileData, showSuccessModal, setShowSuccessModal } = useStateContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        inputs['userId'] = userProfileData.id;
        const checkAddProduct = await productAPI.addProduct(inputs);
        if (checkAddProduct) {
            setShowSuccessModal(true);
        }
    }

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl shadow-lg">
            <Header category="Page" title="Nhập sản phẩm" />
            <div className='mt-4'>
                <form
                    className='w-2/5 mx-auto bg-white p-4 px-8'
                    onSubmit={handleSubmit}
                >
                    <div className='flex flex-row gap-5 items-center justify-center text-gray-400 py-2'>
                        <label className='text-center'>Chọn sản phẩm: </label>
                        <select
                            name="model"
                            value={inputs.model}
                            onChange={handleInputChange}
                            className='w-full rounded-lg bg-white mt-2 p-2 border border-solid border-gray-200 focus:border-blue-500 focus:outline-none'
                        >
                            {options.map((item) => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-row gap-5 text-gray-400 py-2'>
                    <label className='text-center'>Số lượng: </label>
                        <input
                            className='p-2 rounded-lg bg-white mt-2 border border-solid border-gray-200 focus:border-blue-500 focus:outline-none'
                            type="text"
                            name="quantity"
                            value={inputs.quantity}
                            onChange={handleInputChange}
                            placeholder="Số lượng"
                        />
                    </div>
                    <button
                        className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
                        type="submit"
                    >
                        Nhập sản phẩm
                    </button>
                </form>
                {showSuccessModal && <SuccessMessage content="Nhập sản phẩm thành công!" />}
            </div>
        </div>
    );
}

export default ReceiveProducts;