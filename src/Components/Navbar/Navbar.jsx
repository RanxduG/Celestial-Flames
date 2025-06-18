import React, { useState, useEffect, useContext } from 'react';
import "./Navbar.css";
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { getLogo } from '../../Context/api';

const Navbar = () => {
    const { getTotalCartItems } = useContext(ShopContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [logo, setLogo] = useState('');
    const location = useLocation();

    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const { data } = await getLogo();
                setLogo(data.logoUrl);
            } catch (error) {
                console.log(error);
            }
        };
        fetchLogo();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        window.scrollTo(0, 0);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('.cf-navbar')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMenuOpen]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    // Helper function to check if a path is active
    const isActive = (path) => {
        const currentPath = location.pathname.toLowerCase();
        const checkPath = path.toLowerCase();
        
        // For home page
        if (checkPath === '/') {
            return currentPath === '/';
        }
        
        // For other pages, check if the current path starts with the check path
        // This handles cases like /shop/ and /shop
        return currentPath === checkPath || 
               currentPath === checkPath + '/' || 
               currentPath === checkPath.slice(0, -1) ||
               (checkPath.endsWith('/') && currentPath === checkPath.slice(0, -1));
    };

    return (
        <nav className="cf-navbar">
            <div className="cf-navbar-container">
                {/* Logo Section */}
                <Link to="/" className="cf-logo" onClick={closeMenu}>
                    <img src={logo} alt="Celestial Flames" className="cf-logo-img" />
                    <div className="cf-logo-text">
                        <h1>Celestial Flames</h1>
                        <span>Share the light</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <ul className="cf-nav-links">
                    <li>
                        <Link 
                            to="/Shop" 
                            onClick={closeMenu}
                            className={isActive('/shop') ? 'cf-nav-active' : ''}
                        >
                            Shop
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/Catalog" 
                            onClick={closeMenu}
                            className={isActive('/catalog') ? 'cf-nav-active' : ''}
                        >
                            Catalog
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/bulk" 
                            onClick={closeMenu}
                            className={isActive('/bulk') ? 'cf-nav-active' : ''}
                        >
                            Bulk Order
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/aboutus" 
                            onClick={closeMenu}
                            className={isActive('/aboutus') ? 'cf-nav-active' : ''}
                        >
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/contactus" 
                            onClick={closeMenu}
                            className={isActive('/contactus') ? 'cf-nav-active' : ''}
                        >
                            Contact Us
                        </Link>
                    </li>
                </ul>

                {/* Cart and Mobile Menu */}
                <div className="cf-navbar-right">
                    {/* Cart */}
                    <Link to="/cart" className="cf-cart" onClick={closeMenu}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="m1 1 4 4 0 0 .39 2.44M7 13h13l4-8H5.12"></path>
                        </svg>
                        {getTotalCartItems() > 0 && (
                            <span className="cf-cart-count">{getTotalCartItems()}</span>
                        )}
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button 
                        className={`cf-menu-toggle ${isMenuOpen ? 'cf-menu-open' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`cf-mobile-menu ${isMenuOpen ? 'cf-mobile-menu-open' : ''}`}>
                <div className="cf-mobile-menu-content">
                    <Link 
                        to="/Shop" 
                        onClick={closeMenu}
                        className={isActive('/shop') ? 'cf-nav-active' : ''}
                    >
                        Shop
                    </Link>
                    <Link 
                        to="/Catalog" 
                        onClick={closeMenu}
                        className={isActive('/catalog') ? 'cf-nav-active' : ''}
                    >
                        Catalog
                    </Link>
                    <Link 
                        to="/bulk" 
                        onClick={closeMenu}
                        className={isActive('/bulk') ? 'cf-nav-active' : ''}
                    >
                        Bulk Order
                    </Link>
                    <Link 
                        to="/aboutus" 
                        onClick={closeMenu}
                        className={isActive('/aboutus') ? 'cf-nav-active' : ''}
                    >
                        About Us
                    </Link>
                    <Link 
                        to="/contactus" 
                        onClick={closeMenu}
                        className={isActive('/contactus') ? 'cf-nav-active' : ''}
                    >
                        Contact Us
                    </Link>
                </div>
            </div>

            {/* Mobile Overlay */}
            {isMenuOpen && <div className="cf-mobile-overlay" onClick={closeMenu}></div>}
        </nav>
    );
};

export default Navbar;