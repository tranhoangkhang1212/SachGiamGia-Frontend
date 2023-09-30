import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ScrollToTop: React.FC<{ onClick: () => void }> = (props) => {
    return (
        <div
            className="fixed bottom-[25px] right-[35px] w-[50px] h-[50px] flex-center m-auto rounded-[50%] bg-primary cursor-pointer drop-shadow-xl"
            onClick={props.onClick}
        >
            <FontAwesomeIcon icon={faArrowUp} size="xl" />
        </div>
    );
};

export default ScrollToTop;
