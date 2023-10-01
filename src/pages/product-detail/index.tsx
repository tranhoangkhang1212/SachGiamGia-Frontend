import BaseButton from '@/components/Button/BaseButton';
import Overlay from '@/components/Overlay';
import ListProduct from '@/components/Product/ListProduct';
import { API } from '@/configs/axios';
import { IProductData, IProductDetail } from '@/interfaces/Product';
import { IBaseAppProps } from '@/interfaces/CommonProps';
import { ContextWithParams } from '@/interfaces/QueryParams';
import { IPropsResult } from '@/interfaces/ServerSideProps';
import { priceFormat } from '@/utils/CommonUtil';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import parse from 'html-react-parser';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState } from 'react';
import { useAsync, useToggle } from 'react-use';
import styles from './style.module.scss';

const ProductPreview = dynamic(() => import('@/components/Product/ProductPreview'), {
    ssr: false,
});

interface IDetailProps {
    slug: string;
}

const ProductDetail: React.FC<IDetailProps> = ({ slug }) => {
    const [productData, setProductData] = useState<IProductDetail>();
    const [sameAuthorData, setSameAuthorData] = useState<IProductData[]>([]);

    useAsync(async () => {
        const { data } = await API.get(`/product/detail/${slug}`);
        setProductData(data);
    }, [slug]);

    useAsync(async () => {
        const { data } = await API.get(`/product/same-author/${slug}`);
        setSameAuthorData(data);
    }, [slug]);

    if (!productData) {
        return <></>;
    }

    return (
        <div className="text-black">
            <Head>
                <title>{productData.name}</title>
            </Head>
            <BookView book={productData} />
            {productData.description ||
                (productData.statistics.length > 0 && (
                    <ProductIntroduce
                        content={productData.description}
                        data={productData.statistics}
                        book={productData}
                    />
                ))}
            <SameAuthor products={sameAuthorData} />
        </div>
    );
};

interface IBookViewProps {
    book: IProductDetail;
}

const BookView: React.FC<IBookViewProps> = (props) => {
    const { book } = props;

    const images = book.images.map((image) => image.url);
    return (
        <div className="justify-between px-6 py-4 text-black rounded-md md:flex max-w-primary shadow-default">
            <ImagePreview className="max-w-full md:max-w-[45%] m-auto basis-[55%] lg:basis-[35%]" images={images} />
            <ProductInfo className="basis-[45%] lg:basis-[65%]" book={book} />
        </div>
    );
};

interface IImagePreviewProps extends IBaseAppProps {
    images: string[];
}

const ImagePreview: React.FC<IImagePreviewProps> = (props) => {
    const { className, images } = props;
    return (
        <div className={className}>
            <ProductPreview images={images} />
        </div>
    );
};

interface IProductInfo extends IBaseAppProps {
    book: IProductData;
}

const ProductInfo: React.FC<IProductInfo> = (props) => {
    const { className, book } = props;

    return (
        <div className={clsx('md:ml-8 mt-4 md:mt-0', className)}>
            <h1 className="text-[20px] xs:text-[26px] md:text-[30px] lg:text-[35px] font-semibold">{book.name}</h1>
            <p className="py-[2px]">
                Tác giả: <span className="font-bold">{book.author.name}</span>
            </p>
            <p>
                Nhà xuất bản: <span className="font-bold">{book.publisher.name}</span>
            </p>
            {book.saleOff && book.saleOff > 0 ? (
                <div className="flex items-center justify-start mt-4">
                    <p className="text-[24px] xs:text-[32px] md:text-[36px] font-bold text-red">
                        {priceFormat(book.finalPrice)}
                    </p>
                    <p className="scale-[88%] ml-2 xs:ml-5 font-[400] line-through font-mono text-lg">
                        {priceFormat(book.price)}
                    </p>
                    <p className="bg-red-600 text-white rounded-md px-[4px] py-[1px] ml-2 -mt-4">-{book.saleOff}%</p>
                </div>
            ) : (
                <p className="text-[32px] md:text-[36px] font-bold text-red">{priceFormat(book.price)}</p>
            )}

            <div className="justify-between mt-4 lg:flex">
                <BaseButton
                    text="Thêm vào giỏ hàng"
                    className={clsx(
                        'bg-gray-dark text-white border-transparent lg:w-[49%]',
                        'hover:border-gray-dark hover:bg-transparent hover:text-gray-dark',
                    )}
                />
                <BaseButton
                    text="Mua ngay"
                    className={clsx(
                        'bg-transparent mt-2 lg:mt-0 lg:w-[49%]',
                        'hover:bg-gray-dark hover:text-white hover:border-transparent',
                    )}
                />
            </div>
        </div>
    );
};

