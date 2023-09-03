import { SideBarData } from '@/constants/MockData';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useState } from 'react';
import { useToggle } from 'react-use';
import LineBreak from './LineBreak';

const LIMIT_SIZE_SIDE_BAR = 10;

const SideBar = () => {
    const defaultData = SideBarData.slice(0, LIMIT_SIZE_SIDE_BAR - 1);

    const [dataRendering, setDataRendering] = useState(
        SideBarData.length > LIMIT_SIZE_SIDE_BAR ? defaultData : SideBarData,
    );
    const [isShowCollapse, toggleCollapse] = useToggle(
        SideBarData.length > LIMIT_SIZE_SIDE_BAR,
    );

    const handleDisplayMore = () => {
        setDataRendering(SideBarData);
        toggleCollapse();
    };

    const handleCollapse = () => {
        setDataRendering(defaultData);
        toggleCollapse();
    };

    return (
        <div
            className="text-[#000] w-[260px] border-[1px] 
                        p-4 rounded-md 
                        border-gray min-h-[420px]
                        relative 
                        hidden lg:block"
        >
            {dataRendering.map((menu, index) => (
                <SideBarChildren
                    key={menu.slug}
                    title={menu.title}
                    slug={menu.slug}
                    childrenData={menu.subList}
                    isLast={index === dataRendering.length - 1}
                />
            ))}
            <LineBreak />
            {isShowCollapse && (
                <div
                    className="text-center mt-[7%] cursor-pointer hover:text-primary"
                    onClick={handleDisplayMore}
                >
                    Xem thêm
                </div>
            )}
            {!isShowCollapse && (
                <div
                    className="text-center mt-[12%] cursor-pointer hover:text-primary"
                    onClick={handleCollapse}
                >
                    Thu gọn
                </div>
            )}
        </div>
    );
};

interface IChildrenSideBar {
    title: string;
    slug: string;
}

interface IChildrenProps {
    title: string;
    slug: string;
    childrenData: IChildrenSideBar[];
    isLast: boolean;
}

const SideBarChildren: React.FC<IChildrenProps> = (props) => {
    const { title, slug, childrenData, isLast } = props;
    console.log(childrenData);

    return (
        <>
            <Link
                href={{
                    pathname: '/products',
                    query: { slug: slug },
                }}
                as={`/san-pham/${slug}`}
                className="flex justify-between cursor-pointer 
                        hover:text-primary font-semibold group text-gray-dark"
            >
                <span>{title}</span>
                {childrenData && childrenData.length > 0 && (
                    <>
                        <div className="absolute opacity-0 left-[90%] w-[50px] h-[35px]"></div>
                        <FontAwesomeIcon
                            className="text-[#ccc] group-hover:text-primary"
                            icon={faCaretRight}
                        />
                        <SideBarChildrenSubList
                            childrenData={childrenData}
                            primarySlug={slug}
                        />
                    </>
                )}
            </Link>
            {!isLast && <LineBreak />}
        </>
    );
};

interface IChildrenSideBarProps {
    primarySlug: string;
    childrenData: IChildrenSideBar[];
}

const SideBarChildrenSubList: React.FC<IChildrenSideBarProps> = (props) => {
    const { childrenData } = props;
    return (
        <div
            className="absolute left-full top-[-1px]
                        shadow-default text-gray-dark
                        hidden group-hover:block
                        ml-2 p-6
                        w-[800px] min-h-[280px] bg-white rounded-r-md"
        >
            <ul className="flex flex-wrap">
                {childrenData.map((subMenu) => (
                    <li
                        key={subMenu.slug}
                        className="hover:text-primary mb-4 basis-1/4"
                    >
                        {subMenu.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideBar;
