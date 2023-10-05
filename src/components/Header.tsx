import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useDebounce, useToggle } from 'react-use';
import { logo } from '~/assets/images';
import ComingSoon from './ComingSoon';
import { Cart, Search, User } from './Icons';
import SearchResult from './SearchResult';

interface IProps {
    className?: string;
    toggleComingSoon?: () => void;
}

const Header = () => {
    const [isShowComingSoon, toggleComingSoon] = useToggle(false);

    return (
        <div className="px-4 bg-primary md:px-8 xl:px-0">
            <div className="flex flex-wrap items-center py-4 max-w-primary margin-center md:flex-nowrap">
                <LogoComponent
                    className="basis-1/2 md:basis-[20%] lg:basis-[25%] xl:basis-1/4 order-1 md:order-1"
                    toggleComingSoon={toggleComingSoon}
                />
                <SearchForm className="basis-full md:basis-[50%] lg:basis-[55%] xl:basis-2/4 order-3 md:order-2" />
                <CartComponent
                    className="basis-1/2 md:basis-[30%] lg:basis-[25%] xl:basis-1/4 order-2 md:order-3"
                    toggleComingSoon={toggleComingSoon}
                />
                {isShowComingSoon && <ComingSoon toggle={toggleComingSoon} />}
            </div>
        </div>
    );
};

const LogoComponent: React.FC<IProps> = ({ className }) => {
    const { push } = useRouter();

    const redirectToHome = () => {
        push('/');
        toast.error;
    };
    return (
        <div className={className}>
            <Image
                priority={true}
                src={logo}
                alt={''}
                className="w-auto max-h-[50px] cursor-pointer"
                onClick={redirectToHome}
            />
        </div>
    );
};

const SearchForm: React.FC<IProps> = ({ className }) => {
    const [input, setInput] = useState<string>('');
    const [debouncedValue, setDebouncedValue] = useState('');
    const [showSearchResult, setShowSearchResult] = useState(true);

    const { push } = useRouter();

    const [,] = useDebounce(
        () => {
            setDebouncedValue(input);
        },
        500,
        [input],
    );

    const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSearch = () => {
        setShowSearchResult(false);
        push(`/tim-kiem/${input}`);
    };

    return (
        <div className={clsx('flex-center mx-0 md:mx-4 relative', className)}>
            <div className="w-full md:w-[90%] mt-4 md:mt-0 h-[40px] flex items-center bg-[#fff] rounded-[5px]">
                <input
                    type="text"
                    className="w-full h-full text-[#000] outline-none p-2 rounded-[5px]"
                    onChange={handleKeywordChange}
                />
                <button className="w-[45px] h-[40px]" onClick={handleSearch}>
                    <Search height="22px" />
                </button>
            </div>
            {showSearchResult && <SearchResult keyword={debouncedValue} />}
        </div>
    );
};

const CartComponent: React.FC<IProps> = ({ className, toggleComingSoon }) => {
    return (
        <div className={clsx('flex items-center justify-end', className)}>
            <div className="flex items-center cursor-pointer">
                <User height="30px" className="fill-[#fff] mr-2 hidden md:block" />
                <User height="25px" className="fill-[#fff] mr-2 md:hidden" />
                <div className="hidden md:block font-[600]">
                    <p className="flex items-center whitespace-nowrap hover:text-dark" onClick={toggleComingSoon}>
                        Đăng nhập
                    </p>
                    <span className="flex items-center whitespace-nowrap hover:text-dark" onClick={toggleComingSoon}>
                        Đăng ký
                    </span>
                </div>
            </div>
            <div className="flex items-center ml-2 cursor-pointer md:ml-8 hover:text-dark" onClick={toggleComingSoon}>
                <Cart height="30px" className="fill-[#fff] mr-2 hidden md:block" />
                <Cart height="25px" className="fill-[#fff] mr-2 md:hidden" />
                <span className="whitespace-nowrap hidden md:block font-[600]">Giỏ hàng (000)</span>
            </div>
        </div>
    );
};

export default Header;
