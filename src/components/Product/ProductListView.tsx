import { IProductData } from '@/interfaces/Product';
import { IBaseAppProps } from '@/interfaces/Props';
import clsx from 'clsx';
import React from 'react';
import { book_2 } from '~/assets/images';
import ProductView from './ProductView';

interface IProductListViewProps extends IBaseAppProps {
    products: IProductData[];
    subClassName?: string;
}

const ProductListView: React.FC<IProductListViewProps> = (props) => {
    const { className, subClassName, products } = props;
    
    return (
        <div className={clsx('flex flex-wrap justify-between px-0 pt-2 md:px-4', className)}>
            {products.map((product) => (
                <ProductView
                    key={product.id}
                    className={clsx(
                        'mt-6 basis-1/2 xs:basis-1/3 lg:basis-[19%] border-[1px] border-[#ccc]',
                        subClassName,
                    )}
                    name={product.name}
                    slug={product.slug}
                    image={book_2}
                    author={product.author}
                    price={product.price}
                    saleOff={product.saleOff}
                    id={0}
                    publisher={product.publisher}
                />
            ))}
        </div>
    );
};

export default ProductListView;
