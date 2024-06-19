import React, { useState, useRef, useContext, useEffect } from 'react';
import "./Navbar.css";
import logo from "../Assets/logo background removed.png";
import shoppingcart from "../Assets/shopping-cart.jpg";
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from "../Assets/nav-dropdown.png";
import close_icon from '../Assets/remove.png';
import user_icon from '../Assets/user.png';

const Navbar = () => {
    const { getTotalCartItems, userDetails } = useContext(ShopContext);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const menuRef = useRef();
    const navbarRef = useRef();
    const location = useLocation();

    const dropdown_toggle = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const handleScroll = () => {
        if (window.scrollY > 5) {
            navbarRef.current.classList.add('navbar-scrolled');
        } else {
            navbarRef.current.classList.remove('navbar-scrolled');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && !navbarRef.current.contains(event.target)) {
                setIsMenuVisible(false);
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
                <Link to='/Celestial-Flames'><img src={logo} alt="logo" id='mainLogo' /></Link>
                <p>Celestial Flames</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="Menu" />
            <ul ref={menuRef} className={`nav-menu ${isMenuVisible ? 'visible' : ''}`}>
                <li onClick={() => setIsMenuVisible(false)}>
                    <Link style={{ textDecoration: 'none' }} to='/Shop'>Shop</Link>
                    {location.pathname === '/Shop' && <hr />}
                </li>
                <li onClick={() => setIsMenuVisible(false)}>
                    <Link style={{ textDecoration: 'none' }} to='/Seasonal Collection'>Seasonal Releases</Link>
                    {location.pathname === '/Seasonal%20Collection' && <hr />}
                </li>
                <li onClick={() => setIsMenuVisible(false)}>
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
                {userDetails ? (
                    <div className='logged-user'>
                        <img src={user_icon} alt="user icon" />
                        <p>{userDetails.name}</p>
                    </div>
                ) : (
                    <Link to='/loginsignup/login'>
                        <button>Login</button>
                    </Link>
                )}
                <Link to='/cart'>
                    <img src={shoppingcart} alt="shopping cart" />
                </Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    );
}

export default Navbar;
