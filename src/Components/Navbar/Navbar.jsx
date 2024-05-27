import React, { useState, useContext } from 'react';
import "./Navbar.css";
import logo from "../Assets/Celestial flames logo 2.0.jpg";
import shoppingcart from "../Assets/shopping-cart.jpg";
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
    const {getTotalCartItems} = useContext(ShopContext)
    const [menu, setMenu] = useState("main")


  return (
    <div className='navbar'>
        <div className="nav-logo">
            <Link to='/'><img onClick={()=>{setMenu("main")}} src={logo} alt="logo" id='mainLogo'/></Link>
            <p>Celestial Flames</p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none'}} to='/shop'>Shop</Link>{menu ==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("classic")}}><Link style={{textDecoration:'none'}} to='/classic'>Classic</Link>{menu ==="classic"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("cement")}}><Link style={{textDecoration:'none'}} to='/cement'>Elemental</Link>{menu ==="cement"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("glass")}}><Link style={{textDecoration:'none'}} to='/glass'>Crystal</Link>{menu ==="glass"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            <Link onClick={()=>{setMenu("login")}} to='/login'><button>Login</button></Link>
            <Link onClick={()=>{setMenu("cart")}} to='/cart'><img src={shoppingcart} alt="shopping cart" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
        
    </div>
  );
}

export default Navbar;