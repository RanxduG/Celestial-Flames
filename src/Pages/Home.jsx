import React, {useContext} from 'react';
import { ShopContext} from '../Context/ShopContext';
// import { Link } from 'react-router-dom';
import WelcomeBanner from '../Components/WelcomeBanner/WelcomeBanner';
import CustomizationProcess from '../Components/CustomizationProcess/CustomizationProcess';


const Home = () => {
  return (
    <div>
      <WelcomeBanner />
      <CustomizationProcess/>
    </div>
      

  );
}

export default Home;
