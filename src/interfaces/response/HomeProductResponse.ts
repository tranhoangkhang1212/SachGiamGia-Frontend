import { IProductData } from '../Product';

export interface HomeProductResponse {
    name: string;
    products: IProductData[];
}
