import { NextPageContext } from 'next';

export interface ContextWithParams extends NextPageContext {
    query: {
        slug: string;
        subSlug?: string;
    };
}
