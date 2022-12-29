import { useState } from 'react';
import Header from '../../../components/Layout/DefaultLayout/Header';
import { useStateContext } from '../../../context/ContextProvider';
import productAPI from '../../../api/product';
import SuccessMessage from '../../../components/SuccessMessage';
import { useEffect } from 'react';

function GivebackProducts() {
    const [inputs, setInputs] = useState({});
    const [products, setProducts] = useState([]);
    const [next, setNext] = useState(false);
    const [factories, setFactories] = useState([]);
    const [agencies, setAgencies] = useState([]);
    const { userProfileData, showSuccessModal, setShowSuccessModal } = useStateContext();

    useEffect(() => {
        const getProducts = async () => {
            const data = await productAPI.getProduct(userProfileData.id);
            for (let item of data) {
                setProducts(arr => [
                    item, ...arr
                ]);
            }
        }
        getProducts();
    }, []);

    const handleClickNext = async (e) => {
        e.preventDefault();
        const data = await productAPI.getProductDetail(inputs['imei']);
        let historyArr = data[0].history.split(',');
        historyArr = historyArr.filter((item,
            index) => historyArr.indexOf(item) === index);
        for (let item of historyArr) {
            if (item.includes('Cơ sở')) {
                setFactories(arr => [
                    item, ...arr
                ]);
            }
            if (item.includes('Đại lý')) {
                setAgencies(arr => [
                    item, ...arr
                ]);
            }
        }
        setNext(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        inputs['guaranteeId'] = userProfileData.id;
        const checkGivebackProduct = await productAPI.givebackProduct(inputs);
        if (checkGivebackProduct) {
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
            <Header category="Page" title="Trả sản phẩm" />
            <div className='mt-4'>
                <div className='w-2/5 mx-auto bg-white p-4 px-8'>
                    {!next && <div>
                        <div className='flex flex-row gap-5 items-center justify-center text-gray-400 py-2'>
                            <label>
                                Chọn mã sản phẩm:
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
                                    Trả lại cơ sở sản xuất:
                                    <select
                                        name="factory"
                                        value={inputs.factory || 'Chọn cơ sở sản xuất'}
                                        onChange={handleInputChange}
                                        className='w-full rounded-lg bg-white mt-2 p-2 border border-solid border-gray-200 focus:border-blue-500 focus:outline-none'
                                    >
                                        <option value='Chọn cơ sở sản xuất'>Chọn cơ sở sản xuất</option>
                                        {factories.map((item, index) => (
                                            <option key={index} value={`${item}`}>{item}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className='flex flex-row gap-5 items-center justify-center text-gray-400 py-2'>
                                <label>
                                    Trả lại đại lý:
                                    <select
                                        name="agency"
                                        value={inputs.agency || 'Chọn đại lý'}
                                        onChange={handleInputChange}
                                        className='w-full rounded-lg bg-white mt-2 p-2 border border-solid border-gray-200 focus:border-blue-500 focus:outline-none'
                                    >
                                        <option value='Chọn đại lý'>Chọn đại lý</option>
                                        {agencies.map((item, index) => (
                                            <option key={index} value={`${item}`}>{item}</option>
                                        ))}
                                    </select>
                                </label>
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
                {showSuccessModal && <SuccessMessage content="Trả sản phẩm thành công!" />}
            </div>
        </div >
    );
}

export default GivebackProducts;