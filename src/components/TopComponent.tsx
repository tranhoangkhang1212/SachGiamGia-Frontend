import React from 'react';
import CarouselBanner from './CarouselBanner';
import SideBar from './SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const TopComponent = () => {
    return (
        <>
            <ContactHeader />
            <div className="lg:flex justify-between">
                <SideBar />
                <CarouselBanner />
            </div>
        </>
    );
};

const ContactHeader = () => {
    return (
        <div className="text-black flex justify-between mt-4 mb-2 border-[1px] p-2 border-white-gray border-opacity-60 rounded-md">
            <div className="flex">
                <FontAwesomeIcon icon={faBars} className="mr-2 text-[20px]" />
                <span>Danh mục sản phẩm</span>
            </div>
            <span>
                Hotline: <span className="font-bold">1900 9999</span>
            </span>
        </div>
    );
};

export default TopComponent;
