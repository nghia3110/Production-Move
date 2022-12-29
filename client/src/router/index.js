import AdminHome from "../pages/Admin/AdminHome";
import Productlines from "../pages/Admin/Productlines";
import Users from "../pages/Admin/Users";
import SignUp from "../pages/Signup";
import Home from "../pages/Users/Home";
import { FormLayout } from "../components/Layout";
import ReceiveProducts from "../pages/Users/ReceiveProducts";
import DistributeProducts from "../pages/Users/DistributeProducts";
import Products from "../pages/Users/Products";
import GuaranteeProducts from "../pages/Users/GuaranteeProducts";
import SellProducts from "../pages/Users/SellProducts";
import GivebackProducts from "../pages/Users/GivebackProducts";
import ReceiveFromFactory from "../pages/Users/ReceiveFromFactory";

function useRoutes() {
    const routes = {
        publicRoutes: [
            { path: '/sign-up', component: SignUp, layout: FormLayout },
        ],

        adminRoutes: [
            { path: '/admin-home', component: AdminHome },
            { path: '/productlines', component: Productlines },
            { path: '/users', component: Users },
        ],

        userRoutes: [
            { path: '/home', component: Home },
            { path: '/receive', component: ReceiveProducts },
            { path: '/distribute', component: DistributeProducts },
            { path: '/products', component: Products },
            { path: '/guarantee', component: GuaranteeProducts },
            { path: '/sell', component: SellProducts },
            { path: '/giveback', component: GivebackProducts },
            { path: '/receive-from-factory', component: ReceiveFromFactory }
        ]
    }
    return routes;
}

export default useRoutes;