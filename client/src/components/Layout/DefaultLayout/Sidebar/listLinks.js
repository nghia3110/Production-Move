import { FaHome, FaList, FaWarehouse } from "react-icons/fa";
import { MdPerson, MdAdd, MdSell, MdQueryStats} from "react-icons/md";

const adminLinks = [
    {
        title: 'Home',
        links: [
            {
                name: 'admin-home',
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
                name: 'distribute',
                text: 'Xuất sản phẩm',
                icon: <MdSell />
            },
            {
                name: 'list-product',
                text: 'Kho',
                icon: <FaWarehouse />
            },
        ]
    }
]

export { adminLinks, factoryLinks};