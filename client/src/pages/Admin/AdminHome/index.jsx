import { BsBoxSeam, BsPhone } from 'react-icons/bs';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { useEffect, useState } from 'react';
import dataAPI from '../../../api/data';
import Charts from '../../../components/Charts/Charts';


function AdminHome() {
    const [dashboardData, setDashboardData] = useState({});
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const getData = async () => {
            const users = await dataAPI.allUser();
            const products = await dataAPI.allProduct();
            const productlines = await dataAPI.allProductLine();
            setDashboardData({
                users,
                products,
                productlines
            })
        }

        getData().catch(error => console.log(error));
    }, [])

    useEffect(() => {
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
    }, [])

    const list = [
        {
            icon: <MdOutlineSupervisorAccount />,
            count: `${dashboardData.users}`,
            title: 'Users',
            iconColor: '#03C9D7',
            iconBg: '#E5FAFB',
            pcColor: 'red-600',
        },
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
            <div className="flex gap-10 m-8 flex-wrap justify-center">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760 shadow-lg">
                    <div className="flex justify-between items-center gap-2 mb-10">
                        <p className="text-xl font-semibold">Theo trạng thái</p>
                    </div>
                    <div className="md:w-full overflow-auto">
                        <Charts data={chartData.countByStatus} xTitle='Trạng thái' yTitle='Số lượng' id='status-chart'/>
                    </div>
                </div>
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760 shadow-lg">
                    <div className="flex justify-between items-center gap-2 mb-10">
                        <p className="text-xl font-semibold">Theo cơ sở sản xuất</p>
                    </div>
                    <div className="md:w-full overflow-auto">
                        <Charts data={chartData.countByFactory} xTitle='Cơ sở sản xuất' yTitle='Số lượng' id='factory-chart'/>
                    </div>
                </div>
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760 shadow-lg">
                    <div className="flex justify-between items-center gap-2 mb-10">
                        <p className="text-xl font-semibold">Theo đại lý phân phối</p>
                    </div>
                    <div className="md:w-full overflow-auto">
                        <Charts data={chartData.countByAgency} xTitle='Đại lý phân phối' yTitle='Số lượng' id='Agency-chart'/>
                    </div>
                </div>
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760 shadow-lg">
                    <div className="flex justify-between items-center gap-2 mb-10">
                        <p className="text-xl font-semibold">Theo trung tâm bảo hành</p>
                    </div>
                    <div className="md:w-full overflow-auto">
                        <Charts data={chartData.countByGuarantee} xTitle='Trung tâm bảo hành' yTitle='Số lượng' id='Guarantee-chart'/>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default AdminHome;