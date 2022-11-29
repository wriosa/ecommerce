import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])
    return (
        <div>

        </div>
    );
};

export default Purchases;