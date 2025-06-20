import React, { useContext, useState, useEffect } from 'react';
import './CatalogItems.css';
import { ShopContext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter, ChevronDown, ChevronUp, FileText, Download, Eye, X } from 'lucide-react';

const CatalogItems = () => {
    const { allProducts } = useContext(ShopContext);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeFilters, setActiveFilters] = useState({
        season: [],
        waxType: []
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [expandedSections, setExpandedSections] = useState({
        season: true,
        waxType: true
    });
    const [showPdfPreview, setShowPdfPreview] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);

    // Seasons and wax types for filters
    const seasons = ['Christmas', 'Valentine', 'Halloween', 'Summer', 'Spring'];
    const waxTypes = ['Soy Wax', 'Gel Wax'];

    // PDF catalog path - corrected to use public folder
    const catalogPdfPath = '/Assets/Catalog/Celestial Flames Product Catalog Presentation.pdf';

    // Initialize products when data is loaded
    useEffect(() => {
        if (allProducts && allProducts.length > 0) {
            setProducts(allProducts);
            setFilteredProducts(allProducts);
            setLoading(false);
        }
    }, [allProducts]);

    // Close filter on outside click for mobile
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isFilterOpen && window.innerWidth <= 768) {
                const filterSidebar = document.querySelector('.catalog-filters');
                const filterToggle = document.querySelector('.mobile-filter-toggle');
                
                if (filterSidebar && !filterSidebar.contains(event.target) && 
                    filterToggle && !filterToggle.contains(event.target)) {
                    setIsFilterOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFilterOpen]);

    // Get all unique categories including "All"
    const getAllCategories = () => {
        if (!allProducts) return ['All'];
        
        const uniqueCategories = [...new Set(allProducts.map(product => product.category))];
        return ['All', ...uniqueCategories];
    };

    // Handle category filter
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        applyFilters(category, activeFilters);
    };

    // Toggle filter section expansion
    const toggleSection = (section) => {
        setExpandedSections({
            ...expandedSections,
            [section]: !expandedSections[section]
        });
    };

    // Handle filter changes
    const handleFilterChange = (type, value) => {
        let updatedFilters;
        
        if (activeFilters[type].includes(value)) {
            // Remove filter if already selected
            updatedFilters = {
                ...activeFilters,
                [type]: activeFilters[type].filter(item => item !== value)
            };
        } else {
            // Add new filter
            updatedFilters = {
                ...activeFilters,
                [type]: [...activeFilters[type], value]
            };
        }
        
        setActiveFilters(updatedFilters);
        applyFilters(activeCategory, updatedFilters);
    };

    // Apply all active filters
    const applyFilters = (category, filters) => {
        let result = [...products];
        
        // Apply category filter
        if (category !== 'All') {
            result = result.filter(product => product.category === category);
        }
        
        // Apply season filter
        if (filters.season.length > 0) {
            result = result.filter(product => 
                filters.season.includes(product.season)
            );
        }
        
        // Apply wax type filter (assuming products have waxType property)
        if (filters.waxType.length > 0) {
            result = result.filter(product => {
                // This is a placeholder - adjust according to your data structure
                const productWaxType = product.waxType || 'Soy Wax'; // Default value
                return filters.waxType.includes(productWaxType);
            });
        }
        
        setFilteredProducts(result);
    };

    // Clear all filters
    const clearAllFilters = () => {
        const clearedFilters = {
            season: [],
            waxType: []
        };
        setActiveFilters(clearedFilters);
        setActiveCategory('All');
        applyFilters('All', clearedFilters);
    };

    // Handle mobile filter toggle
    const handleMobileFilterToggle = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    // Handle PDF preview
    const handlePdfPreview = async () => {
        setPdfLoading(true);
        try {
            // Check if PDF exists
            const response = await fetch(catalogPdfPath, { method: 'HEAD' });
            if (response.ok) {
                setShowPdfPreview(true);
            } else {
                alert('PDF catalog is currently unavailable. Please try downloading instead.');
            }
        } catch (error) {
            console.error('Error checking PDF:', error);
            alert('Error loading PDF preview. Please try downloading the catalog instead.');
        } finally {
            setPdfLoading(false);
        }
    };

    // Handle PDF download
    const handlePdfDownload = async () => {
        setPdfLoading(true);
        try {
            const response = await fetch(catalogPdfPath);
            if (!response.ok) {
                throw new Error('PDF not found');
            }
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Celestial Flames Product Catalog.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading PDF:', error);
            alert('Error downloading PDF. Please try again later.');
        } finally {
            setPdfLoading(false);
        }
    };

    // Get seasonal indicator color
    const getSeasonalColor = (season) => {
        const seasonalColors = {
            Christmas: '#0f5132',
            Valentine: '#d63384',
            Halloween: '#6f42c1',
            Summer: '#fd7e14',
            Spring: '#20c997',
            None: null
        };
        return seasonalColors[season] || null;
    };

    // Render loading skeleton
    const renderSkeleton = () => {
        return Array(6).fill().map((_, index) => (
            <div key={index} className="catalog-item-card skeleton">
                <div className="catalog-item-image skeleton-image"></div>
                <div className="catalog-item-content">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-button"></div>
                </div>
            </div>
        ));
    };

    return (
        <div className="catalog-container">
            <div className="catalog-header">
                <h1>Our Candle Collection</h1>
                <p>Explore our handcrafted range of premium candles made with pure soy and gel waxes.</p>
            </div>
            
            <div className="catalog-content">
                {/* Filter sidebar */}
                <div className={`catalog-filters ${isFilterOpen ? 'open' : ''}`}>
                    <div className="filters-header">
                        <h3>Filters</h3>
                        <button className="clear-filters" onClick={clearAllFilters}>Clear All</button>
                    </div>
                    
                    {/* Filter sections */}
                    <div className="filter-section">
                        <div className="filter-section-header" onClick={() => toggleSection('season')}>
                            <h4>Season</h4>
                            {expandedSections.season ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                        {expandedSections.season && (
                            <div className="catalog-filter-options">
                                {seasons.map(season => (
                                    <label key={season} className="filter-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={activeFilters.season.includes(season)}
                                            onChange={() => handleFilterChange('season', season)}
                                        />
                                        <span className="checkbox-label">
                                            {season}
                                            {getSeasonalColor(season) && (
                                                <span 
                                                    className="color-indicator" 
                                                    style={{backgroundColor: getSeasonalColor(season)}}
                                                ></span>
                                            )}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div className="filter-section">
                        <div className="filter-section-header" onClick={() => toggleSection('waxType')}>
                            <h4>Wax Type</h4>
                            {expandedSections.waxType ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                        {expandedSections.waxType && (
                            <div className="catalog-filter-options">
                                {waxTypes.map(type => (
                                    <label key={type} className="filter-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={activeFilters.waxType.includes(type)}
                                            onChange={() => handleFilterChange('waxType', type)}
                                        />
                                        <span className="checkbox-label">{type}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* PDF Catalog Download Section */}
                    <div className="pdf-catalog-section">
                        <div className="pdf-catalog-header">
                            <FileText size={20} />
                            <h4>Product Catalog</h4>
                        </div>
                        <p className="pdf-catalog-description">
                            Download our complete product catalog for offline viewing
                        </p>
                        <div className="pdf-catalog-actions">
                            <button 
                                className="pdf-preview-btn"
                                onClick={handlePdfPreview}
                                disabled={pdfLoading}
                                title="Preview PDF"
                            >
                                <Eye size={16} />
                                {pdfLoading ? 'Loading...' : 'Preview'}
                            </button>
                            <button 
                                className="pdf-download-btn"
                                onClick={handlePdfDownload}
                                disabled={pdfLoading}
                                title="Download PDF"
                            >
                                <Download size={16} />
                                {pdfLoading ? 'Downloading...' : 'Download'}
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="catalog-main">
                    {/* Mobile filter toggle */}
                    <button 
                        className="mobile-filter-toggle" 
                        onClick={handleMobileFilterToggle}
                    >
                        <Filter size={18} />
                        {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
                    </button>
                    
                    {/* Category tabs */}
                    <div className="catalog-categories">
                        {getAllCategories().map(category => (
                            <button
                                key={category}
                                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                                onClick={() => handleCategoryChange(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    
                    {/* Results count */}
                    <div className="results-count">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                    </div>
                    
                    {/* Product grid */}
                    <div className="catalog-grid">
                        {loading ? (
                            renderSkeleton()
                        ) : filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <div key={product.id} className="catalog-item-card">
                                    {product.season !== 'None' && (
                                        <div 
                                            className="seasonal-tag"
                                            style={{
                                                backgroundColor: getSeasonalColor(product.season) || '#6c757d'
                                            }}
                                        >
                                            {product.season}
                                        </div>
                                    )}
                                    <div className="catalog-item-image">
                                        <img src={product.img1Url} alt={product.name} />
                                        <div className="hover-overlay">
                                            <Link 
                                                to={`/product?productId=${product.id}`} 
                                                onClick={() => window.scrollTo(0, 0)}
                                                className="view-details-btn"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="catalog-item-content">
                                        <h3>{product.name}</h3>
                                        <p className="product-category">{product.category}</p>
                                        <p className="product-description">{
                                            product.description.length > 100 
                                                ? product.description.substring(0, 100) + '...' 
                                                : product.description
                                        }</p>
                                        <Link 
                                            to={`/product?productId=${product.id}`} 
                                            onClick={() => window.scrollTo(0, 0)}
                                            className="customize-link"
                                        >
                                            Customize This Design <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div> 
                            ))
                        ) : (
                            <div className="no-products-found">
                                <h3>No products found</h3>
                                <p>Try changing your filters or explore our other categories</p>
                                <button onClick={clearAllFilters} className="reset-filters-btn">
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* PDF Preview Modal */}
            {showPdfPreview && (
                <div className="pdf-preview-modal">
                    <div className="pdf-modal-backdrop" onClick={() => setShowPdfPreview(false)}></div>
                    <div className="pdf-modal-content">
                        <div className="pdf-modal-header">
                            <h3>Product Catalog Preview</h3>
                            <button 
                                className="pdf-modal-close"
                                onClick={() => setShowPdfPreview(false)}
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="pdf-modal-body">
                            <iframe
                                src={catalogPdfPath}
                                title="PDF Preview"
                                width="100%"
                                height="100%"
                                style={{ border: 'none' }}
                            />
                        </div>
                        <div className="pdf-modal-footer">
                            <button 
                                className="pdf-download-btn"
                                onClick={handlePdfDownload}
                                disabled={pdfLoading}
                            >
                                <Download size={16} />
                                {pdfLoading ? 'Downloading...' : 'Download PDF'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CatalogItems;