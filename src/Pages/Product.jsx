import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import FeedbackForm from '../Components/FeedbackForm/Feedback';

const Product = () => {
  const { all_products, reviews, userDetails } = useContext(ShopContext);
  const { productId } = useParams();

  const product = all_products.find((e) => e.id === productId);
  const productReviews = reviews.filter((review) => review.product_id === productId);

  return (
    <div>
        <Breadcrums product={product} />
        <ProductDisplay product={product} reviews={productReviews}/>
        <DescriptionBox product={product} reviews={productReviews} />
        <FeedbackForm product={product} userDetails={userDetails} productId={productId} />
    </div>
  );
}

export default Product;
