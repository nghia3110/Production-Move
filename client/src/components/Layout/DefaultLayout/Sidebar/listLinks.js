import { FaHome, FaList, FaWarehouse } from "react-icons/fa";
import { MdPerson, MdAdd, MdSell, MdQueryStats } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

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
                name: 'products',
                text: 'Kho',
                icon: <FaWarehouse />
            },
        ]
    }
]

const agencyLinks = [
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
                name: 'receive-from-factory',
                text: 'Nhập sản phẩm',
                icon: <MdAdd />
            },
            {
                name: 'sell',
                text: 'Bán sản phẩm',
                icon: <MdSell />
            },
            {
                name: 'products',
                text: 'Kho',
                icon: <FaWarehouse />
            },
            {
                name: 'guarantee',
                text: 'Bảo hành sản phẩm',
                icon: <TbTruckDelivery />
            },
        ]
    }
];

const guaranteeLinks = [
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
                name: 'giveback',
                text: 'Trả sản phẩm',
                icon: <MdSell />
            },
            {
                name: 'products',
                text: 'Kho',
                icon: <FaWarehouse />
            },
        ]
    }
]

export { adminLinks, factoryLinks, agencyLinks, guaranteeLinks };