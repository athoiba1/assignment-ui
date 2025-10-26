import React, { useState } from 'react';

const ProfileCard = () => {
  // Set default tab to 'aboutMe' to match the provided image
  const [activeTab, setActiveTab] = useState('aboutMe');

  const renderContent = () => {
    switch (activeTab) {
      case 'aboutMe':
        return (
          <div className="card-content-text">
            <p className="intro-text">
              Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.
            </p>
            <p className="bio-text">
              I was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years w/ my wife Tiffany and my 4 year old twin daughters— Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9–10 AM. This is a...
            </p>
          </div>
        );
      case 'experiences':
        return <div className="card-content-text"><p>Placeholder content for **Experiences**.</p></div>;
      case 'recommended':
        return <div className="card-content-text"><p>Placeholder content for **Recommended**.</p></div>;
      default:
        return null;
    }
  };

  const TabButton = ({ name, label }) => (
    <button
      className={`tab-button ${activeTab === name ? 'active' : ''}`}
      onClick={() => setActiveTab(name)}
    >
      {label}
    </button>
  );

  return (
    <div className="widget-card profile-card">
      {/* Header/Tabs */}
      <div className="card-header">
        <div className="tab-buttons-group">
          <TabButton name="aboutMe" label="About Me" />
          <TabButton name="experiences" label="Experiences" />
          <TabButton name="recommended" label="Recommended" />
        </div>
        <div className="header-icon">
          <span className="icon">⚙️</span>
        </div>
      </div>

      {/* Content Area */}
      {renderContent()}
    </div>
  );
};

export default ProfileCard;