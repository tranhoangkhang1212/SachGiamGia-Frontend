import Image from 'next/image';
import React from 'react';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { banner_1 } from '~/assets/images';

interface IProps {
    className?: string;
}

const images = [{ image: banner_1 }, { image: banner_1 }, { image: banner_1 }];

const CarouselBanner: React.FC<IProps> = (props) => {
    const { className } = props;
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
                    <Image src={item.image} alt="" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default CarouselBanner;
