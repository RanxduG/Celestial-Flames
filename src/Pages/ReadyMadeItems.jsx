import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import ReadyMadeItemDisplay from '../Components/ReadyMadeItemDisplay/ReadyMadeItemDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import FeedbackForm from '../Components/FeedbackForm/Feedback';

const ReadyMadeItems = () => {
  const { reviews, userDetails, allStocks } = useContext(ShopContext);
  const { productId } = useParams();

  const testProduct = allStocks.find((product) => product.id === productId);
  const productReviews = reviews.filter((review) => review.product_id === productId);

  return (
    <div>
        <ReadyMadeItemDisplay product={testProduct} reviews={productReviews}/>
        <DescriptionBox product={testProduct} reviews={productReviews} />
        <FeedbackForm product={testProduct} userDetails={userDetails} productId={productId} />
    </div>
  );
}

export default ReadyMadeItems;
