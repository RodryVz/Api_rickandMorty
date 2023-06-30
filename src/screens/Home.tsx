
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <h1 className="text-center mt-5">Bienvenido a la Aplicación de Rick and Morty</h1>
            <p className="lead text-center mb-5">¡Explora el universo de Rick and Morty y descubre personajes, ubicaciones y episodios emocionantes!</p>
            <div className="row">
                <div className="col-md-4">
                    <div className="card shadow">
                        <img src="https://i.pinimg.com/originals/61/de/2b/61de2ba956418acd9ab454ceca15bbb2.jpg" className="card-img-top" alt="Personajes" />
                        <div className="card-body">
                            <h5 className="card-title">Personajes</h5>
                            <p className="card-text">Descubre y aprende sobre los personajes de la serie.</p>
                            <Link to="/personajes" className="btn btn-primary">Ver Personajes</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow">
                        <img src="https://www.xtrafondos.com/thumbs/1_6603.jpg" className="card-img-top" alt="Ubicaciones" />
                        <div className="card-body">
                            <h5 className="card-title">Ubicaciones</h5>
                            <p className="card-text">Explora las diferentes ubicaciones del universo de Rick and Morty.</p>
                            <Link to="/ubicaciones" className="btn btn-primary">Ver Ubicaciones</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow mb-6">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHwAftOwaGR0fJg5zHw030xkHjBFuiv_HBJA&usqp=CAU" className="card-img-top" alt="Episodios" />
                        <div className="card-body">
                            <h5 className="card-title">Episodios</h5>
                            <p className="card-text">Sumérgete en los episodios y disfruta de las aventuras de Rick and Morty.</p>
                            <Link to="/episodios" className="btn btn-primary">Ver Episodios</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
