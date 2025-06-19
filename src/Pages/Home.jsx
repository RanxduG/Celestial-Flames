import React from 'react';
import WelcomeBanner from '../Components/WelcomeBanner/WelcomeBanner';
import FeaturesSection from '../Components/FeaturesSection/FeaturesSection';
import ProductShowcase from '../Components/ProductShowcase/ProductShowcase';
import CustomizationProcess from '../Components/CustomizationProcess/CustomizationProcess';
import TestimonialSlider from '../Components/TestimonialSlider/TestimonialSlider';
import CollectionsShowcase from '../Components/CollectionsShowcase/CollectionsShowcase';

const Home = () => {
  return (
    <div className="home-page">
      <WelcomeBanner />
      <FeaturesSection />
      <CollectionsShowcase />
      <CustomizationProcess />
      <TestimonialSlider />
    </div>
  );
};

export default Home;