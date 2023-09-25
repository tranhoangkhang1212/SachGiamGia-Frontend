import { EDeviceDetect } from '@/constants/DeviceDetect';
import { useDeviceDetect } from '@/hooks';
import { IImageProps } from '@/interfaces/Props';
import clsx from 'clsx';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './style.module.scss';

interface IProps {
    images: IImageProps[];
    thumbnails: IImageProps[];
    className?: string;
}

const ProductPreview: React.FC<IProps> = (props) => {
    const { images, thumbnails, className } = props;
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const { breakPoint } = useDeviceDetect();

    return (
        <div className={clsx('md:flex justify-between max-w-full md:!h-[50vh] !h-auto', styles['content-wrapper'])}>
            {thumbnails && thumbnails.length > 0 && breakPoint > EDeviceDetect.md ? (
                <Thumbnail images={thumbnails} setThumbsSwiper={setThumbsSwiper} breakPoint={breakPoint} />
            ) : (
                <></>
            )}
            <MainSlider
                className={clsx('basis-full', className)}
                images={images}
                thumbsSwiper={thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}
            />
            {thumbnails && thumbnails.length > 0 && breakPoint <= EDeviceDetect.md ? (
                <Thumbnail images={thumbnails} setThumbsSwiper={setThumbsSwiper} breakPoint={breakPoint} />
            ) : (
                <></>
            )}
        </div>
    );
};

interface IMainSlider {
    images: IImageProps[];
    className?: string;
    thumbsSwiper: SwiperType | null;
}

const MainSlider: React.FC<IMainSlider> = (props) => {
    const { images = [], thumbsSwiper } = props;
    return (
        <Swiper
            modules={[FreeMode, Thumbs]}
            spaceBetween={20}
            thumbs={{
                swiper: thumbsSwiper,
            }}
            className="!h-auto !w-full"
        >
            {images.map((item, index) => (
                <SwiperSlide key={index} className="rounded-sm">
                    <Image src={item.url} alt={item.alt || 'Image Preview'} className="rounded-[4px]" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

interface IThumbnailProps {
    setThumbsSwiper: Dispatch<SetStateAction<SwiperType | null>>;
    className?: string;
    images: IImageProps[];
    breakPoint: EDeviceDetect;
}

const Thumbnail: React.FC<IThumbnailProps> = (props) => {
    const { setThumbsSwiper, images = [], breakPoint } = props;
    return (
        <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={5}
            freeMode
            watchSlidesProgress
            modules={[FreeMode, Navigation, Thumbs]}
            direction={breakPoint > EDeviceDetect.md ? 'vertical' : 'horizontal'}
            className="mt-2 md:mt-0 md:mr-4 !w-auto hidden xs:block"
        >
            {images.map((image, index) => (
                <SwiperSlide key={index} className="rounded-sm">
                    <Image src={image.url} alt={image.alt || 'Image Preview'} className="rounded-[4px]" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ProductPreview;
