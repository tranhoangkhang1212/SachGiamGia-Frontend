import clsx from 'clsx';
import styles from './style.module.scss';

interface ISaleOffProps {
    saleOff: number;
    className?: string;
}

const SaleOff: React.FC<ISaleOffProps> = ({ saleOff, className }) => {
    if (!saleOff || saleOff < 0) {
        return <></>;
    }

    return (
        <div className={clsx('inline-block mt-[-20px] ml-[-8px]', styles['sale-off'], className)}>
            <h3
                className={clsx(
                    'bg-red-600 text-white h-[25px] leading-[25px] px-2 text-[14px] font-bold',
                    'rounded-tr-[20px] rounded-tl-[7px] rounded-br-[20px]',
                )}
            >
                Giảm {saleOff}%
            </h3>
        </div>
    );
};

export default SaleOff;
