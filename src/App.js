import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignup from './Pages/LoginSignup';
import Shop from './Pages/ShopTest';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import Footer from './Components/Footer/Footer';
// import classic_banner from './Components/Assets/Banners/Classic banner.jpg';
// import elemental_banner from './Components/Assets/Banners/Elemental banner.jpg';
// import crystal_banner from './Components/Assets/Banners/Crystal banner.jpg';
import ContactUs from './Pages/ContactUs';
import AboutUs from './Pages/AboutUs';
import Catalog from './Pages/Catalog';
import CandleCare from './Pages/CandleCare';
import AboutCandles from './Pages/AboutCandles';
import ReadyMadeItems from './Pages/ReadyMadeItems';
import { useContext } from 'react';
import { ShopContext } from './Context/ShopContext';

function App() {
  // const { categoryBanners } = useContext(ShopContext);
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/collection/Gel" element={<ShopCategory collection='Gel Wax'  />} />
          <Route path="/collection/Soy" element={<ShopCategory collection='Soy Wax' />} />
          <Route path="/collection/Fusion" element={<ShopCategory collection='Fusion' />} />
          <Route path="/collection/Budget" element={<ShopCategory collection='budget' />} />
          <Route path="/collection/Seasonal" element={<ShopCategory collection='seasonal' />} />
          <Route path="/collection/Giftset" element={<ShopCategory collection='giftset' />} />
          <Route path="/product">
            <Route index element={<Product />} />
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/readymade">
            <Route index element={<ReadyMadeItems />} />
            <Route path=":productId" element={<ReadyMadeItems />} />
          </Route>

          <Route path="/cart" element={<Cart />} />
          <Route path="/loginsignup">
            <Route index element={<LoginSignup />} />
            <Route path=":state" element={<LoginSignup />} />
          </Route>
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/Catalog" element={<Catalog />} />
          <Route path="/CandleCare" element={<CandleCare />} />
          <Route path="/AboutCandles" element={<AboutCandles />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
