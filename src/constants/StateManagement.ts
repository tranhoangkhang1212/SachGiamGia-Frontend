import { EProductFilter } from './ProductEnum';

export interface FilterDataChildren {
    id: string;
    name: string;
}
export interface FilterData {
    title: string;
    type: EProductFilter;
    values: FilterDataChildren[];
}

export interface DataFilterRequest {
    type: EProductFilter;
    values: string[];
}

export interface DataFilterRequestHandler {
    type: EProductFilter;
    id: string;
}

export interface EProductFilterAction {
    type: EProductFilter;
    id: string;
}

export interface IDataFilterType {
    data: DataFilterRequest[];
}

export enum EFilterActionType {
    AddData,
    RemoveData,
}
