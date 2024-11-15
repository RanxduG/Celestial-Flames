import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignup from './Pages/LoginSignup';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import Footer from './Components/Footer/Footer';
import classic_banner from './Components/Assets/Banners/Classic banner.jpg';
import elemental_banner from './Components/Assets/Banners/Elemental banner.jpg';
import crystal_banner from './Components/Assets/Banners/Crystal banner.jpg';
import ContactUs from './Pages/ContactUs';
import AboutUs from './Pages/AboutUs';
import Checkout from './Pages/Checkout';
import Catalog from './Pages/Catalog';
import ReadyMadeItems from './Pages/ReadyMadeItems';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/Seasonal Collection" element={<ShopCategory banner={classic_banner} category='Seasonal Collection'  />} />
            <Route path="/Elemental Collection" element={<ShopCategory banner={elemental_banner} category='Elemental Collection' />} />
            <Route path="/Crystal Collection" element={<ShopCategory banner={crystal_banner} category='Crystal Collection' />} />
            <Route path="/Classic Collection" element={<ShopCategory banner={classic_banner} category='Classic Collection' />} />
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
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/Catalog" element={<Catalog />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
