import React from 'react';
import Overlay from './Overlay';
import { coming_soon } from '~/assets/images';
import Image from 'next/image';

interface IComingSoonProps {
    toggle: () => void;
}

const ComingSoon: React.FC<IComingSoonProps> = (props) => {
    const { toggle } = props;
    return (
        <Overlay isShow toggle={toggle}>
            <Image src={coming_soon} alt={''} />
        </Overlay>
    );
};

export default ComingSoon;
