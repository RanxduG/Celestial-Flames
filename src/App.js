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
import ReadyMadeItems from './Pages/ReadyMadeItems';
import { useContext } from 'react';
import { ShopContext } from './Context/ShopContext';

function App() {
  const { categoryBanners } = useContext(ShopContext);
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/Collection/Seasonal" element={<ShopCategory banner={categoryBanners[0]} category='Seasonal Collection'  />} />
            <Route path="/Collection/Classic" element={<ShopCategory banner={categoryBanners[0]} category='Mold Collection' />} />
            <Route path="/Collection/Gel" element={<ShopCategory banner={categoryBanners[1]} category='Glass Collection' />} />
            <Route path="/Others" element={<ShopCategory banner={categoryBanners[2]} category='Other Collection' />} />
            <Route path="/Tins" element={<ShopCategory banner={categoryBanners[3]} category='Tin Collection' />} />
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
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
