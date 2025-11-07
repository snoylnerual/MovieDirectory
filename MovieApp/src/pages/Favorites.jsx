import "./../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
    // we want favorites to persist across runs of my application
    // we will put the info of the movies we favorited in something known as local storage
    // storage contained wihtin your browser
    // react context instead of prop drilling
    // a context will allow state to be globally available to anything that's within the provided context (like global var)

    const {favorites} = useMovieContext();

    if (favorites) {
        return (
            <div className="favorites"> 
                <h2>Your Current Favorites</h2>
                <div className="movies-grid">
                    {favorites.map((movie) => (
                        // movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
                        <MovieCard movie={movie} key={movie.id}/>
                        // )
                        ))}
                </div>
            </div>
        );
    }

    return <div className="favorites-empty">

        <h2>No Favorite Movies Yet</h2>
        <p>Start adding movies to your favorites and they will appear here</p>
    </div>
};


export default Favorites;