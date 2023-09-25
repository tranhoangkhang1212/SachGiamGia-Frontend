import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import LineBreak from '../LineBreak';
import { useToggle } from 'react-use';
import clsx from 'clsx';

export interface IMenuContent {
    name: string;
    slug: string;
}
export interface IMenuContentData extends IMenuContent {
    subMenu: IMenuContentData[];
}

interface IMenuContentProps {
    className?: string;
    subMenuClassName?: string;
    iconClassName?: string;
    name: string;
    slug: string;
    childrenContent: JSX.Element | JSX.Element[];
    childrenData: IMenuContent[];
    isLast: boolean;
    isMobile?: boolean;
    onClick?: () => void;
}

const MenuContent: React.FC<IMenuContentProps> = (props) => {
    const {
        name,
        slug,
        childrenData,
        isLast,
        className,
        subMenuClassName,
        iconClassName = 'text-[#ccc] group-hover:text-primary',
        childrenContent,
        isMobile = false,
    } = props;

    if (isMobile) {
        return (
            <>
                <ContentMobile
                    name={name}
                    slug={slug}
                    childrenContent={childrenContent}
                    childrenData={childrenData}
                    className={className}
                    subMenuClassName={subMenuClassName}
                    isLast={isLast}
                    isMobile={isMobile}
                    iconClassName={iconClassName}
                />
                <LineBreak />
            </>
        );
    }

    return (
        <>
            <Content
                name={name}
                slug={slug}
                childrenContent={childrenContent}
                childrenData={childrenData}
                className={className}
                subMenuClassName={subMenuClassName}
                isLast={isLast}
            />
            {!isLast && <LineBreak />}
        </>
    );
};

const Content: React.FC<IMenuContentProps> = (props) => {
    const {
        name,
        slug,
        childrenData,
        className,
        subMenuClassName,
        iconClassName = 'text-[#ccc] group-hover:text-primary',
        childrenContent,
    } = props;

    return (
        <Link
            href={{
                pathname: '/products',
                query: { slug: slug },
            }}
            as={`/danh-muc/${slug}`}
            className={className}
        >
            <span>{name}</span>
            {childrenData && childrenData.length > 0 && (
                <>
                    <div className={subMenuClassName} />
                    <FontAwesomeIcon className={iconClassName} icon={faCaretRight} />
                    {childrenContent}
                </>
            )}
        </Link>
    );
};

const ContentMobile: React.FC<IMenuContentProps> = (props) => {
    const {
        name,
        slug,
        childrenData,
        className,
        iconClassName = 'text-[#ccc] group-hover:text-primary',
        childrenContent,
    } = props;

    const [isShow, toggleHide] = useToggle(false);

    return (
        <>
            <div className={className} onClick={toggleHide}>
                <Link
                    href={{
                        pathname: '/products',
                        query: { slug: slug },
                    }}
                    as={`/danh-muc/${slug}`}
                >
                    <span>{name}</span>
                </Link>
                {childrenData && childrenData.length > 0 && (
                    <>
                        <FontAwesomeIcon className={clsx(iconClassName, { 'rotate-90': isShow })} icon={faCaretRight} />
                    </>
                )}
            </div>
            {isShow && <div className="ml-8">{childrenContent}</div>}
        </>
    );
};

export default MenuContent;
