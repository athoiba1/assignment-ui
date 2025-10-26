import React, { useState, useEffect } from 'react';
// Import the required components from react-bootstrap
import { Container, Row, Col, Card, Nav, Button } from 'react-bootstrap';

/**
 * This component injects all the custom CSS into the page.
 * This removes the need for a separate .css file.
 */
const GlobalStyles = () => (
  <style>{`
    /* --- 1. Root Variables (The "Design System") --- */
    :root {
      --app-bg: #121212;
      --panel-bg: #22252a; /* Main panel color */
      --panel-bg-lighter: #2a2a2a;
      --accent-bg: #323232;
      --text-light: #f0f0f0;
      --text-faded: #a0a0a0;
      --text-darker: #707070;
      --border-color: #3e3e3e;
      --panel-inside-border: #363C43; /* From your Figma screenshot */
      --radius: 8px;
      --panel-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
      
      /* Frosted Glass Button Style (From your new image) */
      --btn-bg: rgba(255, 255, 255, 0.03); /* 3% white fill */
      --btn-border: rgba(255, 255, 255, 0.1); /* Subtle border */
      --btn-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    /* --- 2. Global Resets & Body --- */
    body {
      background-color: var(--app-bg);
      color: var(--text-light);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-size: 14px;
    }

    /* --- 3. Main Layout --- */
    .app-wrapper {
      min-height: 100vh;
      padding-top: 2rem;
    }

    /* --- 4. Content Panels --- */
    .content-area {
      padding: 1.5rem;
    }

    .panel {
      background-color: var(--panel-bg);
      border-radius: var(--radius);
      border: none;
      box-shadow: 
        0 4px 12px rgba(0, 0, 0, 0.4), /* Outer Drop Shadow */
        inset 0 0 0 1px var(--panel-inside-border); /* Inside 1px Stroke */
      position: relative;
      padding: 1.5rem;
    }

    .panel-icon-group {
      position: absolute;
      top: 1.5rem;
      left: 1.5rem;
      color: var(--text-faded); /* Light grey icon color */
      font-size: 1.1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    /* --- 5. Profile Card --- */
    .profile-card-header {
      padding-left: 3rem;
      margin-bottom: 1rem;
    }
    
    .profile-tabs-container {
      background-color: #1C1C1C;
      border-radius: 23px;
      padding: 0.5rem;
      display: flex;
      justify-content: space-around;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.5); /* Pressed in */
    }
    
    .profile-tab-link {
      background: transparent !important;
      color: var(--text-faded) !important;
      font-weight: 500;
      border: none !important;
      border-radius: 99px !important;
      font-size: 0.9rem;
      padding: 0.5rem 1rem;
      flex-grow: 1;
      text-align: center;
      transition: all 0.1s ease;
      box-shadow: none;
    }
    
    /* Active tab gets the "Frosted Glass" effect */
    .profile-tab-link.active {
      background-color: var(--btn-bg) !important;
      border: 1px solid var(--btn-border) !important;
      color: var(--text-light) !important;
      font-weight: 600;
      box-shadow: var(--btn-shadow);
      backdrop-filter: blur(10px);
    }

    .profile-card-body {
      color: var(--text-faded);
      line-height: 1.6;
      font-size: 0.9rem;
      padding: 0;
      padding-left: 3rem;
      position: relative;
    }
    
    .profile-card-body-scroll {
      max-height: 150px;
      overflow-y: auto;
      padding-right: 1rem;
    }
    
    .profile-card-body-scroll::-webkit-scrollbar { width: 6px; }
    .profile-card-body-scroll::-webkit-scrollbar-track { background: transparent; }
    .profile-card-body-scroll::-webkit-scrollbar-thumb {
      background-color: var(--accent-bg); 
      border-radius: 10px;
    }

    /* --- 6. Gallery Card --- */
    .gallery-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding-left: 3rem;
      margin-bottom: 1rem;
    }
    
    .gallery-title-pill {
      background-color: #171717;
      color: var(--text-light) !important;
      font-weight: 600;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      margin-bottom: 0;
      box-shadow: inset 0 4px 10px 2px rgba(0, 0, 0, 0.25); /* "Pressed in" */
      border: none !important;
    }

    /* "Add Image" button gets "Frosted Glass" effect */
    .btn-add-image {
      background-color: var(--btn-bg) !important;
      border: 1px solid var(--btn-border) !important;
      color: var(--text-faded) !important;
      font-weight: 600;
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
      border-radius: 99px;
      box-shadow: var(--btn-shadow);
      backdrop-filter: blur(10px);
      transition: all 0.1s ease;
    }
    .btn-add-image:hover {
       color: var(--text-light) !important;
       background-color: rgba(255, 255, 255, 0.07) !important;
    }

    /* Arrow buttons get "Frosted Glass" effect */
    .btn-arrow {
      background-color: var(--btn-bg) !important;
      border: 1px solid var(--btn-border) !important;
      color: var(--text-light) !important; /* Bright white icon */
      border-radius: 99px !important;
      width: 38px;
      height: 38px;
      font-size: 1.1rem;
      box-shadow: var(--btn-shadow);
      backdrop-filter: blur(10px);
      transition: all 0.1s ease;
    }
    .btn-arrow:hover {
      color: var(--text-light) !important;
      background-color: rgba(255, 255, 255, 0.07) !important;
    }
    
    .gallery-nav {
      padding-left: 3rem;
      margin-bottom: 1rem;
      display: flex;
      justify-content: flex-end;
    }

    .gallery-body {
      padding: 0;
      padding-left: 3rem;
    }

    .img-placeholder {
      background-color: var(--panel-bg-lighter);
      min-height: 100px;
      border-radius: 6px;
      background-image: url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&auto=format&fit=crop');
      background-size: cover;
      background-position: center;
      opacity: 0.6;
    }
  `}</style>
);

