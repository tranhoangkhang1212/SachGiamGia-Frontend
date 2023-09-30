import { IProductData } from '@/interfaces/Product';
import clsx from 'clsx';
import React, { useState } from 'react';
import Image from './Image';
import { getImageUrl, priceFormat } from '@/utils/CommonUtil';
import { useAsync } from 'react-use';
import { executeGetWithParams } from '@/utils/APIUtil';

interface ISearchResultProps {
    keyword: string;
}

const SearchResult: React.FC<ISearchResultProps> = (props) => {
    const { keyword } = props;

    const [products, setProducts] = useState<IProductData[]>([]);
    useAsync(async () => {
        const { data } = await executeGetWithParams('/product/search', { keyword });
        setProducts(data);
    }, [keyword]);

    return (
        <div
            className={clsx(
                'absolute w-full sm:w-auto sm:min-w-[450px] lg:min-w-[480px] bg-white top-full shadow-custom-1',
                'rounded-sm text-black z-[99]',
            )}
        >
            {products.length > 0 && <Product data={products} />}
        </div>
    );
};

interface IProductProps {
    data: IProductData[];
}

const Product: React.FC<IProductProps> = (props) => {
    const { data = [] } = props;
    return (
        <div className="max-h-[450px] overflow-y-auto">
            <div className="px-2 py-1 bg-gray-200 rounded-sm">
                <span className="text-gray-500 text-[14px]">Sản phẩm gợi ý</span>
            </div>
            <div className="p-2">
                {data.map((product, index) => {
                    return (
                        <div key={index} className="flex mt-2">
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
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default React.memo(SearchResult);
