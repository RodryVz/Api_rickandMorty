import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

interface Character {
    id: number;
    name: string;
    image: string;
    species: string;
}

interface Episode {
    name: string;
    season: string;
    characters: string[];
}

const EpisodioDetalles = (): JSX.Element => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [episodio, setEpisodio] = useState<Episode | null>(null);
    const [personajes, setPersonajes] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        obtenerDetallesEpisodio();
    }, []);

    const obtenerDetallesEpisodio = async (): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const respuestaEpisodio = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
            const datosEpisodio: Episode = await respuestaEpisodio.json();

            setEpisodio(datosEpisodio);
            setLoading(false);

            const personajePromises = datosEpisodio.characters.map(async (personajeUrl) => {
                const respuestaPersonaje = await fetch(personajeUrl);
                const datosPersonaje: Character = await respuestaPersonaje.json();
                return datosPersonaje;
            });

            Promise.all(personajePromises)
                .then((personajesData: Character[]) => {
                    setPersonajes(personajesData);
                })
                .catch(() => {
                    setError('Error al cargar los detalles de los personajes.');
                });
        } catch (error) {
            setError('Error al cargar los detalles del episodio.');
            setLoading(false);
        }
    };

    const handleVerDetalle = (personajeId: number): void => {
        navigate(`/personajes/${personajeId}`);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container mt-4">
            <div className="text-center mb-4"> 
            <h2 style={{ fontWeight: 'bold', fontSize: '30px', marginBottom: '20px' }}>{episodio?.name}</h2>
            </div>
            <h3>Personajes que aparecen en el episodio:</h3>
            <div className="row">
                {personajes.map((personaje) => (
                    <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={personaje.id}>
                        <div className="card">
                            <img src={personaje.image} className="card-img-top" alt={personaje.name} />
                            <div className="card-body">
                                <h5 className="card-title">{personaje.name}</h5>
                                <p className="card-text">Especie: {personaje.species}</p>
                                <button className="btn btn-primary" onClick={() => handleVerDetalle(personaje.id)}>Ver Detalle</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <hr />
            <Link to="/episodios" className="justify-content-center btn btn-danger mb-4">Volver a Episodios</Link>
        </div>
    );
};

export default EpisodioDetalles