interface IProductIntroduceProps extends IBaseAppProps {
    content: string;
    data: string;
    book: IProductDetail;
}

const ProductIntroduce: React.FC<IProductIntroduceProps> = (props) => {
    const { className, book, content, data } = props;
    const [isShowDetailPopup, toggleShowPopupDetail] = useToggle(false);

    return (
        <div
            className={clsx(
                'max-w-primary shadow-default py-2 px-12 lg:px-4 rounded-md mt-4 pb-12',
                'flex-center m-auto',
                className,
            )}
        >
            <div className="relative flex flex-col items-start w-full pt-6 lg:justify-between lg:flex-row">
                {content && content.length > 0 && (
                    <Introduction
                        toggle={toggleShowPopupDetail}
                        content={content}
                        className={clsx({ '!basis-full': Object.keys(data).length <= 0 })}
                    />
                )}
                <ProductStatistic data={data} className={clsx({ '!basis-full': !content || content.length <= 0 })} />
            </div>
            <DetailPopup isShow={isShowDetailPopup} content={book.description} toggle={toggleShowPopupDetail} />
        </div>
    );
};

interface IIntroductionProps {
    className?: string;
    toggle: () => void;
    content: string;
}

const Introduction: React.FC<IIntroductionProps> = ({ toggle, content, className }) => {
    return (
        <div
            className={clsx(
                'basis-1/2 lg:w-1/2 lg:mr-8 order-2 lg:order-1 max-h-[650px] w-full overflow-hidden relative',
                styles['content-wrapper'],
                className,
            )}
        >
            <div className={clsx('', styles['bg-article'])}>
                <button
                    className="absolute -translate-x-1/2 left-1/2 b border-[1px] border-blue text-blue py-[8px] w-[280px] rounded-md bottom-0"
                    onClick={toggle}
                >
                    Xem thêm
                </button>
            </div>
            <h1 className="font-bold text-center text-[24px]">Giới thiệu sản phẩm</h1>
            <div className="w-full">{parse(content)}</div>
        </div>
    );
};

interface IProductStatisticProps {
    className?: string;
    data: string;
}

const ProductStatistic: React.FC<IProductStatisticProps> = ({ data, className }) => {
    if (!data) {
        return <></>;
    }
    const statistics: Record<string, string> = JSON.parse(data);
    const keys = Object.keys(statistics);

    return (
        <div
            className={clsx('basis-full lg:basis-1/2 w-[96%] lg:w-1/2 ml-4 order-1 lg:order-2 mb-8 lg:mb-0', className)}
        >
            <h1 className="font-bold text-center basis-full text-[24px] mb-4">Thông tin chi tiết sản phẩm</h1>
            {keys && keys.length > 0 && (
                <div className="border-[1px] border-gray">
                    {keys.map((key, index) => (
                        <div
                            key={index}
                            className="flex px-3 py-3 basis-1/2 even:bg-white-gray first:border-none border-t-[1px] border-gray"
                        >
                            <div className="basis-1/2">{key}</div>
                            <div className="basis-1/2">{statistics[key]}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

interface IDetailPopupProps {
    isShow: boolean;
    content: string;
    toggle: () => void;
}

const DetailPopup: React.FC<IDetailPopupProps> = (props) => {
    const { isShow, content, toggle } = props;
    return (
        <Overlay isShow={isShow} className="!overflow-auto" toggle={toggle}>
            <div
                className={clsx(
                    'flex-col m-auto flex-center bg-white relative text-black',
                    'max-w-[95vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[50vw]',
                    styles['content-detail'],
                )}
            >
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="absolute cursor-pointer right-8 top-5"
                    size="2xl"
                    onClick={toggle}
                />
                <h1 className="text-[32px] mt-6">Giới thiệu sản phẩm</h1>
                <div className={clsx('flex-col flex-center max-w-[90%]')}>{parse(content)}</div>
            </div>
        </Overlay>
    );
};

interface ISameAuthorProps {
    products: IProductData[];
}

const SameAuthor: React.FC<ISameAuthorProps> = ({ products }) => {
    return (
        <>
            <ListProduct className="mt-12" name="Sản phẩm cùng tác giả" products={products} />
        </>
    );
};

export const getServerSideProps = async (context: ContextWithParams): Promise<IPropsResult<IDetailProps>> => {
    const { query } = context;
    const slug = query.slug;
    return {
        props: {
            slug: slug,
        },
    };
};

export default ProductDetail;
