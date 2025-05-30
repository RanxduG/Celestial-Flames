import React, { useState, useRef, useContext, useEffect } from 'react';
import "./Navbar.css";
// import logo from "../Assets/Logo/Candle New Logo 2.0 2025 Plain cropped.png";
// import shoppingcart from "../Assets/Icons/shopping-cart.jpg";
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
        console.log('Menu toggle clicked, current state:', isMenuVisible); // Debug log
        setIsMenuVisible(!isMenuVisible);
    };

    const closeMenu = () => {
        setIsMenuVisible(false);
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

    // Add body scroll lock when menu is open (mobile)
    useEffect(() => {
        if (isMenuVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuVisible]);

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
                {isMenuVisible && (
                    <div className="nav-close-button" onClick={closeMenu}>
                        <img src={close_icon} alt="Close menu" />
                    </div>
                )}
                <li style={{'--item-index': 0}} onClick={() => { closeMenu(); window.scrollTo(0, 0); }}>
                    <Link style={{ textDecoration: 'none' }} to='/Shop'>Shop</Link>
                </li>
                <li style={{'--item-index': 2}} onClick={() => { closeMenu(); window.scrollTo(0, 0); }}>
                    <Link style={{ textDecoration: 'none' }} to='/Catalog'>Catalog</Link>
                </li>
                <li style={{'--item-index': 1}} onClick={() => { closeMenu(); window.scrollTo(0, 0); }}>
                    <Link style={{ textDecoration: 'none' }} to='/bulk'>Bulk Order</Link>
                </li>
            </ul>
            {isMenuVisible && <div className="menu-overlay" onClick={closeMenu}></div>}
            <div className="nav-login-cart">
                <Link to='/cart'>
                    <svg 
                        className="nav-cart-icon" 
                        width="28" 
                        height="28" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        onClick={()=> window.scroll(0,0)}
                    >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="m1 1 4 4 0 0 .39 2.44M7 13h13l4-8H5.12"></path>
                    </svg>
                </Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    );
}

export default Navbar;