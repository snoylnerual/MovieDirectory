import {createContext, useState, useContext, useEffect} from "react"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

// children is a reserved prop when you write a component and children is anything that's inside that component you rendered
export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])

    // local storage allows us to store values directly within our browser
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")

        if (storedFavs) setFavorites(JSON.parse(storedFavs))
    }, [])

    // any time the favorites state changes, we want to update what we're storing in local storage
    useEffect (() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (movie) => {
        // takes the previous value of favorites and adds one movie to it and sets that as new favorites
        setFavorites(prev => [...prev, movie])
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {
        favorites, 
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}