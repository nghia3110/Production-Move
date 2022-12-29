import { useState } from 'react';
import Header from '../../../components/Layout/DefaultLayout/Header';
import { useStateContext } from '../../../context/ContextProvider';
import productAPI from '../../../api/product';
import SuccessMessage from '../../../components/SuccessMessage';
import ErrorMessage from '../../../components/ErrorMessage';
import { useEffect } from 'react';
import dataAPI from '../../../api/data';

function ReceiveFromFactory() {
    const [inputs, setInputs] = useState({});
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [next, setNext] = useState(false);
    const [error, setError] = useState(false);
    const [factories, setFactories] = useState([]);
    const { userProfileData, showSuccessModal, setShowSuccessModal } = useStateContext();

    useEffect(() => {
        const getFactoryData = async () => {
            const data = await dataAPI.getAllUser();
            for (let item of data) {
                if (item.role == 'Cơ sở sản xuất') {
                    setFactories(arr => [
                        item, ...arr
                    ]);
                }
                setUsers(arr => [
                    item, ...arr
                ]);
            }
        }
        getFactoryData();
    }, []);

    const handleClickNext = async (e) => {
        e.preventDefault();
        const user = users.find(x => x.name === inputs['factory']);
        console.log(user);
        const data = await productAPI.getQuantity(user.id);
        for (let item of data) {
            setProducts(arr => [
                { model: item.model, quantity: item.quantity },
                ...arr
            ]);
        }
        setNext(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        inputs['agencyId'] = userProfileData.id;
        if(inputs['quantity'] > products.find(item => item.model == inputs['model']).quantity) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 5000);
            return;
        }
        const checkReceiveProduct = await productAPI.receiveProducts(inputs);
        if (checkReceiveProduct) {
            setShowSuccessModal(true);
        }
    }

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    return (
        <>
        {error && <ErrorMessage content={`Số lượng vượt quá lượng hàng trong kho! 
        Vui lòng nhập số lượng nhỏ hơn ${products.find(item => item.model == inputs['model']).quantity}`} />}
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl shadow-lg">
            <Header category="Page" title="Trả sản phẩm" />
            <div className='mt-4'>
                <div className='w-2/5 mx-auto bg-white p-4 px-8'>
                    {!next && <div>
                        <div className='flex flex-row gap-5 items-center justify-center text-gray-400 py-2'>
                            <label>
                                Chọn cơ sở sản xuất:
                                <select
                                    name="factory"
                                    value={inputs.factory || 'Cơ sở sản xuất'}
                                    onChange={handleInputChange}
                                    className='w-full rounded-lg bg-white mt-2 p-2 border border-solid border-gray-200 focus:border-blue-500 focus:outline-none'
                                >
                                    <option value='Cơ sở sản xuất'>Cơ sở sản xuất</option>
                                    {factories.map((item, index) => (
                                        <option key={index} value={`${item.name}`}>{item.name}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <button
                            className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
                            type="button"
                            onClick={handleClickNext}
                        >
                            Tiếp theo
                        </button>
                    </div>}
                    {next && <form
                        className='max-w-[500px] w-full mx-auto rounded-xl bg-white p-2 px-8 flex flex-col'
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col gap-3">
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
                        </div>
                        <button
                            className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
                            type="submit"
                        >
                            Chấp nhận
                        </button>
                    </form>}
                </div>
                {showSuccessModal && <SuccessMessage content="Nhập sản phẩm thành công!" />}
            </div>
        </div >
        </>

    );
}

export default ReceiveFromFactory;