import { EDeviceDetect } from '@/constants/DeviceDetect';
import { useDeviceDetect } from '@/hooks';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useToggle } from 'react-use';
import CarouselBanner from './CarouselBanner';
import { IMenuContentData } from './SideBar/MenuContent';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { API } from '@/configs/axios';
import LoadingOverlay from './LoadingOverlay';

const DesktopSideBar = dynamic(() => import('./SideBar/DesktopSideBar'), {
    ssr: false,
});
const MobileSideBar = dynamic(() => import('./SideBar/MobileSideBar'), {
    ssr: false,
});

const TopComponent = () => {
    const { breakPoint } = useDeviceDetect();

    const [isShowDesktopSideBar, toggleShowDesktopSideBar] = useToggle(false);
    const [iShowMobileSideBar, toggleShowMobileSideBar] = useToggle(false);

    const [isLoading, setIsLoading] = useState(false);
    const [sidebarData, setSidebarData] = useState<IMenuContentData[]>([]);

    const handleShowSidebar = () => {
        if (breakPoint > EDeviceDetect.lg) {
            return;
        }
        toggleShowDesktopSideBar();
        toggleShowMobileSideBar();
    };

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const { data } = await API.get('/sidebar');
            setSidebarData(data);
        } catch (error) {
            toast.error((error as AxiosError).message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return <></>;
    }

    return (
        <>
            <ContactHeader className="cursor-pointer" onClick={handleShowSidebar} />
            <div className="justify-between lg:flex">
                <DesktopSideBar
                    className={clsx('basis-[23%] mr-4 absolute lg:relative', {
                        '!block': isShowDesktopSideBar && breakPoint > EDeviceDetect.md,
                    })}
                    data={sidebarData}
                />
                {breakPoint <= EDeviceDetect.md && (
                    <MobileSideBar isShow={iShowMobileSideBar} onClose={handleShowSidebar} />
                )}
                <CarouselBanner className={clsx('basis-[77%] z-0')} />
            </div>
        </>
    );
};

interface IContactHeaderProps {
    className?: string;
    onClick: () => void;
}

const ContactHeader: React.FC<IContactHeaderProps> = (props) => {
    const { className, onClick } = props;
    return (
        <div className={clsx('text-black flex justify-between my-4', className)}>
            <div className="flex" onClick={onClick}>
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
