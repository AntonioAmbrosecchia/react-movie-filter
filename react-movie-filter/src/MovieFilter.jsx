import { useState, useEffect } from "react";
import "./MovieFilter.css";

const moviesList = [
    { title: "Inception", genre: "Fantascienza" },
    { title: "Il Padrino", genre: "Thriller" },
    { title: "Titanic", genre: "Romantico" },
    { title: "Batman", genre: "Azione" },
    { title: "Interstellar", genre: "Fantascienza" },
    { title: "Pulp Fiction", genre: "Thriller" },
];

export default function MovieFilter() {
    const [movies, setMovies] = useState(moviesList);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [newMovie, setNewMovie] = useState({ title: "", genre: "" });

    useEffect(() => {
        let filteredMovies = moviesList;
        if (selectedGenre) {
            filteredMovies = filteredMovies.filter(
                (movie) => movie.genre === selectedGenre
            );
        }
        if (searchTerm) {
            filteredMovies = filteredMovies.filter((movie) =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setMovies(filteredMovies);
    }, [selectedGenre, searchTerm]);

    const handleAddMovie = (e) => {
        e.preventDefault();
        if (newMovie.title && newMovie.genre) {
            setMovies([...movies, newMovie]);
            setNewMovie({ title: "", genre: "" });
        }
    };

    return (
        <div className="container">
            <h1>Movie Filter</h1>
            <select onChange={(e) => setSelectedGenre(e.target.value)} value={selectedGenre}>
                <option value="">Tutti i generi</option>
                {[...new Set(moviesList.map((m) => m.genre))].map((genre) => (
                    <option key={genre} value={genre}>
                        {genre}
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Cerca film"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
            />

            <ul>
                {movies.map((movie, index) => (
                    <li key={index}>
                        {movie.title} - <span>{movie.genre}</span>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleAddMovie}>
                <input
                    type="text"
                    placeholder="Titolo"
                    value={newMovie.title}
                    onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Genere"
                    value={newMovie.genre}
                    onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
                />
                <button type="submit">Aggiungi Film</button>
            </form>
        </div>
    );
}