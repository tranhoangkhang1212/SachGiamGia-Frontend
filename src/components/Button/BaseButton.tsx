import clsx from 'clsx';
import React from 'react';

interface IBaseButton {
    className?: string;
    text?: string;
}

const BaseButton: React.FC<IBaseButton> = (props) => {
    const { className, text = 'Button' } = props;
    return (
        <div
            className={clsx(
                'inline-block text-center w-full rounded-[3px] font-semibold',
                'py-3 cursor-pointer border-2',
                'ease-linear duration-200',
                className,
            )}
        >
            {text}
        </div>
    );
};

export default BaseButton;
