import Image from '@/components/Image';
import { IProductData } from '@/interfaces/Product';
import { getImageUrl, priceFormat } from '@/utils/CommonUtil';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { book1 } from '~/assets/images';
import styles from './style.module.scss';
import SaleOff from './SaleOff';

interface IProductViewProps extends IProductData {
    className?: string;
}

const ProductView: React.FC<IProductViewProps> = (props) => {
    const { className, slug, name, images, author, saleOff, price, finalPrice } = props;
    return (
        <div
            className={clsx(
                'text-black max-w-full min-h-[280px] xs:min-h-[420px] p-2 xs:p-4 rounded-md relative',
                className,
                styles.product,
            )}
        >
            <div className="h-full md:h-auto">
                <Link
                    href={{
                        pathname: '/product-detail',
                        query: { slug: slug },
                    }}
                    as={`/chi-tiet/${slug}`}
                >
                    <div className="w-full flex-center">
                        <SaleOff className="absolute left-0 top-[8px]" saleOff={saleOff} />
                        <div className="overflow-hidden border-[1px] !h-[220px]">
                            <Image
                                className="object-contain !h-[220px] duration-300 ease-linear hover:scale-110"
                                src={getImageUrl(images)}
                                alt={name}
                                defaultUrl={book1}
                            />
                        </div>
                    </div>
                    <div className="text-[14px] xs:text-[16px] font-[700] text-primary hover:text-[#4e937a] mt-3">
                        {name}
                    </div>
                </Link>
                <p className="text-[12px] xs:text-[16px]">{author.name}</p>
                <p className="text-[16px] xs:text-[20px] mt-2 font-semibold">
                    {priceFormat(saleOff && saleOff > 0 ? finalPrice : price)}
                </p>
                {saleOff && saleOff > 0 ? (
                    <p className={clsx('text-[15px] line-through')}>{priceFormat(price)}</p>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default ProductView;
