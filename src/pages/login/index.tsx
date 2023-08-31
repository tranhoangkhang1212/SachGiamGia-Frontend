import { API } from '@/configs/axios';
import { TOKEN_LOCAL_STORAGE_KEY } from '@/constants/FeatureKeyContant';
import { IGlobalStateType } from '@/constants/StateManagement';
import useLocalStorage from '@/hooks/useLocalStorage';
import Head from 'next/head';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const Login = () => {
    const data = API.get('api/hello');
    const tokens = useSelector((state: IGlobalStateType) => state.tokens);
    console.log('Login page token', tokens.data);

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
