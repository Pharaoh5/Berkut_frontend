import React from 'react';
import ImageCard from './ImageCard/ImageCard';

const ImageGrid = ({ images, showActions = true }) => {
  return (
    <div className="image-grid">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} showActions={showActions} />
      ))}
    </div>
  );
};

export default ImageGrid;
