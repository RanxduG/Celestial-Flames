import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import FeedbackForm from '../Components/FeedbackForm/Feedback';

const Product = () => {
  const { all_products, reviews, userDetails, allProducts } = useContext(ShopContext);
  const { productId } = useParams();

  const testProduct = allProducts.find((product) => product.id === productId);

  const product = all_products.find((e) => e.id === productId);
  const productReviews = reviews.filter((review) => review.product_id === productId);

  return (
    <div>
        <Breadcrums product={testProduct} />
        <ProductDisplay product={testProduct} reviews={productReviews}/>
        <DescriptionBox product={testProduct} reviews={productReviews} />
        <FeedbackForm product={testProduct} userDetails={userDetails} productId={productId} />
    </div>
  );
}

export default Product;
