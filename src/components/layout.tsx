import { IBaseAppProps } from '@/interfaces/props';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const Layout: React.FC<IBaseAppProps> = ({ children }) => {
    return (
        <>
            <Toaster />
            <div>Header</div>
            <main>{children}</main>
            <div>Footer</div>
        </>
    );
};

export default Layout;
