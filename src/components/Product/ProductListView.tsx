import { IProductData } from '@/interfaces/Product';
import { IBaseAppProps } from '@/interfaces/CommonProps';
import Grid from '@mui/material/Unstable_Grid2';
import clsx from 'clsx';
import React from 'react';
import ProductView from './ProductView';

interface IProductListViewProps extends IBaseAppProps {
    products: IProductData[];
    subClassName?: string;
}

const ProductListView: React.FC<IProductListViewProps> = (props) => {
    const { subClassName, products } = props;

    return (
        <Grid container spacing={2}>
            {products.map((product) => (
                <Grid key={product.id} xl={2.4} lg={2.4} md={3} sm={4} xs={6}>
                    <ProductView className={clsx('mt-6 border-[1px] border-[#ccc]', subClassName)} {...product} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductListView;
