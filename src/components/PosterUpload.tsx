import React from 'react';

interface PosterUploadProps {
  poster: string | null;
  setPoster: (url: string | null) => void;
}

const PosterUpload: React.FC<PosterUploadProps> = ({ poster, setPoster }) => {
  const handleUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoster(e.target.value);
  };

  return (
    <div className="poster-upload">
      <div className="input-group">
        <label>Image Link:</label>
        <input
          type="text"
          onChange={handleUrlInput}
          value={poster || ''}
        />
      </div>
      <div className="preview-container">
        {poster ? (
          <img src={poster} alt="Movie poster preview" />
        ) : (
          <span>Movie Poster</span>
        )}
      </div>
    </div>
  );
};

export default PosterUpload;