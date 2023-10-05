import TopComponent from '@/components/TopComponent';
import TopComponentSpecial from '@/components/TopComponentSpecial';
import { API } from '@/configs/axios';
import { RouteNotLayout, RouteTopComponentSpecial } from '@/constants/Routes';
import { IBaseAppProps } from '@/interfaces/CommonProps';
import { BaseLayoutResponseDto } from '@/interfaces/response/BaseLayoutResponseDto';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { LegacyRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useAsync } from 'react-use';
import Footer from './Footer';
import Header from './Header';

config.autoAddCss = false;
const Toaster = dynamic(() => import('react-hot-toast').then((c) => c.Toaster), {
    ssr: false,
});

const Layout: React.FC<IBaseAppProps> = ({ children }) => {
    const { pathname } = useRouter();

    const [initLayout, setInitLayout] = useState<BaseLayoutResponseDto>();

    useAsync(async () => {
        const { data }: { data: BaseLayoutResponseDto } = await API.get('layout/base-layout');
        setInitLayout(data);
    });

    if (RouteNotLayout.includes(pathname)) {
        return (
            <MainLayout
                isShowHeader={false}
                isShowFooter={false}
                isShowBanner={false}
                pathname={pathname}
                hotline={initLayout?.phone}
                footerData={initLayout}
            >
                {children}
            </MainLayout>
        );
    }

    return (
        <>
            <MainLayout
                isShowHeader={true}
                isShowFooter={true}
                isShowBanner={true}
                pathname={pathname}
                hotline={initLayout?.phone}
                footerData={initLayout}
            >
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
    hotline?: string;
    footerData?: BaseLayoutResponseDto;
}

const MainLayout: React.FC<IProps> = (props) => {
    const { children, isShowHeader, isShowFooter, isShowBanner, pathname, ref, footerData } = props;
    const TopComponentLayout = RouteTopComponentSpecial.includes(pathname) ? TopComponentSpecial : TopComponent;

    return (
        <div className="h-screen overflow-auto" ref={ref}>
            <Toaster />
            {isShowHeader && <Header />}
            <main className=" my-0 mx-auto bg-[#fff] max-w-full lg:max-w-[90vw] xl:max-w-primary px-6 lg:px-0 lg:min-h-[88vh]">
                {isShowBanner && <TopComponentLayout hotline={footerData?.phone} />}
                {children}
            </main>
            {isShowFooter && footerData && <Footer data={footerData} />}
        </div>
    );
};

export default Layout;
