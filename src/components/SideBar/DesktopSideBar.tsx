import clsx from 'clsx';
import React, { useState } from 'react';
import { useToggle } from 'react-use';
import LineBreak from '../LineBreak';
import MenuContent, { IMenuContentData } from './MenuContent';
import SubMenuContent from './SubMenuContent';

interface IProps {
    className?: string;
    data: IMenuContentData[];
}

const LIMIT_SIZE_SIDE_BAR = 10;

const DesktopSideBar: React.FC<IProps> = (props) => {
    const { className, data = [] } = props;

    const defaultData = data.slice(0, LIMIT_SIZE_SIDE_BAR - 1);
    const renderData = data.length > LIMIT_SIZE_SIDE_BAR ? defaultData : data;

    const isShowViewMore = data.length > LIMIT_SIZE_SIDE_BAR;

    const [dataRendering, setDataRendering] = useState<IMenuContentData[]>(renderData);
    const [isShowCollapse, toggleCollapse] = useToggle(true);

    const handleDisplayMore = () => {
        setDataRendering(data);
        toggleCollapse();
    };

    const handleCollapse = () => {
        setDataRendering(defaultData);
        toggleCollapse();
    };

    return (
        <div
            className={clsx(
                'bg-white z-[99] text-gray-dark w-[260px] border-[1px] p-4 ' +
                    'rounded-md border-gray min-h-[380px] hidden lg:block ' +
                    className,
            )}
        >
            {dataRendering.map((menu, index) => (
                <MenuContent
                    className="flex justify-between font-semibold cursor-pointer hover:text-primary group"
                    subMenuClassName="absolute opacity-0 left-[90%] w-[50px] h-[35px]"
                    key={menu.slug}
                    name={menu.name}
                    slug={menu.slug}
                    childrenData={menu.subMenu}
                    isLast={index === dataRendering.length - 1}
                    childrenContent={
                        <SubMenuContent
                            className="absolute left-full top-[-1px] shadow-default text-gray-dark hidden group-hover:block ml-2 p-6 h-[452px] overflow-y-auto bg-white rounded-r-md z-[999]"
                            subClassName="flex flex-wrap mr-2"
                            childrenData={menu.subMenu}
                        />
                    }
                />
            ))}
            <LineBreak />
            {isShowCollapse && isShowViewMore && (
                <div className="text-center mt-[7%] cursor-pointer hover:text-primary" onClick={handleDisplayMore}>
                    Xem thêm
                </div>
            )}
            {!isShowCollapse && isShowViewMore && (
                <div className="text-center mt-[12%] cursor-pointer hover:text-primary" onClick={handleCollapse}>
                    Thu gọn
                </div>
            )}
        </div>
    );
};

export default DesktopSideBar;
