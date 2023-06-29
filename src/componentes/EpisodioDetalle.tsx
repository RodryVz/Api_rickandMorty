import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const EpisodioDetalles = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [episodio, setEpisodio] = useState(null);
    const [personajes, setPersonajes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        obtenerDetallesEpisodio();
    }, []);

    const obtenerDetallesEpisodio = async () => {
        setLoading(true);
        setError(null);

        try {
            const respuestaEpisodio = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
            const datosEpisodio = await respuestaEpisodio.json();

            setEpisodio(datosEpisodio);
            setLoading(false);

            const personajePromises = datosEpisodio.characters.map(async (personajeUrl) => {
                const respuestaPersonaje = await fetch(personajeUrl);
                const datosPersonaje = await respuestaPersonaje.json();
                return datosPersonaje;
            });

            Promise.all(personajePromises)
                .then((personajesData) => {
                    setPersonajes(personajesData);
                })
                .catch((error) => {
                    setError('Error al cargar los detalles de los personajes.');
                });
        } catch (error) {
            setError('Error al cargar los detalles del episodio.');
            setLoading(false);
        }
    };

    const handleVerDetalle = (personajeId) => {
        navigate(`/personajes/${personajeId}`);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>{episodio.name}</h2>
            <p>Temporada: {episodio.season}</p>
            <h3>Personajes que aparecen en el episodio:</h3>
            <ul>
                {personajes.map((personaje) => (
                    <li key={personaje.id}>
                        <img src={personaje.image} alt={personaje.name} />
                        <p>{personaje.name}</p>
                        <p>Especie: {personaje.species}</p>
                        <button onClick={() => handleVerDetalle(personaje.id)}>Ver Detalle</button>
                    </li>
                ))}
            </ul>
            <Link to="/episodios">Volver a Episodios</Link>
        </div>
    );
};

export default EpisodioDetalles;
