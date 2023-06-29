import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const UbicacionDetalle = () => {
    const { id } = useParams();
    const [ubicacion, setUbicacion] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        obtenerUbicacion();
    }, []);

    const obtenerUbicacion = async () => {
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
        <div>
            <h2>{ubicacion.name}</h2>
            <p>Tipo: {ubicacion.type}</p>
            <p>Dimensión: {ubicacion.dimension}</p>
            <p>Fecha de creación: {ubicacion.created}</p>

            <Link to="/ubicaciones">Volver a las ubicaciones</Link>
        </div>
    );
};

export default UbicacionDetalle;
