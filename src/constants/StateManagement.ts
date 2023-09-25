import { ProductFilter } from './ProductFilter';

export interface FilterDataChildren {
    id: string;
    name: string;
}
export interface FilterData {
    title: string;
    type: ProductFilter;
    values: FilterDataChildren[];
}

export interface DataFilterRequest {
    type: ProductFilter;
    values: string[];
}

export interface DataFilterRequestHandler {
    type: ProductFilter;
    id: string;
}

export interface ProductFilterAction {
    type: ProductFilter;
    id: string;
}

export interface IDataFilterType {
    data: DataFilterRequest[];
}

export enum EFilterActionType {
    AddData,
    RemoveData,
}
