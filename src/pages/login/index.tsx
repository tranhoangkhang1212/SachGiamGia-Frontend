import { TOKEN_LOCAL_STORAGE_KEY } from '@/constants/FeatureKeyConstant';
import useLocalStorage from '@/hooks/useLocalStorage';
import Head from 'next/head';
import Link from 'next/link';

const Login = () => {
    const { addValue } = useLocalStorage();
    const handleAddToken = () => {
        addValue(TOKEN_LOCAL_STORAGE_KEY, '');
    };

    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            Login
            <h1 className="title">
                Back <Link href="/home">To Home!</Link>
            </h1>
            <button onClick={handleAddToken}>Add Token</button>
        </div>
    );
};

export default Login;
