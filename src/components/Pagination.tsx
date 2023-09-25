import { IBaseAppProps } from '@/interfaces/Props';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight, faRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps extends IBaseAppProps {
    pageSize: number;
    totalElement: number;
}

const Pagination: React.FC<PaginationProps> = (props) => {
    const { className,pageSize, totalElement } = props;

    const totalPage = Math.ceil(totalElement / pageSize)

    const handlePageClick = (event) => {
        console.log(event);
    };

    return (
        <div className={clsx("flex-center", className)}>
            <ReactPaginate
                breakLabel="..."
                onPageChange={handlePageClick}
                pageRangeDisplayed={pageSize}
                pageCount={totalPage}
                previousLabel={<PaginationButton icon={faChevronLeft}/>}
                nextLabel={<PaginationButton icon={faChevronRight}/>}
                renderOnZeroPageCount={null}
                pageLinkClassName="mx-[5px] text-[15px] border-[1px] pt-1 w-8 h-8 block flex-center rounded-md"
                containerClassName="flex items-center"
                activeLinkClassName='bg-primary bg-opacity-60 border-primary font-semibold'
            />
        </div>
    );
};

interface PaginationButtonProps {
    icon: IconProp
}

const PaginationButton:React.FC<PaginationButtonProps> = (props) => {
    const {icon}  =props
    return <div className='border-[1px] w-8 h-8 flex-center rounded-md'>
        <FontAwesomeIcon icon={icon} size='xs' />
    </div>
}

export default Pagination;
