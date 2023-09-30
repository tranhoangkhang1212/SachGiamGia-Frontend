import { API } from '@/configs/axios';
import { EDeviceDetect } from '@/constants/DeviceDetect';
import { useDeviceDetect } from '@/hooks';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AxiosError } from 'axios';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useToggle } from 'react-use';
import { IMenuContentData } from './SideBar/MenuContent';

const DesktopSideBar = dynamic(() => import('./SideBar/DesktopSideBar'), {
    ssr: false,
});
const MobileSideBar = dynamic(() => import('./SideBar/MobileSideBar'), {
    ssr: false,
});

const TopComponentSpecial = () => {
    const { breakPoint } = useDeviceDetect();

    const [isShowDesktopSideBar, toggleShowDesktopSideBar] = useToggle(false);
    const [isShowSideBar, toggleShowSideBar] = useToggle(false);

    const handleShowSidebar = () => {
        toggleShowDesktopSideBar();
        toggleShowSideBar();
    };

    const [isLoading, setIsLoading] = useState(false);
    const [sidebarData, setSidebarData] = useState<IMenuContentData[]>([]);

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
                {isShowDesktopSideBar && (
                    <DesktopSideBar
                        className={clsx('basis-[23%] mr-4 absolute', {
                            '!block': isShowDesktopSideBar && breakPoint > EDeviceDetect.md,
                        })}
                        data={sidebarData}
                        onClick={toggleShowDesktopSideBar}
                    />
                )}
                {breakPoint <= EDeviceDetect.md && <MobileSideBar isShow={isShowSideBar} onClose={handleShowSidebar} />}
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

export default TopComponentSpecial;
