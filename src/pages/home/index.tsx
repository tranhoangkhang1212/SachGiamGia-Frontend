import {
    ETokenType,
    IGlobalStateType,
    ITokenType,
} from '@/constants/StateManagement';
import { addToken } from '@/redux/token/tokenAction';
import Link from 'next/link';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
    const tokens = useSelector((state: IGlobalStateType) => state.tokens);
    const dispatch = useDispatch();

    const handleAddToken = () => {
        dispatch(addToken(ETokenType.ADMIN, 'AdminToken'));
        dispatch(addToken(ETokenType.CLIENT, 'ClientToken'));
    };
    console.log(tokens);

    return (
        <div>
            <button className="my-4" onClick={handleAddToken}>
                Add Token
            </button>
            <h1 className="title">
                <Link href="/login">Go To Login</Link>
            </h1>
        </div>
    );
};

export default Home;
