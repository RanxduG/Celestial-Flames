import React from 'react';
import WelcomeBanner from '../Components/WelcomeBanner/WelcomeBanner';
import FeaturesSection from '../Components/FeaturesSection/FeaturesSection';
import CustomizationProcess from '../Components/CustomizationProcess/CustomizationProcess';
import TestimonialSlider from '../Components/TestimonialSlider/TestimonialSlider';
import CollectionsShowcase from '../Components/CollectionsShowcase/CollectionsShowcase';

const Home = () => {
  return (
    <div className="home-page">
      <WelcomeBanner />
      <TestimonialSlider />
      <FeaturesSection />
      <CollectionsShowcase />
      <CustomizationProcess />
    </div>
  );
};

export default Home;