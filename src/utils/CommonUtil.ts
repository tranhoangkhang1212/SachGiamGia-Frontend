import { ImageResponse } from '@/interfaces/Product';

export const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const priceFormat = (number: number | string) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
};

export const isLast = (index: number, arraySize: number) => {
    return index === arraySize - 1;
};

export const isBrowser = () => {
    return typeof window !== 'undefined';
};

export const scrollToTop = () => {
    if (!isBrowser()) return;
    window.scrollTo(0, 0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const removeElementFromArray = <T>(array: T[], element: T) => {
    const index = array.indexOf(element);
    if (index <= -1) {
        return;
    }
    array.splice(index, 1);
};

export const getImageUrl = (images: ImageResponse[]) => {
    const image = images.find((image) => image.default === true);
    if (!image) {
        return images[0].url;
    }
    return image.url;
};
