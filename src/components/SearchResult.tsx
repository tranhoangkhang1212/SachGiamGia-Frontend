import { EProductSort } from '@/constants/ProductEnum';
import { IProductData } from '@/interfaces/Product';
import { PaginationResponse } from '@/interfaces/response/PaginationResponse';
import { executePostWithBody } from '@/utils/APIUtil';
import { getImageUrl, priceFormat } from '@/utils/CommonUtil';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAsync } from 'react-use';
import Image from './Image';

interface ISearchResultProps {
    keyword: string;
}

const SearchResult: React.FC<ISearchResultProps> = (props) => {
    const { keyword } = props;

    const [products, setProducts] = useState<IProductData[]>([]);
    const [isShowResult, setIsShowResult] = useState(false);

    useAsync(async () => {
        if (keyword.length <= 0) {
            setProducts([]);
            return;
        }
        const { data }: { data: PaginationResponse<IProductData> } = await executePostWithBody('/product/search', {
            pageSize: 10,
            page: 1,
            keyword: keyword,
            filters: [],
            sort: EProductSort.NoneSort,
        });
        setProducts(data.rows);
        setIsShowResult(true);
    }, [keyword]);

    return (
        <div
            className={clsx(
                'absolute w-full sm:w-auto sm:min-w-[450px] lg:min-w-[480px] bg-white top-full shadow-custom-1',
                'rounded-sm text-black z-[99]',
            )}
        >
            {products.length > 0 && isShowResult && <Product data={products} toggle={() => setIsShowResult(false)} />}
        </div>
    );
};

interface IProductProps {
    data: IProductData[];
    toggle: () => void;
}

const Product: React.FC<IProductProps> = (props) => {
    const { data = [], toggle } = props;

    return (
        <div className="max-h-[450px] overflow-y-auto">
            <div className="px-2 py-1 bg-gray-200 rounded-sm">
                <span className="text-gray-500 text-[14px]">Sản phẩm gợi ý</span>
            </div>
            <div className="p-2">
                {data.map((product, index) => {
                    return (
                        <Link
                            key={index}
                            href={{
                                pathname: '/product-detail',
                                query: { slug: product.slug },
                            }}
                            as={`/chi-tiet/${product.slug}`}
                            className="flex mt-2 hover:bg-gray-100"
                            onClick={toggle}
                        >
                            <div>
                                <Image
                                    className="max-h-[65px] !w-auto rounded-sm"
                                    src={getImageUrl(product.images)}
                                    alt={product.name}
                                />
                            </div>
                            <div className="ml-2">
                                <h3>{product.name}</h3>
                                {product.saleOff > 0 ? (
                                    <>
                                        <span className="font-bold text-red-500 text-[15px]">
                                            {priceFormat(product.finalPrice)}
                                        </span>
                                        <span className="text-[13px] line-through inline-block ml-1">
                                            {priceFormat(product.price)}
                                        </span>
                                        <span className="text-[13px] ml-1">-{product.saleOff}%</span>
                                    </>
                                ) : (
                                    <span className="font-bold text-red-500 text-[15px]">
                                        {priceFormat(product.price)}
                                    </span>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default React.memo(SearchResult);
