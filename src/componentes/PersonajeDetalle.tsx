import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface Character {
    id: number;
    name: string;
    image: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
    };
}

const PersonajeDetalle = () => {
    const { id } = useParams();
    const [personaje, setPersonaje] = useState<Character | null>(null);

    useEffect(() => {
        obtenerPersonaje();
    }, []);

    const obtenerPersonaje = async () => {
        try {
            const respuesta = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
            const datos = await respuesta.json();

            setPersonaje(datos);
        } catch (error) {
            console.log(error);
        }
    };

    if (!personaje) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="container d-flex justify-content-center">
            <div className="card mt-5" style={{ width: "750px" }}>
                <div className="row g-0">
                    <div className="col-md-5">
                        <img src={personaje.image} className="img-fluid rounded-start" alt={personaje.name} />
                    </div>
                    <div className="col-md-7">
                        <div className="card-body">
                            <h5 className="card-title">{personaje.name}</h5>
                            <p className="card-text">Estado: {personaje.status}</p>
                            <p className="card-text">Especie: {personaje.species}</p>
                            <p className="card-text">Tipo: {personaje.type}</p>
                            <p className="card-text">Género: {personaje.gender}</p>
                            <p className="card-text">Origen: {personaje.origin.name}</p>
                            <Link to="/personajes" className="btn btn-primary">Regresar</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonajeDetalle;
