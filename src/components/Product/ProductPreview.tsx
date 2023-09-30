import { EDeviceDetect } from '@/constants/DeviceDetect';
import { useDeviceDetect } from '@/hooks';
import clsx from 'clsx';
import React, { Dispatch, SetStateAction, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from '../Image';
import styles from './style.module.scss';

interface IProps {
    name?: string;
    images: string[];
    className?: string;
}

const ProductPreview: React.FC<IProps> = (props) => {
    const { images, name, className } = props;
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const { breakPoint } = useDeviceDetect();

    return (
        <div className={clsx('md:flex justify-between max-w-full !h-auto md:!h-[52vh]', styles['content-wrapper'])}>
            {images && images.length > 1 && breakPoint > EDeviceDetect.md ? (
                <Thumbnail images={images} setThumbsSwiper={setThumbsSwiper} breakPoint={breakPoint} />
            ) : (
                <></>
            )}
            <MainSlider
                className={clsx('basis-full w-full', className)}
                name={name}
                images={images}
                thumbsSwiper={thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}
            />
            {images && images.length > 1 && breakPoint <= EDeviceDetect.md ? (
                <Thumbnail images={images} setThumbsSwiper={setThumbsSwiper} breakPoint={breakPoint} />
            ) : (
                <></>
            )}
        </div>
    );
};

interface IMainSlider {
    name?: string;
    images: string[];
    className?: string;
    thumbsSwiper: SwiperType | null;
}

const MainSlider: React.FC<IMainSlider> = (props) => {
    const { images = [], name, thumbsSwiper } = props;
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
                    <Image src={item} alt={name || 'Image Preview'} className="rounded-[4px] !h-full !w-auto" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

interface IThumbnailProps {
    setThumbsSwiper: Dispatch<SetStateAction<SwiperType | null>>;
    className?: string;
    images: string[];
    breakPoint: EDeviceDetect;
}

const Thumbnail: React.FC<IThumbnailProps> = (props) => {
    const { setThumbsSwiper, images = [], breakPoint } = props;
    return (
        <div className="mt-2 md:mt-0 md:mr-4 hidden xs:block w-auto">
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={5}
                freeMode
                watchSlidesProgress
                modules={[FreeMode, Navigation, Thumbs]}
                direction={breakPoint > EDeviceDetect.md ? 'vertical' : 'horizontal'}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className="rounded-sm">
                        <Image src={image} alt={`Thumbnail ${index}`} className="rounded-[4px] max-h-[75px] !w-auto" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductPreview;
