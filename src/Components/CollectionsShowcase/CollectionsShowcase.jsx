import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './CollectionsShowcase.css';
import { ShopContext } from '../../Context/ShopContext';

const CollectionsShowcase = () => {
  const { getStockById } = useContext(ShopContext);
  const [celestialGlowImage, setCelestialGlowImage] = useState('');
  const [twirllingHeartsImage, settwirllingHeartsImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Collection data with initial placeholder images
  const [collections, setCollections] = useState([
    {
      id: 'Soy',
      name: "Luxury Soy Collection",
      description: "Indulge in premium soy wax candles with exotic scents",
      imageUrl: celestialGlowImage, // Placeholder
      totalProducts: 8,
      featured: true
    },
    {
      id: 'Gel',
      name: "Gel Luxe Collection",
      description: "Limited edition candles for every season",
      imageUrl: "https://images.pexels.com/photos/7319294/pexels-photo-7319294.jpeg",
      totalProducts: 6,
      featured: true
    },
    {
      id: "Fusion",
      name: "Fusion Wax Collection",
      description: "Transparent gel wax candles with mesmerizing designs",
      imageUrl: celestialGlowImage,
      totalProducts: 10,
      featured: true
    },
    {
      id: "Budget",
      name: "Budget-Friendly Deals",
      description: "Transparent gel wax candles with mesmerizing designs",
      imageUrl: "https://images.pexels.com/photos/7319294/pexels-photo-7319294.jpeg",
      totalProducts: 10,
      featured: true
    },
    {
      id: "Seasonal",
      name: "Seasonal Candle Delights",
      description: "Transparent gel wax candles with mesmerizing designs",
      imageUrl: twirllingHeartsImage,
      totalProducts: 10,
      featured: true
    },
    {
      id: "Giftset",
      name: "Gift - Ready Collections",
      description: "Transparent gel wax candles with mesmerizing designs",
      imageUrl: "https://images.pexels.com/photos/7319294/pexels-photo-7319294.jpeg",
      totalProducts: 10,
      featured: true
    }
  ]);

  // Fetch the celestial glow image when the component mounts
  useEffect(() => {
    const fetchCelestialGlowImage = async () => {
      try {
        // Get the specific item from your backend
        const CG = getStockById("5");
        const TH = getStockById("4");

        
        if (CG && CG.imageUrl) {
          console.log("Found CelestialGlow item:", CG);
          setCelestialGlowImage(CG.imageUrl);
          
          // Update the first collection with the fetched image
          setCollections(prevCollections => {
            const updatedCollections = [...prevCollections];
            updatedCollections[0] = {
              ...updatedCollections[0],
              imageUrl: CG.imageUrl
            };
            return updatedCollections;
          });
        } else {
          console.error("CelestialGlow item not found or has no image URL");
        }
        if (TH && TH.imageUrl) {
          console.log("Found TwirllingHearts item:", TH);
          settwirllingHeartsImage(TH.imageUrl);
          
          // Update the second collection with the fetched image
          setCollections(prevCollections => {
            const updatedCollections = [...prevCollections];
            updatedCollections[1] = {
              ...updatedCollections[1],
              imageUrl: TH.imageUrl
            };
            return updatedCollections;
          });
        }
        else {
          console.error("TwirllingHearts item not found or has no image URL");
        }
      } catch (error) {
        console.error("Error fetching CelestialGlow image:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCelestialGlowImage();
  }, [getStockById]);

  const [isVisible, setIsVisible] = useState(false);

  // Scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector('.collections-showcase');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check in case component is already in view on load
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className={`collections-showcase ${isVisible ? 'visible' : ''}`}>
      <div className="collections-header">
        <div className="collections-title">
          <h2>Explore Our Collections</h2>
          <p>Discover curated collections of our finest handcrafted candles</p>
        </div>
      </div>
      
      <div className="collections-grid">
        {collections.map((collection, index) => (
          <div 
            key={collection.id} 
            className={`collection-card ${index % 2 === 0 ? 'card-left' : 'card-right'} ${isLoading && index === 0 ? 'loading' : ''}`}
          >
            <div className="collection-image">
              {isLoading && index === 0 ? (
                <div className="image-skeleton"></div>
              ) : (
                <>
                  <img src={collection.imageUrl} alt={collection.name} />
                  <div className="collection-overlay"></div>
                </>
              )}
            </div>
            
            <div className="collection-details">
              <h3>{collection.name}</h3>
              <p>{collection.description}</p>
              <div className="collection-meta">
                <span>{collection.totalProducts} Products</span>
              </div>
              <Link to={`/collection/${collection.id}`} className="view-collection-btn">
                View Collection
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="collections-footer">
        <Link to="/collections" className="view-all-collections">
          View All Collections
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default CollectionsShowcase;