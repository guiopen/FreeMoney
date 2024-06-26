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
    const { windowWidth, windowHeight } = useWindowSize();
    const [currentAuthComponent, setCurrentAuthComponent] = useState(AUTH_COMPONENT.LOGIN);

    return (
        <div className="flex flex-col lg:flex-row justify-between items-center h-screen bg-[#D8FDFF] p-4 lg:p-0">
            <div className="flex-1 w-full max-w-md bg-white p-8 rounded-lg shadow-md lg:ml-100 xl:ml-200 mx-auto lg:mx-0 min-w-[300px]">
                <div className="flex justify-between mb-6 space-x-2">
                    <button
                        type="button"
                        onClick={() => setCurrentAuthComponent(AUTH_COMPONENT.REGISTER)}
                        className={
                            currentAuthComponent === AUTH_COMPONENT.REGISTER ?
                                "text-lg font-bold text-[#3298AB] border-b-2 border-[#3298AB] hover:border-black hover:text-black transition-colors" :
                                "text-lg font-bold hover:text-[#3298AB] transition-colors"
                        }
                    >
                        Cadastrar
                    </button>
                    <button
                        type="button"
                        onClick={() => setCurrentAuthComponent(AUTH_COMPONENT.LOGIN)}
                        className={
                            currentAuthComponent === AUTH_COMPONENT.LOGIN ?
                                "text-lg font-bold text-[#3298AB] border-b-2 border-[#3298AB] hover:border-black hover:text-black transition-colors" :
                                "text-lg font-bold hover:text-[#3298AB] transition-colors"
                        }
                    >
                        Entrar
                    </button>
                </div>
                {currentAuthComponent === AUTH_COMPONENT.LOGIN ? <LoginComponent /> : <RegisterComponent />}
            </div>
            <div className="h-80 border-l border-black mr-40 ml-40 hidden lg:block"></div>
            <Logo />
        </div>
    );
};

export default AuthPage;
