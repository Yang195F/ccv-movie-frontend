import type React from "react"
import { mockMovies } from "../data/mockData"

interface PosterSliderProps {
  filter: string
}

const PosterSlider: React.FC<PosterSliderProps> = ({ filter }) => {
  // Filter movies based on the selected filter
  const getFilteredMovies = () => {
    const currentDate = new Date().toISOString().split("T")[0]

    switch (filter) {
      case "today":
        return mockMovies.filter((movie) => movie.releaseDate === currentDate)
      case "upcoming":
        return mockMovies.filter((movie) => movie.releaseDate > currentDate)
      case "outdated":
        return mockMovies.filter((movie) => movie.releaseDate < currentDate)
      default:
        return mockMovies
    }
  }

  const filteredMovies = getFilteredMovies()

  return (
    <>
      {filteredMovies.map((movie) => (
        <div key={movie.id} className="poster-item">
          <div className="poster-image">
            <img src={movie.image || "/placeholder.svg"} alt={movie.title} />
          </div>
        </div>
      ))}

      {/* If no movies match the filter, show placeholders */}
      {filteredMovies.length === 0 && (
        <>
          <div className="poster-item">
            <div className="poster-placeholder">Image1.png</div>
          </div>
          <div className="poster-item">
            <div className="poster-placeholder">Image2.png</div>
          </div>
          <div className="poster-item">
            <div className="poster-placeholder">Image3.png</div>
          </div>
          <div className="poster-item">
            <div className="poster-placeholder">Image4.png</div>
          </div>
        </>
      )}
    </>
  )
}

export default PosterSlider
