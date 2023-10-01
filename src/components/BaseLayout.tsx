import TopComponent from '@/components/TopComponent';
import TopComponentSpecial from '@/components/TopComponentSpecial';
import { RouteNotLayout, RouteTopComponentSpecial } from '@/constants/Routes';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useRouter } from 'next/router';
import React, { LegacyRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import Header from './Header';
import dynamic from 'next/dynamic';
import { IBaseAppProps } from '@/interfaces/CommonProps';

config.autoAddCss = false;
const Toaster = dynamic(() => import('react-hot-toast').then((c) => c.Toaster), {
    ssr: false,
});

const Layout: React.FC<IBaseAppProps> = ({ children }) => {
    const { pathname } = useRouter();

    if (RouteNotLayout.includes(pathname)) {
        return (
            <MainLayout isShowHeader={false} isShowFooter={false} isShowBanner={false} pathname={pathname}>
                {children}
            </MainLayout>
        );
    }

    return (
        <>
            <MainLayout isShowHeader={true} isShowFooter={true} isShowBanner={true} pathname={pathname}>
                {children}
            </MainLayout>
        </>
    );
};

interface IProps extends IBaseAppProps {
    isShowHeader: boolean;
    isShowFooter: boolean;
    isShowBanner: boolean;
    ref?: LegacyRef<HTMLDivElement>;
    pathname: string;
}

const MainLayout: React.FC<IProps> = (props) => {
    const { children, isShowHeader, isShowFooter, isShowBanner, pathname, ref } = props;
    const TopComponentLayout = RouteTopComponentSpecial.includes(pathname) ? TopComponentSpecial : TopComponent;

    return (
        <div className="h-screen overflow-auto" ref={ref}>
            <Toaster />
            {isShowHeader && <Header />}
            <main className=" my-0 mx-auto bg-[#fff] max-w-full lg:max-w-[90vw] xl:max-w-primary px-6 lg:px-0">
                {isShowBanner && <TopComponentLayout />}
                {children}
            </main>
            {isShowFooter && <Footer />}
        </div>
    );
};

export default Layout;
