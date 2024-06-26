import React from 'react';
import logo from '../assets/images/FreeMoney-logo.png';

const Logo = () => {
    return (
        <div className='flex justify-center items-center h-screen bg-[#D8FDFF] lg:mr-100 xl:mr-200  min-w-[300px]'>
            <div className='flex flex-col items-center'>
                <img className="h-80 w-80 md:h-80 md:w-80 lg:h-100 lg:w-100 xl:h-110 xl:w-110 mb-4" src={logo} alt="Logo" /> 
                <h2 className="font-bold text-3xl text-center">FreeMoney</h2>
            </div>
        </div>
    );
};

export default Logo;
