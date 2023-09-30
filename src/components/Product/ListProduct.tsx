import { IProductData } from '@/interfaces/Product';
import { IBaseAppProps } from '@/interfaces/Props';
import clsx from 'clsx';
import ProductListView from './ProductListView';
import styles from './style.module.scss';

interface IListProductProps extends IBaseAppProps {
    name?: string;
    products: IProductData[];
    gridClassName?: string;
}

const ListProduct: React.FC<IListProductProps> = (props) => {
    const { name = 'Product list title', products, className, gridClassName } = props;
    return (
        <div className={clsx('relative', className)}>
            <div className={clsx('inline-block absolute mt-[-20px] ml-[-8px]', styles.wrapper)}>
                <h1 className="bg-primary h-[40px] leading-[40px] px-12 text-[18px] text-white">{name}</h1>
            </div>
            <div className="border-[1px] border-b-2 border-gray border-b-primary rounded-md px-4 pb-4 pt-8">
                <ProductListView className={gridClassName} products={products} />
            </div>
        </div>
    );
};

export default ListProduct;
