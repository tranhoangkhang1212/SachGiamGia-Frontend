import LoadingOverlay from '@/components/LoadingOverlay';
import ListProduct from '@/components/Product/ListProduct';
import { API } from '@/configs/axios';
import { BaseDataResponse } from '@/interfaces/BaseDataResponse';
import { HomeProductResponse } from '@/interfaces/response/HomeProductResponse';
import toast from 'react-hot-toast';
import { useAsync } from 'react-use';

const Home = () => {
    const { value, loading }: { value?: BaseDataResponse<HomeProductResponse[]>; loading: boolean } = useAsync(() =>
        API.get('/layout/home-product'),
    );
    if (loading) {
        return <LoadingOverlay />;
    }
    if (!value?.data) {
        toast.error('Network error!');
        return <></>;
    }

    return (
        <div className="text-black">
            {value.data.map((component, index) => (
                <ListProduct key={index} className="mt-14 md:mt-20" {...component} />
            ))}
        </div>
    );
};

export default Home;
