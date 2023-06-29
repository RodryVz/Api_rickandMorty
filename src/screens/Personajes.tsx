import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Personaje {
    id: number;
    name: string;
    image: string;
    species: string;
}

const Personajes = (): JSX.Element => {
    const [personajes, setPersonajes] = useState<Personaje[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    useEffect(() => {
        obtenerPersonajes();
    }, [pagina]);

    const obtenerPersonajes = async (): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const respuesta = await fetch(`https://rickandmortyapi.com/api/character?page=${pagina}`);
            const datos = await respuesta.json();

            setPersonajes(datos.results);
            setTotalPaginas(datos.info.pages);
            setLoading(false);
        } catch (error) {
            setError('Error al cargar los personajes.');
            setLoading(false);
        }
    };

    const handlePaginaAnterior = (): void => {
        if (pagina > 1) {
            setPagina(pagina - 1);
        }
    };

    const handlePaginaSiguiente = (): void => {
        if (pagina < totalPaginas) {
            setPagina(pagina + 1);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container mt-4">
            <div className="row mt-3">
                {personajes.map((personaje) => (
                    <div className="col-md-4 mb-4" key={personaje.id}>
                        <div className="card">
                            <img src={personaje.image} className="card-img-top" alt={personaje.name} />
                            <div className="card-body">
                                <h5 className="card-title">{personaje.name}</h5>
                                <p className="card-text">{personaje.species}</p>
                                <Link to={`/personajes/${personaje.id}`} className="btn btn-primary">
                                    Ver detalles
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row mt-3">
                <div className="col-6 text-center">
                    <button
                        className="btn btn-danger row mt-3 mb-3"
                        onClick={handlePaginaAnterior}
                        disabled={pagina === 1}
                    >
                        Página anterior
                    </button>
                </div>
                <div className="col-6 text-center">
                    <button
                        className="btn btn-success row mt-3 mb-3"
                        onClick={handlePaginaSiguiente}
                        disabled={pagina === totalPaginas}
                    >
                        Página siguiente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Personajes;
