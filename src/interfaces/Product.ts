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
