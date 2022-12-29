import { BsBoxSeam, BsPhone } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import productAPI from '../../../api/product';
import { useStateContext } from '../../../context/ContextProvider';

function UserHome() {
    const [dashboardData, setDashboardData] = useState({});
    const {userProfileData} = useStateContext();

    useEffect(() => {
        const getData = async () => {
            console.log(userProfileData.id)
            const data = await productAPI.getQuantity(userProfileData.id);
            let quantity = 0;
            for(let item of data) {
                quantity += item.quantity;
            }
            setDashboardData({
                products: quantity,
                productlines: data.length
            })
        }

        getData().catch(error => console.log(error));
    }, [])

    /* useEffect(() => {
        const getData = async () => {
            const countByStatus = await dataAPI.countProductByStatus();
            const countByFactory = await dataAPI.countProductByFactory();
            const countByAgency = await dataAPI.countProductByAgency();
            const countByGuarantee = await dataAPI.countProductByGuarantee();
            setChartData({
                countByStatus,
                countByFactory,
                countByAgency,
                countByGuarantee
            });
        }
        getData();
    }, []) */

    const list = [
        {
            icon: <BsBoxSeam />,
            count: `${dashboardData.products}`,
            title: 'Products',
            iconColor: 'rgb(255, 244, 229)',
            iconBg: 'rgb(254, 201, 15)',
            pcColor: 'green-600',
        },
        {
            icon: <BsPhone />,
            count: `${dashboardData.productlines}`,
            title: 'ProductLines',
            iconColor: 'rgb(228, 106, 118)',
            iconBg: 'rgb(255, 244, 229)',
            pcColor: 'green-600',
        },
    ];

    return (
        <div className="mt-12">
            <div className="flex flex-wrap lg:flex-nowrap justify-center ">
                <div className="flex m-3 flex-wrap justify-center gap-8 items-center">
                    {list.map((item) => (
                        <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl shadow-lg">
                            <button
                                type="button"
                                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                            >
                                {item.icon}
                            </button>
                            <p className="mt-3">
                                <span className="text-lg font-semibold">{item.count}</span>
                            </p>
                            <p className="text-sm text-gray-400  mt-1">{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}

export default UserHome;