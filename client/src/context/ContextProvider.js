import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
    notification: false,
    userProfile: false
};

export const ContextProvider = ({ children }) => {
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentColor, setCurrentColor] = useState('#03C9D7');
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [userProfileData, setUserProfileData] = useState({});
    const [onLoginPage, setOnLoginPage] = useState(true);

  
    const setColor = (color) => {
      setCurrentColor(color);
      localStorage.setItem('colorMode', color);
    };
  
    const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });
  
    return (
      <StateContext.Provider value={{onLoginPage, userProfileData, showSuccessModal, currentColor, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setColor, setShowSuccessModal, setUserProfileData, setOnLoginPage}}>
        {children}
      </StateContext.Provider>
    );
  };
  
  export const useStateContext = () => useContext(StateContext);