// --- ProfileCard Component ---
const tabContent = {
  about: (
    <>
      <p className="mb-2">
        Hello! I'm Dave, your sales rep here from Salesforce. I've been working
        at this awesome company for 3 years now.
      </p>
      <p className="mb-0">
        I was born and raised in Albany, NY& have been living in Santa Carla for
        the past 10 years my wife Tiffany and my 4 year old twin daughters - Emma
        and Ella. Both of them are just starting school, so my calender is
        usually blocked between 9-10 AM. This is a...
      </p>
    </>
  ),
  experiences: <p className="mb-0">Content for the "Experiences" tab goes here.</p>,
  recommended: <p className="mb-0">Content for the "Recommended" tab goes here.</p>,
};

const TABS = [
  { eventKey: 'about', title: 'About Me' },
  { eventKey: 'experiences', title: 'Experiences' },
  { eventKey: 'recommended', title: 'Recommended' },
];

function ProfileCard() {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <Card className="panel">
      <div className="panel-icon-group">
        <i className="bi bi-question-circle"></i>
        <i className="bi bi-grip-horizontal"></i>
      </div>

      <Card.Header className="bg-transparent border-0 p-0 profile-card-header">
        <div className="profile-tabs-container">
          {TABS.map((tab) => (
            <Button
              key={tab.eventKey}
              className={`profile-tab-link ${
                activeTab === tab.eventKey ? 'active' : ''
              }`}
              onClick={() => setActiveTab(tab.eventKey)}
            >
              {tab.title}
            </Button>
          ))}
        </div>
      </Card.Header>
      <Card.Body className="profile-card-body">
        <div className="profile-card-body-scroll">
          {tabContent[activeTab]}
        </div>
      </Card.Body>
    </Card>
  );
}

// --- GalleryCard Component ---
function GalleryCard() {
  const [images, setImages] = useState([1, 2, 3]);
  const addImage = () => {
    setImages([...images, images.length + 1]);
  };

  return (
    <Card className="panel">
      <div className="panel-icon-group">
        <i className="bi bi-question-circle"></i>
        <i className="bi bi-grip-horizontal"></i>
      </div>

      <div className="gallery-header">
        <h4 className="gallery-title-pill">Gallery</h4>
        <div className="d-flex align-items-center gap-2">
          <Button className="btn-add-image" size="sm" onClick={addImage}>
            <i className="bi bi-plus me-1"></i> ADD IMAGE
          </Button>
        </div>
      </div>

      <div className="gallery-nav gap-2">
        <Button className="btn-arrow" size="sm">
          <i className="bi bi-arrow-left"></i>
        </Button>
        <Button className="btn-arrow" size="sm">
          <i className="bi bi-arrow-right"></i>
        </Button>
      </div>

      <Card.Body className="gallery-body">
        <Row className="g-3">
          {images.slice(0, 3).map((img, i) => (
            <Col key={i}>
              <div className="img-placeholder"></div>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
}

// --- Main App Component ---
function App() {
  useEffect(() => {
    const bootstrapLink =
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
    if (!document.querySelector(`link[href="${bootstrapLink}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = bootstrapLink;
      document.head.appendChild(link);
    }

    const iconLink =
      'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
    if (!document.querySelector(`link[href="${iconLink}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = iconLink;
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="app-wrapper" data-bs-theme="dark">
      <GlobalStyles />
      <Container fluid className="content-area">
        <Row>
          <Col lg={6} className="d-none d-lg-block">
            {/* Left Panel (Empty) */}
          </Col>
          
          <Col lg={6} xs={12}>
            <div className="d-grid gap-4">
              <ProfileCard />
              <GalleryCard />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

