import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';

import Button from './Button';
import { useStateContext } from '../context/ContextProvider';
import avatar from '../assets/avatar.jpg';

const ProfileOption = () => {
    const { currentColor, userProfileData } = useStateContext();
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.clear();
        navigate(0);
    }

    const profileDropdownItem = [
        {
            icon: <CgProfile />,
            title: 'My Profile',
            desc: 'Account Settings',
            iconColor: '#03C9D7',
            iconBg: '#E5FAFB',
        },
    ]

    return (
        <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 z-50">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
                <Button
                    icon={<MdOutlineCancel />}
                    color="rgb(153, 171, 180)"
                    bgHoverColor="light-gray"
                    size="2xl"
                    borderRadius="50%"
                />
            </div>
            <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
                <img
                    className="rounded-full h-24 w-24"
                    src={avatar}
                    alt="user-profile"
                />
                <div>
                    <p className="font-semibold text-xl dark:text-gray-200"> {userProfileData.name}</p>
                    <p className="text-gray-500 text-sm dark:text-gray-400">  {userProfileData.role}  </p>
                    <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {userProfileData.email}</p>
                </div>
            </div>
            <div>
                {profileDropdownItem.map((item, index) => (
                    <div key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
                        <button
                            type="button"
                            style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                            className=" text-xl rounded-lg p-3 hover:bg-light-gray"
                        >
                            {item.icon}
                        </button>

                        <div>
                            <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
                            <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-5">
                <button
                    type="button"
                    onClick={handleClick}
                    style={{ backgroundColor: `${currentColor}`, borderRadius: "10px" }}
                    className={` text-xl p-3 w-full hover:drop-shadow-xl hover:bg-${currentColor} text-white`}
                >
                    Logout
                </button>
            </div>
        </div>

    );
};

export default ProfileOption;
