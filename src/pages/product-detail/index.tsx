import BaseButton from '@/components/Button/BaseButton';
import Overlay from '@/components/Overlay';
import ListProduct from '@/components/Product/ListProduct';
import { BookData } from '@/constants/MockData';
import { IProductData } from '@/interfaces/Product';
import { IBaseAppProps, IImageProps } from '@/interfaces/Props';
import { ContextWithParams } from '@/interfaces/QueryParams';
import { IPropsResult } from '@/interfaces/ServerSideProps';
import { priceFormat } from '@/utils/CommonUtil';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import parse from 'html-react-parser';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useToggle } from 'react-use';
import { book1 } from '~/assets/images';
import { data as MockData } from './data';
import styles from './style.module.scss';

const ProductPreview = dynamic(() => import('@/components/Product/ProductPreview'), {
    ssr: false,
});

interface IProps extends IProductData {
    slug: string;
}

const baseData = [
    { url: book1 as any, alt: '' },
    { url: book1 as any, alt: '' },
    { url: book1 as any, alt: '' },
];

const ProductDetail = (props: IProps) => {
    const images = [...baseData, ...baseData];
    const thumbnails = [...baseData, ...baseData];
    const content = 'Hello';

    const detailData = {
        'ma-sp': {
            key: 'Mã sản phẩm',
            value: '12001',
        },
        'kich-thuoc': {
            key: 'Kích thước',
            value: '12cm x 24cm',
        },
        'trong-luong': {
            key: 'Trọng lượng',
            value: '256gam',
        },
        'mau-sac': {
            key: 'Màu sắc',
            value: 'Xanh đen',
        },
        bia: {
            key: 'Hình thức bìa',
            value: 'Xanh đen',
        },
        'nha-xuat-ban': {
            key: 'Nhà xuất bản',
            value: 'Xanh đen',
        },
        'nha-cung-cap': {
            key: 'Nhà cung cấp',
            value: 'Xanh đen',
        },
        'nam-xuat-ban': {
            key: 'Năm xuất bản',
            value: 'Xanh đen',
        },
    };

    const bookData = {
        id: '1',
        subId: '001',
        name: 'Truyện tranh siêu hay Onepiece',
        author: {
            id: 'Igsdg',
            name: 'Eiichiro Oda',
        },
        price: 20000,
        image: '',
        saleOff: 20,
        publisher: {
            id: 'Igsdg',
            name: 'Trần Khang',
        },
        finalPrice: 18000,
    };

    return (
        <div className="text-black">
            <Head>
                <title>{props.slug}</title>
            </Head>
            <BookView images={images} thumbnails={thumbnails} book={bookData} />
            {/* <TextEditor /> */}
            {content && content.length > 0 && <ProductIntroduce content={content} data={detailData} book={bookData} />}
            <SameAuthor />
        </div>
    );
};

interface IBookViewProps {
    images: IImageProps[];
    thumbnails: IImageProps[];
    book: IProductData;
}

const BookView: React.FC<IBookViewProps> = (props) => {
    const { images, thumbnails, book } = props;
    return (
        <div className="justify-between px-6 py-4 text-black rounded-md md:flex max-w-primary shadow-default">
            <ImagePreview
                className="max-w-full xs:max-w-[50%] m-auto basis-[55%] lg:basis-[30%]"
                images={images}
                thumbnails={thumbnails}
            />
            <ProductInfo className="basis-[45%] lg:basis-[70%]" book={book} />
        </div>
    );
};

interface IImagePreviewProps extends IBaseAppProps {
    images: IImageProps[];
    thumbnails: IImageProps[];
}

const ImagePreview: React.FC<IImagePreviewProps> = (props) => {
    const { className, images, thumbnails } = props;
    return (
        <div className={className}>
            <ProductPreview images={images} thumbnails={thumbnails} />
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

interface IDetailData {
    key: string;
    value: string;
}

interface IProductIntroduceProps extends IBaseAppProps {
    content: string;
    data: Record<string, IDetailData>;
    book: IProductData;
}

const ProductIntroduce: React.FC<IProductIntroduceProps> = (props) => {
    const { className, content, data } = props;

    const [isShowDetailPopup, toggleShowPopupDetail] = useToggle(false);
    if (!content || content.length < 0) {
        return <></>;
    }

    const keys = Object.keys(data);

    return (
        <div
            className={clsx(
                'max-w-primary shadow-default py-2 px-12 lg:px-4 rounded-md mt-4 pb-12',
                'flex-center m-auto',
                className,
            )}
        >
            <div className="relative flex w-full flex-col items-start pt-6 lg:justify-between lg:flex-row">
                <div
                    className={clsx(
                        'basis-1/2 lg:w-1/2 lg:mr-8 order-2 lg:order-1 max-h-[650px] w-full overflow-hidden relative',
                        styles['content-wrapper'],
                    )}
                >
                    <div className={clsx('', styles['bg-article'])}>
                        <button
                            className="absolute -translate-x-1/2 left-1/2 b border-[1px] border-blue text-blue py-[8px] w-[280px] rounded-md bottom-0"
                            onClick={toggleShowPopupDetail}
                        >
                            Xem thêm
                        </button>
                    </div>
                    <h1 className="font-bold text-center text-[24px]">Giới thiệu sản phẩm</h1>
                    <div className="w-full">{parse(MockData)}</div>
                </div>
                <div
                    className={clsx('basis-full lg:basis-1/2 w-[96%] lg:w-1/2 ml-4 order-1 lg:order-2 mb-8 lg:mb-0', {
                        'basis-full': !MockData,
                    })}
                >
                    <h1 className="font-bold text-center basis-full text-[24px] mb-4">Thông tin chi tiết sản phẩm</h1>
                    {keys && keys.length > 0 && (
                        <div className="border-[1px] border-gray">
                            {keys.map((key, index) => (
                                <div
                                    key={index}
                                    className="flex px-3 py-3 basis-1/2 even:bg-white-gray first:border-none border-t-[1px] border-gray"
                                >
                                    <div className="basis-1/2">{data[key].key}</div>
                                    <div className="basis-1/2">{data[key].value}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <DetailPopup isShow={isShowDetailPopup} content={MockData} toggle={toggleShowPopupDetail} />
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
            <div className="flex-col m-auto flex-center bg-white max-w-[75%] relative">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="absolute cursor-pointer right-8 top-5"
                    size="2xl"
                    onClick={toggle}
                />
                <h1 className="text-[32px] mt-6">Giới thiệu sản phẩm</h1>
                <div className="flex-col flex-center max-w-[50%]">{parse(content)}</div>
            </div>
        </Overlay>
    );
};

interface ISameAuthorProps extends IBaseAppProps {}

const SameAuthor: React.FC<ISameAuthorProps> = (props) => {
    const { className } = props;
    const newData = BookData.slice(0, 5);
    return (
        <>
            <ListProduct className="mt-12" title="Sản phẩm cùng tác giả" products={newData} />
        </>
    );
};

export const getServerSideProps = async (context: ContextWithParams): Promise<IPropsResult<IProps>> => {
    const { query } = context;
    const slug = query.slug;
    const data = BookData[0];
    return {
        props: {
            ...data,
            slug: slug,
            publisher: { id: 'dsffd', name: 'Khangth' },
        },
    };
};

export default ProductDetail;
