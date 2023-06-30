import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Ubicacion {
    name: string;
    type: string;
    dimension: string;
    created: string;
}

const UbicacionDetalle = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const [ubicacion, setUbicacion] = useState<Ubicacion | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        obtenerUbicacion();
    }, []);

    const obtenerUbicacion = async (): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const respuesta = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
            const datos = await respuesta.json();

            setUbicacion(datos);
            setLoading(false);
        } catch (error) {
            setError('Error al cargar los detalles de la ubicación.');
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h5 className="card-title">{ubicacion?.name}</h5>
                            <hr />
                            <p className="card-text">Tipo: {ubicacion?.type}</p>
                            <p className="card-text">Dimensión: {ubicacion?.dimension}</p>
                            <p className="card-text">Fecha de creación: {ubicacion?.created}</p>
                            <Link to="/ubicaciones" className="btn btn-primary">Volver a las ubicaciones</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UbicacionDetalle;
