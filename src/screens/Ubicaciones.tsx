import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Ubicacion {
    id: number;
    name: string;
    type: string;
    dimension: string;
}

const Ubicaciones = (): JSX.Element => {
    const [ubicaciones, setUbicaciones] = useState<Ubicacion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pagina, setPagina] = useState<number>(1);
    const [totalPaginas, setTotalPaginas] = useState<number>(1);

    useEffect(() => {
        obtenerUbicaciones();
    }, [pagina]);

    const obtenerUbicaciones = async (): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const respuesta = await fetch(`https://rickandmortyapi.com/api/location?page=${pagina}`);
            const datos = await respuesta.json();

            setUbicaciones(datos.results);
            setTotalPaginas(datos.info.pages);
            setLoading(false);
        } catch (error) {
            setError('Error al cargar las ubicaciones.');
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
            <div className="row">
                {ubicaciones.map((ubicacion) => (
                    <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={ubicacion.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{ubicacion.name}</h5>
                                <p className="card-text">Tipo: {ubicacion.type}</p>
                                <p className="card-text">Dimensión: {ubicacion.dimension}</p>
                                <Link to={`/ubicaciones/${ubicacion.id}`} className="btn btn-primary">Ver más</Link>
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

export default Ubicaciones;
