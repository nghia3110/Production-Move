import { useState } from 'react';
import Header from '../../../components/Layout/DefaultLayout/Header';
import { useStateContext } from '../../../context/ContextProvider';
import productAPI from '../../../api/product';
import SuccessMessage from '../../../components/SuccessMessage';
import { useEffect } from 'react';
import dataAPI from '../../../api/data';
import ErrorMessage from '../../../components/ErrorMessage';

function DistributeProducts() {
    const [inputs, setInputs] = useState({});
    const [agencies, setAgencies] = useState([]);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const { userProfileData, showSuccessModal, setShowSuccessModal } = useStateContext();

    useEffect(() => {
        const getAgencyData = async () => {
            const data = await dataAPI.getAllUser();
            for (let item of data) {
                if (item.role == 'Đại lý') {
                    setAgencies(arr => [
                        item, ...arr
                    ]);
                }
            }
        }
        getAgencyData();
    }, []);

    useEffect(() => {
        const getProductQuantity = async () => {
            const data = await productAPI.getQuantity(userProfileData.id);
            for (let item of data) {
                setProducts(arr => [
                    { model: item.model, quantity: item.quantity },
                    ...arr
                ]);
            }
        }
        getProductQuantity();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        inputs['factoryId'] = userProfileData.id;
        if(inputs['quantity'] > products.find(item => item.model == inputs['model']).quantity) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 5000);
            return;
        }
        const checkUpdateProduct = await productAPI.distributeProduct(inputs);
        if (checkUpdateProduct) {
            setShowSuccessModal(true);
        }
    }

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    return (
        <>
        {error && <ErrorMessage content={`Số lượng vượt quá lượng hàng trong kho! 
        Vui lòng nhập số lượng nhỏ hơn ${products.find(item => item.model == inputs['model']).quantity}`} />}
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl shadow-lg">
            <Header category="Page" title="Xuất sản phẩm" />
            <div className='mt-4'>
                <form
                    className='w-2/5 mx-auto bg-white p-4 px-8'
                    onSubmit={handleSubmit}
                >
                    <div className='flex flex-row gap-5 items-center justify-center text-gray-400 py-2'>
                        <label>
                            Chọn sản phẩm:
                            <select
                                name="model"
                                value={inputs.model || 'Chọn sản phẩm'}
                                onChange={handleInputChange}
                                className='w-full rounded-lg bg-white mt-2 p-2 border border-solid border-gray-200 focus:border-blue-500 focus:outline-none'
                            >
                                <option value='Chọn sản phẩm'>Chọn sản phẩm</option>
                                {products.map((item, index) => (
                                    <option key={index} value={`${item.model}`}>{item.model}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className='flex flex-row gap-5 items-center justify-center text-gray-400 py-2'>
                        <label>
                            Xuất sản phẩm cho:
                            <select
                                name="agency"
                                value={inputs.agency || 'Chọn đại lý'}
                                onChange={handleInputChange}
                                className='w-full rounded-lg bg-white mt-2 p-2 border border-solid border-gray-200 focus:border-blue-500 focus:outline-none'
                            >
                                <option value='Chọn đại lý'>Chọn đại lý</option>
                                {agencies.map((item) => (
                                    <option key={item} value={`${item.name}`}>{item.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className='flex flex-row gap-5 text-gray-400 py-2'>
                        <label>
                            Số lượng: 
                            <input
                                type='number'
                                name="quantity"
                                value={inputs.quantity}
                                onChange={handleInputChange}
                                className='w-full rounded-lg bg-white mt-2 p-2 border border-solid border-gray-200 focus:border-blue-500 focus:outline-none'
                            />
                        </label>
                    </div>
                    <button
                        className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
                        type="submit"
                    >
                        Xuất sản phẩm
                    </button>
                </form>
                {showSuccessModal && <SuccessMessage content="Xuất sản phẩm thành công!" />}
            </div>
        </div>
        </>
    );
}

export default DistributeProducts;