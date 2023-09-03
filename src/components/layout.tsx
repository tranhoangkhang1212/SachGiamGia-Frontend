import { IBaseAppProps } from '@/interfaces/props';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import Footer from './Footer';
import Header from './Header';

const Layout: React.FC<IBaseAppProps> = ({ children }) => {
    return (
        <>
            <Toaster />
            <Header />
            <main className=" my-0 mx-auto bg-[#fff] max-w-full lg:max-w-[90vw] xl:max-w-primary px-6 lg:px-0">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;
