import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Episode {
    id: number;
    name: string;
    episode: string;
}

const Episodios = (): JSX.Element => {
    const [episodios, setEpisodios] = useState<Episode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    useEffect(() => {
        obtenerEpisodios();
    }, [pagina]);

    const obtenerEpisodios = async (): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const respuesta = await fetch(`https://rickandmortyapi.com/api/episode?page=${pagina}`);
            const datos = await respuesta.json();

            setEpisodios(datos.results);
            setTotalPaginas(datos.info.pages);
            setLoading(false);
        } catch (error) {
            setError('Error al cargar los episodios.');
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
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {episodios.map((episodio) => (
                    <div className="col" key={episodio.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"><b>Nobre Episodio: </b>{episodio.name}</h5>
                                <p className="card-text">Episodio: {episodio.episode}</p>
                                <hr />
                                <Link to={`/episodios/${episodio.id}`} className="btn btn-primary">
                                    Ver más
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

export default Episodios;
