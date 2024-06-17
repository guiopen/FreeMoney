import React, { useEffect, useState } from 'react';
import Logo from '../../components/Logo';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import useWindowSize from '../../hooks/useWindowSize';

const AUTH_COMPONENT = {
    LOGIN: 'login',
    REGISTER: 'register'
} 

const AuthPage = () => {
    const {windowWidth, windowHeight} = useWindowSize()
    const [currentAuthComponent, setCurrentAuthComponent] = useState(AUTH_COMPONENT.LOGIN)

    return (
        <div className="flex justify-between items-center h-screen bg-[#D8FDFF] ">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md ml-40">
                <div className="flex justify-between mb-6 space-x-2 mx-8">
                    <button
                        type="button"
                        onClick={() => setCurrentAuthComponent(AUTH_COMPONENT.REGISTER)}
                        className={
                            currentAuthComponent == AUTH_COMPONENT.REGISTER ?
                            "text-lg font-bold text-[#3298AB] border-b-2 border-[#3298AB] hover:border-black hover:text-black transition-colors ml-20" :
                            "text-lg font-bold hover:text-[#3298AB] transition-colors ml-20"
                        }
                    >
                        Cadastar
                    </button>
                    <div className='mr-20'>
                        <button
                            type="button"
                            onClick={() => setCurrentAuthComponent(AUTH_COMPONENT.LOGIN)}
                            className={
                                currentAuthComponent == AUTH_COMPONENT.LOGIN ?
                                "text-lg font-bold text-[#3298AB] border-b-2 border-[#3298AB] hover:border-black hover:text-black transition-colors mr-20" :
                                "text-lg font-bold hover:text-[#3298AB] transition-colors mr-20"
                            }
                        >
                            Entrar
                        </button>
                    </div>
                </div>
                {
                currentAuthComponent == AUTH_COMPONENT.LOGIN
                ? <LoginComponent />
                : <RegisterComponent />
                }
            </div>
            <Logo />
        </div>
    );
};

export default AuthPage;
