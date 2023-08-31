import Layout from '@/components/layout';
import { TOKEN_LOCAL_STORAGE_KEY } from '@/constants/FeatureKeyContant';
import { RouteNotLayout } from '@/constants/Routes';
import useLocalStorage from '@/hooks/useLocalStorage';
import store from '@/redux/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps }: AppProps) => {
    const { pathname, push } = useRouter();
    const { getValue } = useLocalStorage();

    const Toaster = dynamic(
        () => import('react-hot-toast').then((c) => c.Toaster),
        {
            ssr: false,
        },
    );

    const token = getValue(TOKEN_LOCAL_STORAGE_KEY);

    const LayoutComponent = RouteNotLayout.includes(pathname)
        ? React.Fragment
        : Layout;

    useEffect(() => {
        if (!token) {
            push('/login');
        }
    }, []);

    return (
        <Provider store={store}>
            <LayoutComponent>
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
