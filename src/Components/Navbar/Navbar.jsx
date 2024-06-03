import React, { useState, useRef, useContext, useEffect } from 'react';
import "./Navbar.css";
import logo from "../Assets/logo background removed.png";
import shoppingcart from "../Assets/shopping-cart.jpg";
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from "../Assets/nav-dropdown.png";
import close_icon from '../Assets/remove.png'; // Add your close icon image

const Navbar = () => {
    const { getTotalCartItems } = useContext(ShopContext);
    const [menu, setMenu] = useState("main");
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const menuRef = useRef();
    const navbarRef = useRef();

    const dropdown_toggle = (e) => {
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
                <Link to='/'><img onClick={() => { setMenu("main") }} src={logo} alt="logo" id='mainLogo' /></Link>
                <p>Celestial Flames</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="Menu" />
            <ul ref={menuRef} className={`nav-menu ${isMenuVisible ? 'visible' : ''}`}>
                <li onClick={() => { setMenu("shop"); setIsMenuVisible(false); }}><Link style={{ textDecoration: 'none' }} to='/Shop'>Shop</Link>{menu === "shop" ? <hr /> : null}</li>
                <li onClick={() => { setMenu("classic"); setIsMenuVisible(false); }}><Link style={{ textDecoration: 'none' }} to='/Classic Collection'>Classic</Link>{menu === "classic" ? <hr /> : null}</li>
                <li onClick={() => { setMenu("cement"); setIsMenuVisible(false); }}><Link style={{ textDecoration: 'none' }} to='/Elemental Collection'>Elemental</Link>{menu === "cement" ? <hr /> : null}</li>
                <li onClick={() => { setMenu("glass"); setIsMenuVisible(false); }}><Link style={{ textDecoration: 'none' }} to='/Crystal Collection'>Crystal</Link>{menu === "glass" ? <hr /> : null}</li>
                {isMenuVisible && (
                    <li className="nav-close-button" onClick={() => setIsMenuVisible(false)}>
                        <img src={close_icon} alt="Close menu" />
                    </li>
                )}
            </ul>
            <div className="nav-login-cart">
                <Link onClick={() => { setMenu("login") }} to='/loginsignup/login'><button>Login</button></Link>
                <Link onClick={() => { setMenu("cart") }} to='/cart'><img src={shoppingcart} alt="shopping cart" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    );
}

export default Navbar;
