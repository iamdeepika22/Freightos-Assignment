import { useEffect, useState } from "react";
import Character from "../components/Character";
import { FaSearch } from "react-icons/fa";

const CharacterPage = () => {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [name, setName] = useState("");
    const [debouncedName, setDebouncedName] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedName(name);
        }, 500);

        return () => clearTimeout(timer);
    }, [name]);

    useEffect(() => {
        fetchCharacters();
    }, [page, debouncedName, status]);

    const fetchCharacters = async () => {
        try {
            setLoading(true);

            const res = await fetch(
                `https://rickandmortyapi.com/api/character?page=${page}&name=${debouncedName}&status=${status}`
            );

            const data = await res.json();

            setCharacters(data.results || []);
            setTotalPages(data.info?.pages || 1);

        } catch (err) {
            console.log(err);
            setCharacters([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrapper">
            <h1 style={{ textAlign: "center" }}>Rick and Morty API - Characters</h1>

            <div className="filters">
                <div className="search-box">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <select onChange={(e) => setStatus(e.target.value)}>
                    <option value="">All</option>
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                </select>
            </div>

            <div className="content-area">
                {loading ? (
                    <div className="loader"></div>
                ) : characters.length === 0 ? (
                    <div className="no-data">
                        <p>No characters found</p>
                    </div>
                ) : (
                    <div className="card-page">
                        {characters.map((char) => (
                            <Character key={char.id} character={char} />
                        ))}
                    </div>
                )}
            </div>

            <div className="pagination">
                <button
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page === 1}
                >
                    Prev
                </button>

                <span>Page {page}</span>

                <button onClick={() => setPage((prev) => prev + 1)} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default CharacterPage;