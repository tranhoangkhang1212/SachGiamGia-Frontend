import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Silder1 from '~/assets/images/silder_1.webp';

const CarouselBanner = () => {
    const items = [
        { id: 1, title: 'item #1' },
        { id: 2, title: 'item #2' },
        { id: 3, title: 'item #3' },
        { id: 4, title: 'item #4' },
        { id: 5, title: 'item #5' },
    ];
    return (
        <div>
            {/* <Carousel
                autoPlay
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                    const defStyle = {
                        marginLeft: 20,
                        color: 'white',
                        cursor: 'pointer',
                    };
                    return (
                        <div
                            className={clsx('bg-[#ffccdd] w-[15px]', {
                                'bg-[#e64e1f]': isSelected,
                            })}
                        >
                            h
                        </div>
                    );
                }}
                infiniteLoop
            >
                {items.map((item) => (
                    <div
                        className="w-[500px] h-[200px] bg-secondary"
                        key={item.id}
                    >
                        {item.title}
                    </div>
                ))}
            </Carousel>{' '} */}
            <Image src={Silder1} alt={''} className="w-full"></Image>
        </div>
    );
};

export default CarouselBanner;
