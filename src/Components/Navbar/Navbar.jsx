import React, { useState, useRef, useContext, useEffect } from 'react';
import "./Navbar.css";
// import logo from "../Assets/Logo/Candle New Logo 2.0 2025 Plain cropped.png";
import shoppingcart from "../Assets/Icons/shopping-cart.jpg";
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from "../Assets/Icons/nav-dropdown.png";
import close_icon from '../Assets/Icons/remove.png';
// import user_icon from '../Assets/Icons/user.png';
import { getLogo } from '../../Context/api';

const Navbar = () => {
    const { getTotalCartItems } = useContext(ShopContext);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
    const menuRef = useRef();
    const navbarRef = useRef();
    const profileDropdownRef = useRef();
    const location = useLocation();
      const [logo, setLogo] = useState('')
      useEffect(() => {
          const fetchLogo = async () => {
              try {
                  const { data } = await getLogo()
                  console.log(data)
                  setLogo(data.logoUrl)
              } catch (error) {
                  console.log(error)
              }
          }
          fetchLogo()
      }, [])

    const dropdown_toggle = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current && !menuRef.current.contains(event.target) &&
                !navbarRef.current.contains(event.target) &&
                (!profileDropdownRef.current || !profileDropdownRef.current.contains(event.target))
            ) {
                setIsMenuVisible(false);
                setIsProfileDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='navbar' ref={navbarRef}>
            <div className="nav-logo">
                <Link to='/'><img src={logo} alt="logo" id='mainLogo' /></Link>
                <div className="nav-logo-text">
                    <h1>Celestial Flames</h1>
                    <p>Share the light</p>
                </div>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="Menu" />
            <ul ref={menuRef} className={`nav-menu ${isMenuVisible ? 'visible' : ''}`}>
                <li onClick={() => setIsMenuVisible(false)} onClick={() => window.scrollTo(0, 0)}>
                    <Link style={{ textDecoration: 'none' }} to='/Shop'>Shop</Link>
                    {location.pathname === '/Shop' && <hr />}
                </li>
                <li onClick={() => setIsMenuVisible(false)} onClick={() => window.scrollTo(0, 0)}>
                    <Link style={{ textDecoration: 'none' }} to='/Seasonal'>Seasonal Releases</Link>
                    {location.pathname === '/Seasonal' && <hr />}
                </li>
                <li onClick={() => setIsMenuVisible(false)} onClick={() => window.scrollTo(0, 0)}>
                    <Link style={{ textDecoration: 'none' }} to='/Catalog'>Catalog</Link>
                    {location.pathname === '/Catalog' && <hr />}
                </li>
                {isMenuVisible && (
                    <li className="nav-close-button" onClick={() => setIsMenuVisible(false)}>
                        <img src={close_icon} alt="Close menu" />
                    </li>
                )}
            </ul>
            <div className="nav-login-cart">
                <Link to='/cart'>
                    <img src={shoppingcart} alt="shopping cart" onClick={()=> window.scroll(0,0)}/>
                </Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    );
}

export default Navbar;
