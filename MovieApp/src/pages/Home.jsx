import MovieCard from "../components/MovieCard"
import {useState} from "react"

function Home() {
    // this allows the value to persist along different state changes
    const [searchQuery, setSearchQuery] = useState("");

    const movies = [ 
        {id: 1, title: "IF", release_date: 2024},
        {id: 2, title: "Rise of the Guardians", release_date: 2012},
        {id: 3, title: "Book of Life", release_date: 2014},
        {id: 4, title: "Wicked", release_date: 2024},
    ];

    const handleSearch = (e) => {
        // e.preventDefault()
        alert(searchQuery)
        // setSearchQuery("----")
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

            <div className="movies-grid">
                {movies.map((movie) => (
                    // movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
                    <MovieCard movie={movie} key={movie.id}/>
                    // )
                    ))}
            </div>
        </div>
    );
};

export default Home;