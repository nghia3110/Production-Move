import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";

import { useStateContext } from "../../../context/ContextProvider";

function DefaultLayout({ children }) {
    const sidebarStyle = {
        boxShadow: "rgb(113 122 131 / 11%) 0px 7px 30px 0px"
    }

    const { activeMenu, userProfileData, setUserProfileData } = useStateContext();
    return (
        <div className="flex relative dark:bg-main-dark-bg">
            {activeMenu ? (
                <div className="w-72 fixed dark:bg-secondary-dark-bg bg-white" style={sidebarStyle}>
                    <Sidebar role={userProfileData.role}/>
                </div>
            ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                    <Sidebar />
                </div>
            )}
            <div
                className={
                    activeMenu
                        ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                        : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                }
            >
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                    <Navbar />
                </div>
                <div>
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default DefaultLayout;