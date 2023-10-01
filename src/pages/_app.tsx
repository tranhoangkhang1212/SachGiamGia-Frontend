import Layout from '@/components/Layout';
import store from '@/redux/store';
import '@/styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const App = ({ Component, pageProps }: AppProps) => {
    console.log('******************ENV******************', { ...process.env });

    return (
        <Provider store={store}>
            <Layout>
                <Head>
                    <title>Sách giảm giá</title>
                    <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico" />
                </Head>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
};

export default App;
