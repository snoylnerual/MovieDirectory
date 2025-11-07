import "./../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"

// movie will be an object that holds more info
function MovieCard({movie}) {
    // since I am calling useMovieContext() it just provides me access to all of the Movie Context
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        // alert("clicked")

        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                        ❤︎
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
            </div>
        </div>
    )

}

export default MovieCard