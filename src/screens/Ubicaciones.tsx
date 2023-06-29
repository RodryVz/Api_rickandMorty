import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Ubicaciones = () => {
    const [ubicaciones, setUbicaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    useEffect(() => {
        obtenerUbicaciones();
    }, [pagina]);

    const obtenerUbicaciones = async () => {
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

    const handlePaginaAnterior = () => {
        if (pagina > 1) {
            setPagina(pagina - 1);
        }
    };

    const handlePaginaSiguiente = () => {
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
        <div>
            {ubicaciones.map((ubicacion) => (
                <div key={ubicacion.id}>
                    <h3>{ubicacion.name}</h3>
                    <p>Tipo: {ubicacion.type}</p>
                    <p>Dimensión: {ubicacion.dimension}</p>

                    <Link to={`/ubicaciones/${ubicacion.id}`}>Ver más</Link>
                </div>
            ))}

            <div>
                <button onClick={handlePaginaAnterior} disabled={pagina === 1}>
                    Página anterior
                </button>
                <button onClick={handlePaginaSiguiente} disabled={pagina === totalPaginas}>
                    Página siguiente
                </button>
            </div>
        </div>
    );
};

export default Ubicaciones;
