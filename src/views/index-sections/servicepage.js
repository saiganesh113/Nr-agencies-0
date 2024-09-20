import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox, faScrewdriverWrench, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Corrected import

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [repairs, setRepairs] = useState([]);
  const [installations, setInstallations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate(); // Corrected use of navigate

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const fetchData = async () => {
    try {
      const [
        servicesResponse,
        repairsResponse,
        installationsResponse,
        notificationsResponse,
      ] = await Promise.all([
        axios.get('https://nr-agencies-0-api.onrender.com/api/services'),
        axios.get('https://nr-agencies-0-api.onrender.com/api/repairs'),
        axios.get('https://nr-agencies-0-api.onrender.com/api/installations'),
        axios.get('https://nr-agencies-0-api.onrender.com/api/notifications'),
      ]);

      setServices(servicesResponse.data);
      setRepairs(repairsResponse.data);
      setInstallations(installationsResponse.data);
      setNotifications(notificationsResponse.data);

      setAllItems([
        ...servicesResponse.data,
        ...repairsResponse.data,
        ...installationsResponse.data,
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToCart = (item) => {
    console.log('Add to cart:', item);
  };

  return (
    <div className="service-section mb-4">
      <h2>AC Repair & Services</h2>
      <p>#1 AC Installation, Repair & Services</p>
      <div className="rating mb-2">⭐⭐⭐⭐⭐ (6.75M Bookings)</div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="service-info p-3 bg-light">
              <div className="row-1">
                <div>Certified Services & 30 days Warranty</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-info p-3 bg-light">
              <div className="row-2">
                <div>All Offers & Discounts</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-info p-3 bg-light">
              <div className="row-3">
                <div>Cashback up to 25%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Menu Bar */}
      <div className="container mt-5">
        <div className="floating-menu-container">
          <div className="menu-button-container">
            <button
              className="btn btn-primary floating-menu"
              id="menuButton"
              onClick={toggleMenu}
            >
              Menu
            </button>
          </div>
          <div className={`floating-menu-bar ${menuOpen ? 'show' : ''}`}>
            <Link
              to="service-section"
              smooth={true}
              duration={500}
              className="menu-option"
              onClick={toggleMenu}
            >
              Service <FontAwesomeIcon icon={faToolbox} className="ms-2" />
            </Link>
            <Link
              to="repair-section"
              smooth={true}
              duration={500}
              className="menu-option"
              onClick={toggleMenu}
            >
              Repair <FontAwesomeIcon icon={faScrewdriverWrench} className="ms-2" />
            </Link>
            <Link
              to="install-section"
              smooth={true}
              duration={500}
              className="menu-option"
              onClick={toggleMenu}
            >
              Install <FontAwesomeIcon icon={faPlus} className="ms-2" />
            </Link>
          </div>
        </div>

        {/* Service Section */}
        <div id="service-section" className="d-flex justify-content-between align-items-center mb-2">
        <h2 style={{ fontSize: '2.5rem' }}>Service</h2>
        <a href="#service-section" className="text-primary">Know more</a>
      </div>
      <div className="row">
        {services.map((service) => (
          <div className="col-md-6 mb-4" key={service.id}>
            <div className="card h-100">
              <div className="card-body d-flex align-items-center justify-content-between">
                {/* Text Section */}
                <div>
                  <h5 className="card-title">{service.name}</h5>
                  <p className="card-text">Type: {service.type}</p>
                  <p className="card-text">Price: ₹{service.price}</p>
                  <p className="card-text">Discount: {service.discount}</p>
                  <div className="d-flex align-items-center mb-2">
                    <svg width="16" height="16" fill="#07794C">
                      <path d="M2 2.5a2.5 2.5 0 015 0V4h2V2.5a2.5 2.5 0 015 0V4h1.25A2.75 2.75 0 0118 6.75v10.5A2.75 2.75 0 0115.25 20H2.75A2.75 2.75 0 010 17.25V6.75A2.75 2.75 0 012.75 4H4V2.5zm3 0a1 1 0 10-2 0V4h2V2.5zm8 0a1 1 0 10-2 0V4h2V2.5zM2.75 6a.75.75 0 00-.75.75V17.25c0 .414.336.75.75.75h12.5a.75.75 0 00.75-.75V6.75a.75.75 0 00-.75-.75H2.75z" />
                    </svg>
                    <p className="mb-0 ms-2">{service.technology}</p>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <svg width="16" height="16" fill="#07794C">
                      <path d="M7.25 4h-2.5v-.5A.75.75 0 003 4v.5H2.25A2.25 2.25 0 000 6.75v6A2.25 2.25 0 002.25 15h7.5A2.25 2.25 0 0012 12.75v-6A2.25 2.25 0 009.75 4H9V2.25A2.25 2.25 0 006.75 0h-1.5A2.25 2.25 0 003 2.25V4zm1-1.75a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25V4h-2V2.25zM1.5 6.75a.75.75 0 01.75-.75h7.5a.75.75 0 01.75.75V9H1.5V6.75zM1.5 10h9v2.75a.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V10zm3.25 1.25a.25.25 0 00-.25.25v.5a.25.25 0 00.25.25h2.5a.25.25 0 00.25-.25v-.5a.25.25 0 00-.25-.25h-2.5z" />
                    </svg>
                    <p className="mb-0 ms-2">Warranty: {service.warranty}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button
                      style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                      onClick={() => handleAddToCart(service)}
                    >
                      Add to Cart
                    </Button>
                    <span className="text-muted">Estimated Time: {service.time}</span>
                  </div>
                </div>

                {/* Image Section */}
                <img
                  src={`${process.env.PUBLIC_URL}${service.image}`}
                  alt={service.name}
                  style={{ height: '250px', width: '200px', objectFit: 'cover', marginLeft: '20px' }}
                />
              </div>
              <div className="card-footer text-center bg-light p-2">
                <large className="text-muted">Price: ₹{service.price}</large>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br/>

        {/* Repair Section */}
        <div id="repair-section" className="d-flex justify-content-between align-items-center mb-2">
          <h2 style={{ fontSize: '2.5rem' }}>Repair & Gas Refill</h2>
          <a href="#repair-section" className="text-primary">Know more</a>
        </div>
        <div className="row">
          {repairs.map((repair) => (
            <div className="col-md-6 mb-4" key={repair.id}>
              <div className="card h-100">
                <div className="card-body d-flex align-items-center justify-content-between">
                  {/* Text Section */}
                  <div>
                    <h5 className="card-title">{repair.name}</h5>
                    <p className="card-text">Type: {repair.type}</p>
                    <p className="card-text">Price: ₹{repair.price}</p>
                    <p className="card-text">Discount: ₹{repair.discount}</p>
                    <div className="d-flex align-items-center mb-2">
                      <svg width="16" height="16" fill="#07794C">
                        <path d="M2 2.5a2.5 2.5 0 015 0V4h2V2.5a2.5 2.5 0 015 0V4h1.25A2.75 2.75 0 0118 6.75v10.5A2.75 2.75 0 0115.25 20H2.75A2.75 2.75 0 010 17.25V6.75A2.75 2.75 0 012.75 4H4V2.5zm3 0a1 1 0 10-2 0V4h2V2.5zm8 0a1 1 0 10-2 0V4h2V2.5zM2.75 6a.75.75 0 00-.75.75V17.25c0 .414.336.75.75.75h12.5a.75.75 0 00.75-.75V6.75a.75.75 0 00-.75-.75H2.75z" />
                      </svg>
                      <p className="mb-0 ms-2">{repair.technology}</p>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <svg width="16" height="16" fill="#07794C">
                        <path d="M7.25 4h-2.5v-.5A.75.75 0 003 4v.5H2.25A2.25 2.25 0 000 6.75v6A2.25 2.25 0 002.25 15h7.5A2.25 2.25 0 0012 12.75v-6A2.25 2.25 0 009.75 4H9V2.25A2.25 2.25 0 006.75 0h-1.5A2.25 2.25 0 003 2.25V4zm1-1.75a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25V4h-2V2.25zM1.5 6.75a.75.75 0 01.75-.75h7.5a.75.75 0 01.75.75V9H1.5V6.75zM1.5 10h9v2.75a.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V10zm3.25 1.25a.25.25 0 00-.25.25v.5a.25.25 0 00.25.25h2.5a.25.25 0 00.25-.25v-.5a.25.25 0 00-.25-.25h-2.5z" />
                      </svg>
                      <p className="mb-0 ms-2">Warranty: {repair.warranty}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <Button
                        style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                        onClick={() => handleAddToCart(repair)}
                      >
                        Add to Cart
                      </Button>
                      <span className="text-muted">Estimated Time: {repair.time}</span>
                    </div>
                  </div>

                  {/* Image Section */}
                  <img
                    src={`${process.env.PUBLIC_URL}${repair.image}`}
                    alt={repair.name}
                    style={{ height: '250px', width: '200px', objectFit: 'cover', marginLeft: '20px' }}
                  />
                </div>
                <div className="card-footer text-center bg-light p-2">
                  <large className="text-muted">Price: ₹{repair.price}</large>
                </div>
              </div>
            </div>
          ))}
        </div>
      <br/>

        {/* install Section */}
        <div id="install-section" className="d-flex justify-content-between align-items-center mb-2">
          <h2 style={{ fontSize: '2.5rem' }}>Install & Uninstall</h2>
          <a href="#install-section" className="text-primary">Know more</a>
        </div>
        <div className="row">
          {installations.map((installation) => (
            <div className="col-md-6 mb-4" key={installation.id}>
              <div className="card h-100">
                <div className="card-body d-flex align-items-center justify-content-between">
                  {/* Text Section */}
                  <div>
                    <h5 className="card-title">{installation.name}</h5>
                    <p className="card-text">Type: {installation.type}</p>
                    <p className="card-text">Price: ₹{installation.price}</p>
                    <p className="card-text">Discount: ₹{installation.discount}</p>
                    <div className="d-flex align-items-center mb-2">
                      <svg width="16" height="16" fill="#07794C">
                        <path d="M2 2.5a2.5 2.5 0 015 0V4h2V2.5a2.5 2.5 0 015 0V4h1.25A2.75 2.75 0 0118 6.75v10.5A2.75 2.75 0 0115.25 20H2.75A2.75 2.75 0 010 17.25V6.75A2.75 2.75 0 012.75 4H4V2.5zm3 0a1 1 0 10-2 0V4h2V2.5zm8 0a1 1 0 10-2 0V4h2V2.5zM2.75 6a.75.75 0 00-.75.75V17.25c0 .414.336.75.75.75h12.5a.75.75 0 00.75-.75V6.75a.75.75 0 00-.75-.75H2.75z" />
                      </svg>
                      <p className="mb-0 ms-2">{installation.technology}</p>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <svg width="16" height="16" fill="#07794C">
                        <path d="M7.25 4h-2.5v-.5A.75.75 0 003 4v.5H2.25A2.25 2.25 0 000 6.75v6A2.25 2.25 0 002.25 15h7.5A2.25 2.25 0 0012 12.75v-6A2.25 2.25 0 009.75 4H9V2.25A2.25 2.25 0 006.75 0h-1.5A2.25 2.25 0 003 2.25V4zm1-1.75a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25V4h-2V2.25zM1.5 6.75a.75.75 0 01.75-.75h7.5a.75.75 0 01.75.75V9H1.5V6.75zM1.5 10h9v2.75a.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V10zm3.25 1.25a.25.25 0 00-.25.25v.5a.25.25 0 00.25.25h2.5a.25.25 0 00.25-.25v-.5a.25.25 0 00-.25-.25h-2.5z" />
                      </svg>
                      <p className="mb-0 ms-2">Warranty: {installation.warranty}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <Button
                        style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                        onClick={() => handleAddToCart(installation)}
                      >
                        Add to Cart
                      </Button>
                      <span className="text-muted">Estimated Time: {installation.time}</span>
                    </div>
                  </div>

                  {/* Image Section */}
                  <img
                    src={`${process.env.PUBLIC_URL}${installation.image}`}
                    alt={installation.name}
                    style={{ height: '250px', width: '200px', objectFit: 'cover', marginLeft: '20px' }}
                  />
                </div>
                <div className="card-footer text-center bg-light p-2">
                  <large className="text-muted">Price: ₹{installation.price}</large>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
