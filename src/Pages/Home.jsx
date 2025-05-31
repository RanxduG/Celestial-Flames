import React from 'react';
import WelcomeBanner from '../Components/WelcomeBanner/WelcomeBanner';
import FeaturesSection from '../Components/FeaturesSection/FeaturesSection';
import ProductShowcase from '../Components/ProductShowcase/ProductShowcase';
import CustomizationProcess from '../Components/CustomizationProcess/CustomizationProcess';
import TestimonialSlider from '../Components/TestimonialSlider/TestimonialSlider';
import CollectionsShowcase from '../Components/CollectionsShowcase/CollectionsShowcase';
// import NewsletterSection from '../Components/NewsletterSection/NewsletterSection';

const Home = () => {
  return (
    <div className="home-page">
      <WelcomeBanner />
      <FeaturesSection />
      <CollectionsShowcase />
      <CustomizationProcess />
      <TestimonialSlider />
      {/* <NewsletterSection /> */}
    </div>
  );
};

export default Home;