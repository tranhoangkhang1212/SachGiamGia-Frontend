import { API } from '@/configs/axios';
import { ContextWithParams } from '@/interfaces/QueryParams';
import { IPropsResult } from '@/interfaces/ServerSideProps';
import { useState } from 'react';
import { useAsync, useToggle } from 'react-use';
import SearchBar from './SearchBar';
import ListProduct from '@/components/Product/ListProduct';
import { BookData } from '@/constants/MockData';
import ProductListView from '@/components/Product/ProductListView';
import clsx from 'clsx';
import Pagination from '@/components/Pagination';
import { ProductFilter } from '@/constants/ProductFilter';
import { DataFilterRequest } from '@/constants/StateManagement';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectFilterData } from '@/redux/data-filter/dataFilterSlice';
import Modal from '@/components/Modal';
import Overlay from '@/components/Overlay';
import { SidebarDetailResponseDto } from '@/interfaces/response/SidebarProductResponse';
import LoadingOverlay from '@/components/LoadingOverlay';
// import { ParsedUrlQuery } from 'querystring';

// interface IQuery extends ParsedUrlQuery {
//     slug: string;
//     subSlug?: string;
// }

interface IProps {
    data: IServerSideData;
}

interface IServerSideData extends SidebarDetailResponseDto {
    slug: string;
}

const mockData = [
    {
        title: 'Thể loại',
        type: ProductFilter.Category,
        values: [
            { id: 'id-1', name: 'Truyện tranh 1' },
            { id: 'id-2', name: 'Truyện tranh 2' },
            { id: 'id-3', name: 'Truyện tranh 3' },
            { id: 'id-4', name: 'Truyện tranh 4' },
        ],
    },
    {
        title: 'Tác giả',
        type: ProductFilter.Author,
        values: [
            { id: 'id-1', name: 'Trần Khang 01' },
            { id: 'id-2', name: 'Trần Khang 02' },
            { id: 'id-3', name: 'Trần Khang 03' },
            { id: 'id-4', name: 'Trần Khang 04' },
        ],
    },
    {
        title: 'Nhà phát hành',
        type: ProductFilter.Publisher,
        values: [
            { id: 'id-1', name: 'Nhà phát hành 01' },
            { id: 'id-2', name: 'Nhà phát hành 02' },
            { id: 'id-3', name: 'Nhà phát hành 03' },
            { id: 'id-4', name: 'Nhà phát hành 04' },
            { id: 'id-5', name: 'Nhà phát hành 04' },
            { id: 'id-6', name: 'Nhà phát hành 04' },
            { id: 'id-7', name: 'Nhà phát hành 04' },
            { id: 'id-8', name: 'Nhà phát hành 04' },
            { id: 'id-9', name: 'Nhà phát hành 04' },
            { id: 'id-10', name: 'Nhà phát hành 04' },
            { id: 'id-11', name: 'Nhà phát hành 04' },
            { id: 'id-12', name: 'Nhà phát hành 04' },
        ],
    },
    {
        title: 'Giá tiền',
        type: ProductFilter.Price,
        values: [
            { id: 'id-1', name: '10.000 - 20.000' },
            { id: 'id-2', name: '20.000 - 30.000' },
            { id: 'id-3', name: '30.000 - 40.000' },
            { id: 'id-4', name: '40.000 - 50.000' },
        ],
    },
];

const Products = (props: IProps) => {
    const { loading, value } = useAsync(async () => await API.get('/product/side-bar', { params: request }));
    const [request, setRequest] = useState({ slug: props.data.slug });

    const { data, sort } = useAppSelector(selectFilterData);
    console.log({ data, sort });

    if (loading || !value) {
        return <LoadingOverlay />;
    }

    const { products, filters } = value.data as SidebarDetailResponseDto;
    console.log(products);

    return (
        <div className="mt-4 text-black">
            <SearchBar className="basis-[25%]" data={filters} />
            <div className="basis-[75%]">
                {[...Array(3)].map((_, index) => (
                    <ProductListView key={index} products={products} className="!px-0" />
                ))}
            </div>
            <Pagination className="mt-4" pageSize={5} totalElement={50} />
        </div>
    );
};

export const getServerSideProps = async (context: ContextWithParams): Promise<IPropsResult<IProps>> => {
    const { query } = context;
    const slug = query.slug;
    return {
        props: {
            data: { slug },
        },
    };
};

export default Products;
