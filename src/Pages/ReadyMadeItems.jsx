import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ReadyMadeItemDisplay from '../Components/ReadyMadeItemDisplay/ReadyMadeItemDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import FeedbackForm from '../Components/FeedbackForm/Feedback';

const ReadyMadeItems = () => {
  const { all_products, reviews, userDetails, ready_made_products } = useContext(ShopContext);
  const { productId } = useParams();

  const product = ready_made_products.find((e) => e.id.toString() === productId);
  const productReviews = reviews.filter((review) => review.product_id === productId);

  return (
    <div>
{/*         <Breadcrums product={product} /> */}
        <ReadyMadeItemDisplay product={product} reviews={productReviews}/>
        <DescriptionBox product={product} reviews={productReviews} />
        <FeedbackForm product={product} userDetails={userDetails} productId={productId} />
    </div>
  );
}

export default ReadyMadeItems;
