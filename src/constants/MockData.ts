const returnNewData = (index: number) => {
    const specialIndexes = [2, 5, 7];

    let subList = [
        {
            title: 'Truyện tranh subList ' + index + 1,
            slug: 'truyen-tranh-sublit-' + index + 1,
        },
        {
            title: 'Truyện tranh subList ' + index + 2,
            slug: 'truyen-tranh-sublit-' + index + 2,
        },
        {
            title: 'Truyện tranh subList ' + index + 3,
            slug: 'truyen-tranh-sublit-' + index + 3,
        },
        {
            title: 'Truyện tranh subList ' + index + 4,
            slug: 'truyen-tranh-sublit-' + index + 4,
        },
        {
            title: 'Truyện tranh subList ' + index + 5,
            slug: 'truyen-tranh-sublit-' + index + 5,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 24,
            slug: 'truyen-tranh-sublit-' + index + 24,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
            slug: 'truyen-tranh-sublit-' + index + 6,
        },
        {
            title: 'Truyện tranh subList ' + index + 6,
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
        title: 'Truyện Tranh ' + index,
        slug: 'truyen-tranh-' + index,
        subList: subList,
    };
};

export const SideBarData = [...Array(12)].map((_, index) =>
    returnNewData(index + 1),
);

const bookDataResult = (index: number) => {
    return {
        name: 'One piece ' + index,
        author: 'Eiichiro Oda',
        price: '20000 VND',
        saleOff: '20',
    };
};

export const BookData = [...Array(4)].map((_, index) =>
    bookDataResult(index + 1),
);
