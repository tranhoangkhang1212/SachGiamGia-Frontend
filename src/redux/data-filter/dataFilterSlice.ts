import { DataFilterRequest, EProductFilterAction } from '@/constants/StateManagement';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { removeElementFromArray } from '@/utils/CommonUtil';
import { EProductSort } from '@/constants/ProductEnum';

interface DataFilterSlice {
    data: DataFilterRequest[];
    sort: string;
}

const initState: DataFilterSlice = {
    data: [],
    sort: EProductSort.NoneSort,
};

const dataFilterSlice = createSlice({
    name: 'dataFilter',
    initialState: initState,
    reducers: {
        updateState(state, action: PayloadAction<EProductFilterAction>) {
            const { data } = state;
            const filterData = data.find((e) => e.type === action.payload.type);
            if (filterData) {
                updateCurrentData(data, filterData, action);
            } else {
                addNewData(data, action);
            }
        },
        updateSort(state, action: PayloadAction<string>) {
            state.sort = action.payload;
        },
    },
});

const updateCurrentData = (
    data: DataFilterRequest[],
    filterData: DataFilterRequest,
    action: PayloadAction<EProductFilterAction>,
) => {
    if (filterData.values.includes(action.payload.id)) {
        if (filterData.values.length === 1) {
            removeElementFromArray(data, filterData);
        } else {
            filterData.values = [...filterData.values.filter((e) => e !== action.payload.id)];
        }
    } else {
        filterData.values = [...filterData.values, action.payload.id];
    }
};

const addNewData = (data: DataFilterRequest[], action: PayloadAction<EProductFilterAction>) => {
    const newData: DataFilterRequest = {
        type: action.payload.type,
        values: [action.payload.id],
    };
    data.push(newData);
};

export const { updateState, updateSort } = dataFilterSlice.actions;
export const selectFilterData = (state: RootState) => {
    return state.dataFilter;
};
export default dataFilterSlice.reducer;
