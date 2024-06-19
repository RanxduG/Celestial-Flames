import React from 'react';
// import { ShopContext } from '../Context/ShopContext';
// import { Link } from 'react-router-dom';
import WelcomeBanner from '../Components/WelcomeBanner/WelcomeBanner';
import CustomizationProcess from '../Components/CustomizationProcess/CustomizationProcess';


const Home = () => {
  // const { userDetails } = useContext(ShopContext);

  return (
    <div>
      <WelcomeBanner />
      <CustomizationProcess/>
      
    </div>
      

  );
}

export default Home;
