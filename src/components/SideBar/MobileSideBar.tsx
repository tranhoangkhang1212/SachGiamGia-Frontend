import { API } from '@/configs/axios';
import { BaseDataResponse } from '@/interfaces/BaseDataResponse';
import { faRectangleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useAsync } from 'react-use';
import LoadingOverlay from '../LoadingOverlay';
import MenuContent, { IMenuContentData } from './MenuContent';
import SubMenuContent from './SubMenuContent';

interface IProps {
    isShow: boolean;
    onClose: () => void;
}

const MobileSideBar: React.FC<IProps> = (props) => {
    const { isShow, onClose } = props;
    const { loading, value } = useAsync(() => API.get('/sidebar'));
    const response = value as BaseDataResponse<IMenuContentData[]>;

    if (loading) {
        return <LoadingOverlay />;
    }

    return (
        <>
            <div
                className={clsx(
                    'bg-[#00000097] bg-opacity-90 fixed top-0 right-0 h-screen w-screen invisible z-[9] origin-center opacity-0 duration-700',
                    {
                        '!visible opacity-100': isShow,
                    },
                )}
                onClick={onClose}
            />
            <div
                className={clsx(
                    'fixed top-0 left-0 transition-transform -translate-x-full duration-700 h-full z-[99] w-screen xs:w-[60vw]',
                    { '!translate-x-0': isShow },
                )}
            >
                <div className="bg-primary text-white fixed left-0 top-0 h-[100vh] w-[80vw] xs:w-[280px] overflow-x-hidden overflow-y-auto">
                    <div className="py-4 mb-4 border-b-[1px] flex justify-between px-4">
                        <span>Danh mục sản phẩm</span>
                        <FontAwesomeIcon
                            icon={faRectangleXmark}
                            size="xl"
                            className="cursor-pointer"
                            onClick={onClose}
                        />
                    </div>
                    {response.data.map((menu) => (
                        <MenuContent
                            className="flex justify-between cursor-pointer font-semibold px-4 py-[8px]"
                            iconClassName={clsx('h-6 w-6 transition-all')}
                            key={menu.slug}
                            name={menu.name}
                            slug={menu.slug}
                            childrenData={menu.subMenu}
                            isLast={false}
                            childrenContent={
                                <SubMenuContent
                                    className={clsx('overflow-y-auto overflow-x-hidden')}
                                    subClassName={clsx('transition-all origin-top list-disc list-inside mt-2')}
                                    contentClassName="mb-4"
                                    childrenData={menu.subMenu}
                                />
                            }
                            isMobile={true}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default MobileSideBar;
