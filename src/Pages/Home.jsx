import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';
import WelcomeBanner from '../Components/WelcomeBanner/WelcomeBanner';

const Home = () => {
  const { userDetails } = useContext(ShopContext);

  return (
    <div>
      {userDetails ? (
        <WelcomeBanner />
      ) : (
        <div>
          <h1>Welcome to Celestial Flames</h1>
          <p>Please <Link to='/loginsignup/login'>login</Link> to continue.</p>
        </div>
      )}
    </div>
  );
}

export default Home;
