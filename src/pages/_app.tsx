import Layout from '@/components/Layout';
import { TOKEN_LOCAL_STORAGE_KEY } from '@/constants/FeatureKeyConstant';
import { RouteNotLayout, RouteNotTopComponent } from '@/constants/Routes';
import useLocalStorage from '@/hooks/useLocalStorage';
import store from '@/redux/store';
import '@/styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import TopComponent from '@/components/TopComponent';

config.autoAddCss = false;
const Toaster = dynamic(
    () => import('react-hot-toast').then((c) => c.Toaster),
    {
        ssr: false,
    },
);

const App = ({ Component, pageProps }: AppProps) => {
    const { pathname, push } = useRouter();
    const { getValue } = useLocalStorage();

    const LayoutComponent = RouteNotLayout.includes(pathname)
        ? React.Fragment
        : Layout;
    const TopComponentLayout = RouteNotTopComponent.includes(pathname)
        ? React.Fragment
        : TopComponent;

    useEffect(() => {
        checkTokenAndRedirect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkTokenAndRedirect = () => {
        const token = getValue(TOKEN_LOCAL_STORAGE_KEY);
        if (!token) {
            push('/login');
        }
    };

    return (
        <Provider store={store}>
            <LayoutComponent>
                <TopComponentLayout />
                <Toaster />
                <Head>
                    <title>First Next App</title>
                </Head>
                <Component {...pageProps} />
            </LayoutComponent>
        </Provider>
    );
};

export default App;
