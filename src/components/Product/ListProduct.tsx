import { IProductData } from '@/interfaces/Product';
import clsx from 'clsx';
import { book_2, onePiece_1 } from '~/assets/images';
import ProductView from './ProductView';
import styles from './style.module.scss';
import { IBaseAppProps } from '@/interfaces/Props';
import ProductListView from './ProductListView';

interface IListProductProps extends IBaseAppProps {
    title?: string;
    products: IProductData[];
    gridClassName?: string;
}

const ListProduct: React.FC<IListProductProps> = (props) => {
    const { title = 'Product list title', products, className, gridClassName } = props;
    return (
        <div className={clsx('relative', className)}>
            <div className={clsx('inline-block absolute mt-[-20px] ml-[-8px]', styles.wrapper)}>
                <h1 className="bg-primary h-[40px] leading-[40px] px-12 text-[18px] text-white">{title}</h1>
            </div>
            <div className="border-[1px] border-b-2 border-gray border-b-primary rounded-md p-2">
                <ProductListView className={gridClassName} products={products} />
            </div>
        </div>
    );
};

export default ListProduct;
