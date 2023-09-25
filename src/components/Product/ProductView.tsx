import Image from '@/components/Image';
import { IProductData } from '@/interfaces/Product';
import { priceFormat } from '@/utils/CommonUtil';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { book1 } from '~/assets/images';
import styles from './style.module.scss';

interface IProductViewProps extends IProductData {
    className?: string;
}

const ProductView: React.FC<IProductViewProps> = (props) => {
    const { className, slug, name, image, author, saleOff, price, finalPrice } = props;
    return (
        <div
            className={clsx(
                'text-black max-w-[145px] xs:max-w-[150px] sm:max-w-[165px] md:max-w-[200px] lg:max-w-[220px] xl:max-w-[260px] p-2 xs:p-4 rounded-md relative',
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
                    as={`/san-pham/${slug}`}
                >
                    <div className="w-full flex-center">
                        {saleOff && saleOff > 0 ? (
                            <div className={clsx('inline-block absolute mt-[-20px] ml-[-8px]', styles['sale-off'])}>
                                <h3 className="bg-red-600 text-white h-[25px] leading-[25px] px-2 text-[14px] font-bold">
                                    Giảm {saleOff}%
                                </h3>
                            </div>
                        ) : (
                            <></>
                        )}
                        <div className="h-[150px] xs:h-full xs:w-full rounded-md overflow-hidden">
                            <Image
                                className="max-w-full duration-300 ease-linear hover:scale-110"
                                src="http://localhost:9000/sach-giam-gia/screencapture-localhost-3000-san-pham-one-piece-1-2023-09-23-16_06_19.png"
                                alt=""
                                defaultUrl={book1}
                            />
                        </div>
                    </div>
                    <div className="text-[14px] xs:text-[16px] font-[700] text-primary hover:text-[#4e937a] mt-3">
                        {name}
                    </div>
                </Link>
                <p className="text-[12px] xs:text-[16px]">{author.name}</p>
                <p className="text-[16px] xs:text-[20px] mt-2 font-semibold">{priceFormat(price)}</p>
                <p className="text-[16px] xs:text-[20px] mt-2 font-semibold">{priceFormat(18000)}</p>
            </div>
        </div>
    );
};

export default ProductView;
