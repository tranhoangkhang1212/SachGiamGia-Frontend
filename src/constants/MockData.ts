import { IProductData } from '@/interfaces/Product';

const returnNewData = (index: number) => {
    const specialIndexes = [2, 5, 7];

    let subList = [
        {
            name: 'Truyện tranh subList ' + index + 1,
            slug: 'truyen-tranh-sublit-' + index + 1,
        },
        {
            name: 'Truyện tranh subList ' + index + 2,
            slug: 'truyen-tranh-sublit-' + index + 2,
        },
        {
            name: 'Truyện tranh subList ' + index + 3,
            slug: 'truyen-tranh-sublit-' + index + 3,
        },
        {
            name: 'Truyện tranh subList ' + index + 4,
            slug: 'truyen-tranh-sublit-' + index + 4,
        },
        {
            name: 'Truyện tranh subList ' + index + 5,
            slug: 'truyen-tranh-sublit-' + index + 5,
        },
        {
            name: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            name: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            name: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            name: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            name: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
    ];
    if (specialIndexes.includes(index)) {
        subList = [subList[0]];
    }
    if (index === 3) {
        subList = [];
    }

    return {
        name: 'Truyện Tranh ' + index,
        slug: 'truyen-tranh-' + index,
        subList: subList,
    };
};

export const SideBarData = [...Array(12)].map((_, index) => returnNewData(index + 1));

const bookDataResult = (index: number): IProductData => {
    return {
        id: index + '',
        name: 'Truyện tranh siêu hay Onepiece' + index,
        slug: 'one-piece-' + index,
        author: 'Eiichiro Oda',
        price: 20000,
        image: '',
        saleOff: index % 2,
        publisher: 'Trần Khang',
        finalPrice: 18000,
    };
};

export const BookData = [...Array(10)].map((_, index) => bookDataResult(index + 1));
