export interface IProductData {
    id: string;
    name: string;
    slug?: string;
    image: string;
    author: ProductInfo;
    publisher: ProductInfo;
    saleOff: number;
    price: number;
    finalPrice: number;
}

export interface ProductInfo {
    id: string;
    name: string;
}
