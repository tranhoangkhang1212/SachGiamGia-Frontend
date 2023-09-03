import Head from 'next/head';
import Home from './home';

const HomePage = () => {
    return (
        <div className="mt-12">
            <Head>
                <title>Sách giảm giá</title>
            </Head>
            <Home />
        </div>
    );
};

export default HomePage;
