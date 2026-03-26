import React, { useContext, useEffect, useState } from 'react'
import './assets/Home.css' // Create this CSS file for styling
import { ProductContext } from '../services/ApiProducts';
import { ClipLoader } from 'react-spinners';
import Products from './product/Products';
import { CategoryContext } from '../services/ApiCategories';
import { useCart } from './product/CartContext.jsx';
import { Link } from 'react-router-dom';
export default function HomePage() {
  const { addToCart } = useCart();
  const { products } = useContext(ProductContext);
  const { Categories } = useContext(CategoryContext);
  if (products.length === 0) {
    return (
      <div className="loading-screen my-5 d-flex justify-content-center align-items-center">
        <ClipLoader color="#00b207" size={60} />
      </div>
    );
  }
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {

    const targetDate = new Date("March 31, 2026 23:59:59").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const [isSticky, setIsSticky] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    const el = document.querySelector(".scroller");
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      el.style.width = `${(scrollTop / height) * 100}%`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div class="scroller"></div>
      <header className="shopery-header">
        <div className="header-grid">
          <div className="text-content">
            <p className="welcome-tag">WELCOME TO SHOPERY</p>
            <h1 className="main-title">Fresh & Healthy<br />Organic Food</h1>
            <p className="sale-offer">Sale up to <span>30% OFF</span></p>
            <p className="sub-text">Free shipping on all your order. we deliver, you enjoy</p>
            <Link to={'/shopping'} className="shop-btn">
              Shop now
              <span className="arrow"><i class="fa-solid fa-arrow-right"></i></span>
            </Link>
          </div>
          <div className="image-content">
            <img src="../public/images/fruit-basket.png" alt="Fresh fruits and vegetables basket" />
          </div>
        </div>
      </header>

      <section className="features-section">
        <div className="container">
          <div className="features-wrapper">

            <div className="feature-card">
              <img src="../public/images/Icons/shipping-icon.png" alt="Shipping" />
              <div className="info">
                <h4>Free Shipping</h4>
                <p>Free shipping on all your order</p>
              </div>
            </div>

            <div className="feature-card">
              <img src="../public/images/Icons/support-icon.png" alt="Support" />
              <div className="info">
                <h4>Customer Support 24/7</h4>
                <p>Instant access to Support</p>
              </div>
            </div>

            <div className="feature-card">
              <img src="../public/images/Icons/payment-icon.png" alt="Payment" />
              <div className="info">
                <h4>100% Secure Payment</h4>
                <p>We ensure your money is save</p>
              </div>
            </div>

            <div className="feature-card">
              <img src="../public/images/Icons/package-icon.png" alt="Guarantee" />
              <div className="info">
                <h4>Money-Back Guarantee</h4>
                <p>30 Days Money-Back Guarantee</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container-section">
          <h2 className="section-title">Featured Products</h2>
          <div className="title-underline mb-5">
            <span></span>
            <span className="active"></span>
            <span></span>
          </div>

          <div className="row row-row">
            {
              products.slice(3, 7).map((product) => {
                return (
                  <Products key={product.id} product={product} />
                )
              })
            }
          </div>
        </div >
      </section >

      <section className="categorized-section">
        <div className="container-categorized">
          <div className="category-grid">

            {/* Hot Deals */}
            <div className="category-col">
              <h3 className="category-list-title">Hot Deals</h3>
              <div className="mini-list">
                {products.slice(0, 3).map((product) => (
                  <div key={product.id} className="mini-card">
                    <div className="img-box">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="mini-info">
                      <h4>{product.name}</h4>
                      <p className="price">${product.price}</p>
                      <div className="stars">★★★★☆</div>
                    </div>
                    {/* Hover Actions */}
                    <div className="mini-hover-actions">
                      <button className="wishlist-btn">
                        <i class="fa-regular fa-heart"></i>
                      </button>
                      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                        <i class="fa-solid fa-cart-arrow-down"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Seller */}
            <div className="category-col">
              <h3 className="category-list-title">Best Seller</h3>
              <div className="mini-list">
                {products.slice(4, 7).map((product) => (
                  <div key={product.id} className="mini-card">
                    <div className="img-box">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="mini-info">
                      <h4>{product.name}</h4>
                      <p className="price">${product.price}</p>
                      <div className="stars">★★★★☆</div>
                    </div>
                    <div className="mini-hover-actions">
                      <button className="wishlist-btn">
                        <i class="fa-regular fa-heart"></i>
                      </button>
                      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                        <i class="fa-solid fa-cart-arrow-down"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Rated */}
            <div className="category-col">
              <h3 className="category-list-title">Top Rated</h3>
              <div className="mini-list">
                {products.slice(8, 11).map((product) => (
                  <div key={product.id} className="mini-card">
                    <div className="img-box">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="mini-info">
                      <h4>{product.name}</h4>
                      <p className="price">${product.price}</p>
                      <div className="stars">★★★★☆</div>
                    </div>
                    <div className="mini-hover-actions">
                      <button className="wishlist-btn">
                        <i class="fa-regular fa-heart"></i>
                      </button>
                      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                        <i class="fa-solid fa-cart-arrow-down"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Banner (Summer Sale) */}
            <div className="summer-sale-banner">
              <div className="banner-txt">
                <p>SUMMER SALE</p>
                <h2>75% off</h2>
                <a href="/shopping" className="banner-shop-btn">
                  Shop Now <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="top-categories container">
        <div className="section-header text-center">
          <h2 className="section-title">Top Category</h2>
          <div className="title-underline">
            <span></span>
            <span className="active"></span>
            <span></span>
          </div>
        </div>

        <div className="categories-slider-wrapper">

          <div className="categories-grid">
            {
              Categories.map((category) => (
                <div className="category-item-card active">
                  <a href="/shopping" className='nav-link'><div className="cat-icon">
                    <img src={category.image} alt={category.name} />
                  </div>
                    <h4>{category.name}</h4></a>
                </div>
              ))
            }
          </div>
        </div>
      </section>


      <section className="promo-banners container">
        <div className="promo-grid">

          {/* Card 1: Sale of the Month */}
          <div className="promo-card card-blue">
            <div className="promo-content">
              <p className="upper-tag">BEST DEALS</p>
              <h2>Sale of the Month</h2>
              <div className="countdown">
                <div className="time-unit">
                  <span>{String(timeLeft.days).padStart(2, '0')}</span>
                  <p>DAYS</p>
                </div>
                <span className="sep">:</span>
                <div className="time-unit">
                  <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                  <p>HOURS</p>
                </div>
                <span className="sep">:</span>
                <div className="time-unit">
                  <span>{String(timeLeft.mins).padStart(2, '0')}</span>
                  <p>MINS</p>
                </div>
                <span className="sep">:</span>
                <div className="time-unit">
                  <span>{String(timeLeft.secs).padStart(2, '0')}</span>
                  <p>SECS</p>
                </div>
              </div>
              <a href='/shopping' className="promo-btn">Shop Now <span className="arrow"><i class="fa-solid fa-arrow-right"></i></span></a>
            </div>
          </div>

          {/* Card 2: Low-Fat Meat */}
          <div className="promo-card card-black">
            <div className="promo-content">
              <p className="upper-tag">85% FAT FREE</p>
              <h2>Low-Fat Meat</h2>
              <p className="price-tag">Started at <span>$79.99</span></p>
              <a href='/shopping' className="promo-btn">Shop Now <span className="arrow"><i class="fa-solid fa-arrow-right"></i></span></a>
            </div>
          </div>

          {/* Card 3: Fresh Fruit */}
          <div className="promo-card card-yellow">
            <div className="promo-content">
              <p className="upper-tag">SUMMER SALE</p>
              <h2>100% Fresh Fruit</h2>
              <p className="discount-pill">Up to <span>64% OFF</span></p>
            </div>
            <a href='/shopping' className="promo-btn">Shop Now <span className="arrow"><i class="fa-solid fa-arrow-right"></i></span></a>
          </div>

        </div>
      </section>

      <section className="instagram-section container">
        <div className="section-header text-center">
          <h2 className="instagram-title">Follow us on Instagram</h2>
          <div className="title-underline">
            <span></span>
            <span className="active"></span>
            <span></span>
          </div>
        </div>

        <div className="instagram-photos-grid">
          {/* كل صورة رابط منفصل */}
          {/* تأكد من تحديث href="رابط صفحتك هنا" */}

          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="insta-photo-card">
            <img src="../public/images/SocialMedia/1.png" alt="Fresh tomatoes" className="insta-img" />
            <div className="insta-overlay">
              <i class="fa-brands fa-facebook-f insta-icon"></i>
            </div>
          </a>

          <a href="https://www.linkedin.com/in/filopateer-nabil-developer" target="_blank" rel="noopener noreferrer" className="insta-photo-card">
            <img src="../public/images/SocialMedia/2.png" alt="Leafy greens" className="insta-img" />
            <div className="insta-overlay">
              <i class="fa-brands fa-linkedin-in insta-icon"></i>
            </div>
          </a>

          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="insta-photo-card">
            <img src="../public/images/SocialMedia/3.png" alt="Fresh vegetables" className="insta-img" />
            <div className="insta-overlay">
              <i class="fa-brands fa-twitter insta-icon"></i>
            </div>
          </a>

          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="insta-photo-card">
            <img src="../public/images/SocialMedia/4.png" alt="Peppers" className="insta-img" />
            <div className="insta-overlay">
              <i class="fa-regular fa-envelope insta-icon"></i>
            </div>
          </a>

          <a href="https://github.com/Filopateernabil25" target="_blank" rel="noopener noreferrer" className="insta-photo-card">
            <img src="../public/images/SocialMedia/5.png" alt="Coconut" className="insta-img" />
            <div className="insta-overlay">
              <i class="fa-brands fa-github insta-icon"></i>
            </div>
          </a>

          <a href="https://wa.me/201270668295" target="_blank" rel="noopener noreferrer" className="insta-photo-card">
            <img src="../public/images/SocialMedia/6.png" alt="Various vegetables" className="insta-img" />
            <div className="insta-overlay">
              <i class="fa-solid fa-phone insta-icon"></i>
            </div>
          </a>

        </div>
      </section>

    </>
  );
}
