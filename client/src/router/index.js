import AdminHome from "../pages/Admin/AdminHome";
import Productlines from "../pages/Admin/Productlines";
import Users from "../pages/Admin/Users";
import SignUp from "../pages/Signup";
import { FormLayout, DefaultLayout } from "../components/Layout";

function useRoutes() {
    const publicRoutes = [
        {path: '/sign-up', component: SignUp, layout: FormLayout},
        {path: '/admin-home', component: AdminHome},
        {path: '/productlines', component: Productlines},
        {path: '/users', component: Users}
    ];
    return publicRoutes;
}

export default useRoutes;