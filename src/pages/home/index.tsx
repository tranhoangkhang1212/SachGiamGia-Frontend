import ListProduct from '@/components/Product/ListProduct';
import { API } from '@/configs/axios';
import { BookData } from '@/constants/MockData';
import { useAsync } from 'react-use';

const Home = () => {
    const { value, loading } = useAsync(() => API.get('/product'));
    return (
        <>
            {[...Array(3)].map((_, index) => (
                <ListProduct key={index} className="mt-14 md:mt-20" products={BookData} />
            ))}
        </>
    );
};

export default Home;
