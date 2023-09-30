import Checkbox from '@/components/Checkbox';
import { EProductFilter, EProductSort } from '@/constants/ProductEnum';
import { DataFilterRequestHandler, FilterData } from '@/constants/StateManagement';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { IBaseAppProps } from '@/interfaces/Props';
import { selectFilterData, updateSort, updateState } from '@/redux/data-filter/dataFilterSlice';
import { priceFormat } from '@/utils/CommonUtil';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React from 'react';
import { useToggle } from 'react-use';
import styles from './style.module.scss';

interface ISidebarProps extends IBaseAppProps {
    data: FilterData[];
}

const SearchBar: React.FC<ISidebarProps> = (props) => {
    const { data } = props;
    const [isShow, toggleShow] = useToggle(false);

    const { data: filterData } = useAppSelector(selectFilterData);
    const dispatch = useAppDispatch();

    const handleFilterData = (data: DataFilterRequestHandler) => {
        dispatch(updateState({ id: data.id, type: data.type }));
    };

    const checkChecked = (type: EProductFilter, id: string) => {
        const filterDataByType = filterData.find((e) => e.type === type);
        if (!filterDataByType) {
            return false;
        }
        const value = filterDataByType.values.find((e) => e === id);
        if (!value) {
            return false;
        }
        return true;
    };

    const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        dispatch(updateSort(event.target.value));
    };

    const getTitleFormat = (title: string): string => {
        const [minPrice, maxPrice] = title.split('-');
        return `${priceFormat(minPrice)} - ${priceFormat(maxPrice)}`;
    };

    return (
        <>
            <div
                className={clsx(
                    'bg-[#00000097] bg-opacity-90 fixed top-0 right-0 h-screen w-screen invisible z-[9] origin-center opacity-0 duration-700',
                    {
                        '!visible opacity-100': isShow,
                    },
                )}
                onClick={toggleShow}
            />
            <div
                className={clsx(
                    'w-[265px] translate-x-full lg:translate-x-0 transition-transform duration-700 lg:w-auto fixed justify-between lg:relative lg:flex z-[10] bg-white right-0 px-4 top-0 bottom-0',
                    { '!translate-x-0': isShow },
                )}
            >
                {data.map((value, index) => (
                    <div key={value.type} className="mt-4 basis-1/4 lg:mt-0">
                        <span className="font-bold">{value.title}</span>
                        <div
                            className={clsx(
                                'max-h-[250px] lg:max-h-[168px] overflow-y-auto px-4 lg:px-0',
                                { 'lg:mr-8': index !== data.length - 1 },
                                styles['content-wrapper'],
                            )}
                        >
                            {value.values.map((element) => (
                                <Checkbox
                                    key={element.id}
                                    title={
                                        value.type === EProductFilter.Price
                                            ? getTitleFormat(element.name)
                                            : element.name
                                    }
                                    checked={checkChecked(value.type, element.id)}
                                    onClick={() => {
                                        handleFilterData({ type: value.type, id: element.id });
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-4 lg:justify-end">
                <div className="cursor-pointer lg:hidden" onClick={toggleShow}>
                    <FontAwesomeIcon icon={faFilter} />
                    <span className="ml-1 font-semibold">Lọc</span>
                </div>
                <select
                    className="border-[1px] outline-none border-gray rounded cursor-pointer py-1"
                    onChange={handleSort}
                >
                    <option className="h-[120px] leading-5" value="" selected disabled>
                        Sắp xếp
                    </option>
                    <option className="h-[120px] leading-5" value={EProductSort.TotalViewDesc}>
                        Lượt xem
                    </option>
                    <option className="h-[120px] leading-5" value={EProductSort.PriceDesc}>
                        Giá cao đến thấp
                    </option>
                    <option className="h-[120px] leading-5" value={EProductSort.PriceAsc}>
                        Giá thấp đến cao
                    </option>
                </select>
            </div>
        </>
    );
};

export default SearchBar;
