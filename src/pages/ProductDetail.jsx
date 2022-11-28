import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductThunk } from '../store/slices/products.eslice';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductThunk());
    }, []);

    const productsList = useSelector(state => state.products);
    const productsFound = productsList.find(productItem => productItem.id === Number(id))
    const relatedProducts = productsList.filter(productItem => 
        productItem.category.id === productsFound.category.id &&
        productItem.id !== productsFound.id )
    console.log(relatedProducts)
    return (
        <div>
            <h1>{productsFound?.title}</h1>
            <p>{productsFound?.description}</p>
            <img src={productsFound?.productImgs[0]} alt="" />
            <h2>Related Products: </h2>
            {relatedProducts.map(productItem => (                
                <li key={productItem.id}><Link to={`/product/${productItem.id}`} >{productItem?.title}</Link></li>
            ))}
        </div>
    );
};

export default ProductDetail;