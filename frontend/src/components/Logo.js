import React from 'react';
import logo from '../assets/images/FreeMoney-logo.png';

const Logo = () => {
    return (
        <div className='flex justify-between items-center'>
            <div className="h-80 border-l border-black mr-20"></div>
            <div className='mr-40 flex flex-col items-center'>
                <img className="h-200 w-200 mb-0" src={logo} alt="Logo" /> 
                <h2 className="font-bold text-3xl mt-0" >FreeMoney</h2>
                {/* Precisa ajustar a distância que o h2 tá da foto e a responsividade que tá uma merda */}
            </div>
        </div>
    );
};

export default Logo;
