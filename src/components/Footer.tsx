import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import ParserFromString from './ParserFromString';
import { BaseLayoutResponseDto } from '@/interfaces/response/BaseLayoutResponseDto';

interface IParentProps {
    className?: string;
    data: BaseLayoutResponseDto;
}

interface IFooterProps {
    data: BaseLayoutResponseDto;
}

const Footer: React.FC<IFooterProps> = (props) => {
    const { data } = props;

    return (
        <div className="max-h-full py-4 mt-8 bg-primary">
            <div className="m-auto flex-center">
                <div className="flex flex-wrap justify-between w-[90vw] lg:max-w-primary">
                    <Contact className="relative basis-full xs:basis-2/3 md:basis-2/4 lg:basis-[30%]" data={data} />
                    <RefLink
                        className="relative basis-full xs:basis-1/3 md:basis-1/4 lg:basis-[20%] mt-6 xs:mt-0"
                        data={data}
                    />
                    <Policy
                        className="relative basis-full xs:basis-2/3 md:basis-1/4 lg:basis-[20%] mt-8 md:mt-0"
                        data={data}
                    />
                    <Location
                        className="relative basis-full xs:basis-1/3 md:basis-full lg:basis-[20%] mt-8 lg:mt-0"
                        data={data}
                    />
                </div>
            </div>
        </div>
    );
};

const Contact: React.FC<IParentProps> = (props) => {
    const { className, data } = props;
    return (
        <div className={className}>
            <h1 className="inline-block pb-[2px] mb-3 xs:mb-5 uppercase border-b-2 border-b-[#5c5c5c] font-[700]">
                Liên hệ với chúng tôi
            </h1>
            <ul>
                <li>
                    <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                    <span>
                        <ParserFromString value={data?.address || ''} />
                    </span>
                </li>
                <li className="my-2">
                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                    <span>{data?.phone}</span>
                </li>
                <li>
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    <span>{data?.email}</span>
                </li>
                <li></li>
                <li></li>
            </ul>
        </div>
    );
};

const RefLink: React.FC<IParentProps> = (props) => {
    const { className } = props;
    return (
        <div className={className}>
            <div className="left-0 xs:absolute md:right-6">
                <h1 className="inline-block pb-[2px] mb-3 xs:mb-5 uppercase border-b-2 border-b-[#5c5c5c] font-[700]">
                    Hướng dẫn
                </h1>
                <ul className="list-disc list-inside">
                    <li>
                        <Link href={''}>Trang Chủ</Link>
                    </li>
                    <li>
                        <Link href={''}>Giới thiệu</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const Policy: React.FC<IParentProps> = (props) => {
    const { className } = props;
    return (
        <div className={className}>
            <h1 className="inline-block pb-[2px] mb-3 xs:mb-5 uppercase border-b-2 border-b-[#5c5c5c] font-[700]">
                Chính sách
            </h1>
            <ul className="list-disc list-inside">
                <li>
                    <Link href={''}>Chính sách mua hàng</Link>
                </li>
                <li>
                    <Link href={''}>Chính sách khuyến mãi</Link>
                </li>
            </ul>
        </div>
    );
};

const Location: React.FC<IParentProps> = (props) => {
    const { className } = props;
    return (
        <div className={className}>
            <div className="left-0 xs:absolute md:relative md:right-0">
                <h1 className="inline-block pb-[2px] mb-3 xs:mb-5 uppercase border-b-2 border-b-[#5c5c5c] font-[700]">
                    Location
                </h1>
                <ul className="list-disc list-inside">
                    <li>Coming soon </li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;
