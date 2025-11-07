import MovieCard from "../components/MovieCard"
import "./../css/Home.css"
import {useState, useEffect} from "react"
import {searchMovies, getPopularMovies} from '../services/API.js'

function Home() {
    // this allows the value to persist along different state changes
    const [searchQuery, setSearchQuery] = useState("");

    // const movies = [ 
    //     {id: 1, title: "IF", release_date: 2024},
    //     {id: 2, title: "Rise of the Guardians", release_date: 2012},
    //     {id: 3, title: "Book of Life", release_date: 2014},
    //     {id: 4, title: "Wicked", release_date: 2024},
    // ];

    // this is in state so that any time we update the movies list
    //    it will automatically rerender the component for us.
    // one to store the 'loading state' like if youre loading data and one to store any errors that have potentially occurred
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect uses a functions that you want to call when this dependency array changes
    // the array will be checked after each rerender and if its changed, then we'll run
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies...")
            }
            finally {
                setLoading(false)
            }
        }

        loadPopularMovies()
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch(err) {
            console.log(err)
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }

        // alert(searchQuery)
        setSearchQuery("")
    };

    return (
        <div className="Home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search for movies..." 
                    className="search-input" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>

            </form>

            {error && <div className="error-message"> {error} </div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
            <div className="movies-grid">
                {movies.map((movie) => (
                    // movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
                    <MovieCard movie={movie} key={movie.id}/>
                    // )
                    ))}
            </div>
            )}
        </div>
    );
};

export default Home;