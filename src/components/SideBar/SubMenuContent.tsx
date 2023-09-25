import clsx from 'clsx';
import React from 'react';
import styles from './style.module.scss';
import Link from 'next/link';
import { IMenuContent } from './MenuContent';

interface ISubMenuContentProps {
    className?: string;
    subClassName?: string;
    contentClassName?: string;
    childrenData: IMenuContent[];
}

const SubMenuContent: React.FC<ISubMenuContentProps> = (props) => {
    const {
        className,
        subClassName,
        contentClassName = 'hover:text-primary mb-4 basis-1/4 flex-grow-1 flex-shrink-0 w-[250px] xl:w-[200px] mr-4 xl:mr-0',
        childrenData = [],
    } = props;

    return (
        <div className={clsx(styles.sub_menu, className)}>
            <ul className={subClassName}>
                {childrenData.map((subMenu) => (
                    <li key={subMenu.slug} className={contentClassName}>
                        <Link
                            href={{
                                pathname: '/products',
                                query: { slug: subMenu.slug },
                            }}
                            as={`/danh-muc/${subMenu.slug}`}
                        >
                            {subMenu.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubMenuContent;
