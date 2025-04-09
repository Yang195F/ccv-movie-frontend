import React from "react";

interface PosterUploadProps {
  poster: string | null;
  setPoster: React.Dispatch<React.SetStateAction<string | null>>;
}

const PosterUpload: React.FC<PosterUploadProps> = ({ poster, setPoster }) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPoster(reader.result as string); // Set the poster using setPoster
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="movie-poster">
      <div className="poster-box" onClick={() => document.getElementById("file-input")?.click()}>
        {poster ? <img src={poster} alt="Movie Poster" className="poster-preview" /> : <p>No Image</p>}
      </div>
      <input id="file-input" type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
    </div>
  );
};

export default PosterUpload;
