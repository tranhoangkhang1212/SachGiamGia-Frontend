import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { onePiece } from '~/assets/images';
import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
    return (
        <div>
            <ListProduct />
        </div>
    );
};

const ListProduct = () => {
    return (
        <div>
            <div
                className={clsx(
                    'inline-block absolute mt-[-20px] ml-[-8px]',
                    styles.wrapper,
                )}
            >
                <h1 className="bg-primary h-[40px] leading-[40px] px-12 text-[18px]">
                    Sản phẩm mới
                </h1>
            </div>
            <div
                className="border-[1px] border-b-2 border-gray border-b-primary 
                            w-full rounded-md"
            >
                <div className="pt-2 lg:pt-10 px-4 pb-8 flex flex-wrap justify-around">
                    <ProductView className="mt-8 lg:mt-0 basis-1/2 md:basis-1/3 lg:basis-1/4" />
                    <ProductView className="mt-8 lg:mt-0 basis-1/2 md:basis-1/3 lg:basis-1/4" />
                    <ProductView className="mt-8 lg:mt-0 basis-1/2 md:basis-1/3 lg:basis-1/4" />
                    <ProductView className="mt-8 lg:mt-0 basis-1/2 md:basis-1/3 lg:basis-1/4" />
                </div>
            </div>
        </div>
    );
};

interface IProductViewProps {
    className?: string;
}

const ProductView: React.FC<IProductViewProps> = (props) => {
    const { className } = props;
    return (
        <div
            className={clsx(
                'text-black max-w-[180px] md:max-w-[200px] lg:max-w-[220px]',
                className,
            )}
        >
            <Image
                className="w-full h-[295px] rounded-md"
                src={onePiece}
                alt={''}
            />
            <div className="mt-2">
                <Link
                    className="font-[700] text-primary hover:text-[#4e937a]"
                    href={''}
                >
                    Truyen tranh sieu hay One piece
                </Link>
                <p>Eiichiro Oda</p>
                <p className="text-[20px] mt-2 font-semibold">20.0000đ</p>
            </div>
        </div>
    );
};

export default Home;
