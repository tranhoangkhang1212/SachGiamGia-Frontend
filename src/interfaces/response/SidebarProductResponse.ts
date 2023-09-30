import { FilterData } from '@/constants/StateManagement';
import { IProductData } from '../Product';
import { PaginationResponse } from './PaginationResponse';

export interface SidebarDetailResponseDto {
    product: PaginationResponse<IProductData>;
    filters: FilterData[];
}

export interface ProductInfo {
    id: string;
    name: string;
}

export interface ProductDetailResponseDto {
    id: string;
    name: string;
    slug: string;
    image: string;
    author: ProductInfo;
    publisher: ProductInfo;
    category: ProductInfo;
    distributor: ProductInfo;
    price: number;
    finalPrice: number;
    saleOff: number;
    totalView: number;
    totalBuy: number;
    star: number;
    description: string;
}
