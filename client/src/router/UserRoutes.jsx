import {Routes, Route} from 'react-router-dom';
import { DefaultLayout } from '../components/Layout';
import UserHome from '../pages/Users/Home';
import { Fragment } from 'react';

function UserRoutes(props) {
    return (
        <Routes>
            <Route path='/' element={<DefaultLayout><UserHome /></DefaultLayout>}></Route>
            {props.routes.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout;
                if (route.layout) {
                    Layout = route.layout;
                } else if (route.layout === null) {
                    Layout = Fragment;
                }
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={<Layout><Page /></Layout>}>
                    </Route>
                );
            })}
        </Routes>
    );
}

export default UserRoutes;