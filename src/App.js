
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
import classic_banner from './Components/Assets/Classic banner.jpg'
import elemental_banner from './Components/Assets/Elemental banner.jpg'
import crystal_banner from './Components/Assets/Crystal banner.jpg'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Shop" element={<Shop/>} />
        <Route path="/Classic Collection" element={<ShopCategory banner={classic_banner} category='Classic Collection'/>} />
        <Route path="/Elemental Collection" element={<ShopCategory banner={elemental_banner} category='Elemental Collection'/>} />
        <Route path="/Crystal Collection" element={<ShopCategory banner={crystal_banner} category='Crystal Collection'/>} />
        <Route path="/product" element={<Product/>}>
          <Route path=":productId" element={<Product/>}/>
        </Route>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/login" element={<LoginSignup/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;
