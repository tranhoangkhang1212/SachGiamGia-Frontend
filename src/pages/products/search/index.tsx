import LoadingOverlay from '@/components/LoadingOverlay';
import Pagination from '@/components/Pagination';
import ProductListView from '@/components/Product/ProductListView';
import { API } from '@/configs/axios';
import { FilterData } from '@/constants/StateManagement';
import { useAppSelector } from '@/hooks/useAppSelector';
import { IProductData } from '@/interfaces/Product';
import { ContextWithParams } from '@/interfaces/QueryParams';
import { IPropsResult } from '@/interfaces/ServerSideProps';
import { PaginationResponse } from '@/interfaces/response/PaginationResponse';
import { selectFilterData } from '@/redux/data-filter/dataFilterSlice';
import { executePostWithBody } from '@/utils/APIUtil';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useAsync } from 'react-use';
import SearchBar from '../SearchBar';
import EmptyProductResult from '@/components/EmptyProductResult';

interface IProps {
    data: IServerSideData;
}

interface IServerSideData {
    slug: string;
}

const PAGE_SIZE = 15;
const Products = (props: IProps) => {
    const firstLoadingRef = useRef(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalElement, setTotalElement] = useState(0);
    const [products, setProducts] = useState<IProductData[]>([]);
    const [filterData, setFilterData] = useState<FilterData[]>([]);
    const { data: filters, sort } = useAppSelector(selectFilterData);

    useAsync(async () => {
        try {
            if (!firstLoadingRef.current) {
                setIsLoading(true);
            }
            const { data }: { data: PaginationResponse<IProductData> } = await executePostWithBody('/product/search', {
                pageSize: PAGE_SIZE,
                page: pageIndex,
                keyword: props.data.slug,
                filters,
                sort,
            });
            setProducts(data.rows);
            setTotalElement(data.count);
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            firstLoadingRef.current = true;
            setIsLoading(false);
        }
    }, [pageIndex, filters, sort, props.data.slug]);

    useAsync(async () => {
        try {
            if (!firstLoadingRef.current) {
                setIsLoading(true);
            }
            const { data }: { data: FilterData[] } = await API.get('/sidebar/filter');
            setFilterData(data);
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            firstLoadingRef.current = true;
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return <LoadingOverlay />;
    }

    const handlePaginationChange = (pageIndex: number) => {
        setPageIndex(pageIndex);
    };

    return (
        <div className="mt-4 text-black">
            {products.length > 0 && <SearchBar className="basis-[25%]" data={filterData} />}
            <div className="basis-[75%]">
                <ProductListView products={products} className="!px-0" />
            </div>
            <Pagination
                className="mt-4"
                pageSize={PAGE_SIZE}
                totalElement={totalElement}
                onPaginationChange={handlePaginationChange}
            />
            <div className="mt-12">
                <EmptyProductResult />
            </div>
        </div>
    );
};

export const getServerSideProps = async (context: ContextWithParams): Promise<IPropsResult<IProps>> => {
    const { query } = context;
    const slug = query.slug;
    return {
        props: {
            data: {
                slug,
            },
        },
    };
};

export default Products;
