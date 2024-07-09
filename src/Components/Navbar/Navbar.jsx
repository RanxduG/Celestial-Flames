import React, { useState, useRef, useContext, useEffect } from 'react';
import "./Navbar.css";
import logo from "../Assets/Logo/logo background removed.png";
import shoppingcart from "../Assets/Icons/shopping-cart.jpg";
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from "../Assets/Icons/nav-dropdown.png";
import close_icon from '../Assets/Icons/remove.png';
import user_icon from '../Assets/Icons/user.png';

const Navbar = () => {
    const { getTotalCartItems, userDetails, setUser } = useContext(ShopContext);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
    const menuRef = useRef();
    const navbarRef = useRef();
    const profileDropdownRef = useRef();
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

    const toggleProfileDropdown = () => {
        setIsProfileDropdownVisible(!isProfileDropdownVisible);
    };
    const logout = () => {
        setUser(null);
        setIsProfileDropdownVisible(false);
        window.location.reload();
    };

    return (
        <div className='navbar' ref={navbarRef}>
            <div className="nav-logo">
                <Link to='/Celestial-Flames'><img src={logo} alt="logo" id='mainLogo' /></Link>
                <p>Celestial Flames</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="Menu" />
            <ul ref={menuRef} className={`nav-menu ${isMenuVisible ? 'visible' : ''}`}>
                <li onClick={() => setIsMenuVisible(false)} onClick={() => window.scrollTo(0, 0)}>
                    <Link style={{ textDecoration: 'none' }} to='/Shop'>Shop</Link>
                    {location.pathname === '/Shop' && <hr />}
                </li>
                <li onClick={() => setIsMenuVisible(false)} onClick={() => window.scrollTo(0, 0)}>
                    <Link style={{ textDecoration: 'none' }} to='/Seasonal Collection'>Seasonal Releases</Link>
                    {location.pathname === '/Seasonal%20Collection' && <hr />}
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
                {userDetails ? (
                    <div className='logged-user' onClick={toggleProfileDropdown}>
                        <img src={user_icon} alt="user icon" />
                        <p>{userDetails.name}</p>
                        {isProfileDropdownVisible && (
                            <div className="profile-dropdown" ref={profileDropdownRef}>
                                <Link to='/Celestial-Flames'><button onClick={logout} className="logout-button">Logout</button></Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to='/loginsignup/login'>
                        <button>Login</button>
                    </Link>
                )}
                <Link to='/cart'>
                    <img src={shoppingcart} alt="shopping cart" onClick={()=> window.scroll(0,0)}/>
                </Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    );
}

export default Navbar;
