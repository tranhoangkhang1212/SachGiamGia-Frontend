export interface IProductData {
    id: string;
    name: string;
    slug?: string;
    images: ImageResponse[];
    author: Author;
    publisher: Author;
    saleOff: number;
    price: number;
    finalPrice: number;
}

export interface IProductDetail extends IProductData {
    distributor: Author;
    totalView: number;
    totalBuy: number;
    star: number;
    statistics: string;
    description: string;
}

export interface Author {
    id: string;
    name: string;
}

export interface ImageResponse {
    url: string;
    default: boolean;
}

const initAuthor = { id: '', name: '' };

export const initProductDetail: IProductDetail = {
    distributor: initAuthor,
    totalView: 0,
    totalBuy: 0,
    star: 0,
    statistics: '',
    description: '',
    id: '',
    name: '',
    images: [],
    author: initAuthor,
    publisher: initAuthor,
    saleOff: 0,
    price: 0,
    finalPrice: 0,
};
