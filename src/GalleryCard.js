import React, { useState } from 'react';

// Define placeholder image objects without importing local files
const initialImages = [
    { id: 1 }, 
    { id: 2 }, 
    { id: 3 },
];

const GalleryCard = () => {
  // State 1: Full image list
  const [images, setImages] = useState(initialImages);
  // State 2: Index of the first visible image for horizontal scrolling effect
  const [startIndex, setStartIndex] = useState(0);

  // --- INTERACTION LOGIC ---

  const handleAddImage = () => {
    const newImage = { 
      id: Date.now(),
    };
    setImages(prevImages => [...prevImages, newImage]);
  };

  const handleNext = () => {
    if (startIndex + 3 < images.length) {
      setStartIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(prevIndex => prevIndex - 1);
    }
  };

  // Only show 3 images to fit the 3 visible columns
  const visibleImages = images.slice(startIndex, startIndex + 3);


  return (
    <div className="widget-card gallery-card">
      {/* Header with Title and Controls */}
      <div className="card-header gallery-header">
        <div className="card-title-group">
          <div className="gallery-button">Gallery</div>
          <button 
            className="add-image-button"
            onClick={handleAddImage}
          >
            + ADD IMAGE
          </button>
        </div>
        <div className="navigation-arrows">
          <button 
            className="arrow-btn"
            onClick={handlePrev}
            disabled={startIndex === 0}
          >
            ←
          </button>
          <button 
            className="arrow-btn"
            onClick={handleNext}
            disabled={startIndex + 3 >= images.length}
          >
            →
          </button>
        </div>
      </div>

      {/* Image Grid */}
      <div className="image-grid">
        {/* Render visible image placeholders */}
        {visibleImages.map(img => (
          <div key={img.id} className="image-wrapper">
            {/* The image is now just an empty div that takes on the CSS placeholder background */}
            <div className="gallery-image" />
          </div>
        ))}

        {/* Fill empty slots in the grid (if fewer than 3 images are visible) */}
        {[...Array(3 - visibleImages.length)].map((_, index) => (
          <div key={`empty-${index}`} className="image-wrapper empty-slot"></div>
        ))}
        
        {/* Hidden column placeholder for visual alignment */}
        <div className="image-wrapper small-image-placeholder"></div>
      </div>
    </div>
  );
};

export default GalleryCard;