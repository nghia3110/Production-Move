import { useState } from 'react';
import Header from '../../../components/Layout/DefaultLayout/Header';
import { useStateContext } from '../../../context/ContextProvider';
import productAPI from '../../../api/product';
import SuccessMessage from '../../../components/SuccessMessage';
import { useEffect } from 'react';
import dataAPI from '../../../api/data';
import ErrorMessage from '../../../components/ErrorMessage';

function GuaranteeProducts() {
    const [inputs, setInputs] = useState({});
    const [guarantees, setGuarantees] = useState([]);
    const [products, setProducts] = useState([]);
    const { userProfileData, showSuccessModal, setShowSuccessModal } = useStateContext();

    useEffect(() => {
        const getGuaranteeData = async () => {
            const data = await dataAPI.getAllUser();
            for (let item of data) {
                if (item.role == 'Trung tâm bảo hành') {
                    setGuarantees(arr => [
                        item, ...arr
                    ]);
                }
            }
        }
        getGuaranteeData();
    }, []);

    useEffect(() => {
        const getProducts = async () => {
            const data = await productAPI.getErrorProduct(userProfileData.id);
            for (let item of data) {
                setProducts(arr => [
                    item, ...arr
                ]);
            }
        }
        getProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        inputs['agencyId'] = userProfileData.id;
        const checkGuaranteeProduct = await productAPI.guaranteeProduct(inputs);
        if (checkGuaranteeProduct) {
            setShowSuccessModal(true);
        }
    }

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl shadow-lg">
            <Header category="Page" title="Bảo hành sản phẩm" />
            <div className='mt-4'>
                <form
                    className='w-2/5 mx-auto bg-white p-4 px-8'
                    onSubmit={handleSubmit}
                >
                    <div className='flex flex-row gap-5 items-center justify-center text-gray-400 py-2'>
                        <label>
                            Mã sản phẩm cần bảo hành: 
                            <select
                                name="imei"
                                value={inputs.imei || 'Mã sản phẩm'}
                                onChange={handleInputChange}
                                className='w-full rounded-lg bg-white mt-2 p-2 border border-solid border-gray-200 focus:border-blue-500 focus:outline-none'
                            >
                                <option value='Mã sản phẩm'>Mã sản phẩm</option>
                                {products.map((item, index) => (
                                    <option key={index} value={`${item.imei}`}>{item.imei}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className='flex flex-row gap-5 items-center justify-center text-gray-400 py-2'>
                        <label>
                            Chọn trung tâm bảo hành:
                            <select
                                name="guarantee"
                                value={inputs.guarantee || 'Trung tâm bảo hành'}
                                onChange={handleInputChange}
                                className='w-full rounded-lg bg-white mt-2 p-2 border border-solid border-gray-200 focus:border-blue-500 focus:outline-none'
                            >
                                <option value='Trung tâm bảo hành'>Trung tâm bảo hành</option>
                                {guarantees.map((item) => (
                                    <option key={item} value={`${item.name}`}>{item.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <button
                        className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
                        type="submit"
                    >
                        Xác nhận
                    </button>
                </form>
                {showSuccessModal && <SuccessMessage content="Đã gửi sản phẩm đến trung tâm bảo hành!" />}
            </div>
        </div>
    );
}

export default GuaranteeProducts;