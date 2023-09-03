import { NextPageContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface IQuery extends ParsedUrlQuery {
    slug: string;
    subSlug?: string;
}

interface IProps {
    data: IServerSideData[];
}

interface IServerSideData {
    title: string;
    name: string;
}

interface IPropsResult {
    props: IProps;
}

interface ContextWithParams extends NextPageContext {
    query: {
        slug: string;
    };
}

const Products = (props: IProps) => {
    console.log(props.data);

    return <div>Hello</div>;
};

export const getServerSideProps = async (
    context: ContextWithParams,
): Promise<IPropsResult> => {
    const { query } = context;
    const slug = query.slug;

    return {
        props: {
            data: [
                { title: 'Hello', name: slug },
                { title: 'Hello', name: 'Hello Khangth' },
            ],
        }, // will be passed to the page component as props
    };
};

export default Products;
