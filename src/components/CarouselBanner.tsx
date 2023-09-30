import React from 'react';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from './Image';

interface ICarouselBannerProps {
    className?: string;
    images: string[];
}

const CarouselBanner: React.FC<ICarouselBannerProps> = (props) => {
    const { className, images } = props;
    return (
        <Swiper
            className={className}
            modules={[FreeMode, Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation
            loop
        >
            {images.map((item, index) => (
                <SwiperSlide key={index}>
                    <Image src={item} alt={`Banner ${index}`} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default CarouselBanner;
