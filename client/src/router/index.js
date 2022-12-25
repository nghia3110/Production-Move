import Home from "../pages/Admin/Home";
import Productlines from "../pages/Admin/Productlines";
import Users from "../pages/Admin/Users";

const publicRoutes = [
    {path: '/', component: Home},
    {path: '/adminhome', component: Home},
    {path: '/productlines', component: Productlines},
    {path: '/users', component: Users}
];

const privateRoutes = [

];

export {publicRoutes, privateRoutes};