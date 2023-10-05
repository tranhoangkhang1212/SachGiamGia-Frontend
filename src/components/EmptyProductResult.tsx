import React from 'react';
import { Empty } from './Icons';

const EmptyProductResult = () => {
    return (
        <div className="flex-center flex-col">
            <Empty />
            <h2>Không có sản phẩm phù hợp</h2>
        </div>
    );
};

export default EmptyProductResult;
