import { FaHome, FaList, FaWarehouse } from "react-icons/fa";
import { MdPerson, MdAdd, MdSell, MdQueryStats} from "react-icons/md";

const adminLinks = [
    {
        title: 'Home',
        links: [
            {
                name: 'adminhome',
                text: 'Trang chủ',
                icon: <FaHome />
            }
        ]
    },
    {
        title: 'Pages',
        links: [
            {
                name: 'productlines',
                text: 'Dòng sản phẩm',
                icon: <FaList />
            },
            {
                name: 'users',
                text: 'Người dùng',
                icon: <MdPerson />
            }
        ]
    }

];
const factoryLinks = [
    {
        title: 'Home',
        links: [
            {
                name: 'home',
                text: 'Trang chủ', 
                icon: <FaHome />
            }
        ]
    },
    {
        title: 'Pages',
        links: [
            {
                name: 'receive',
                text: 'Nhập sản phẩm',
                icon: <MdAdd />
            },
            {
                name: 'sell',
                text: 'Bán sản phẩm',
                icon: <MdSell />
            },
            {
                name: 'list-product',
                text: 'Kho',
                icon: <FaWarehouse />
            },
            {
                name: 'statistic',
                text: 'Thống kê',
                icon: <MdQueryStats />
            }
        ]
    }
]

export { adminLinks, factoryLinks};