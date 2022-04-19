import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    document.title = `No encontrado | Sneaker City`;

    return (
        <div>
            <h3 style={{textAlign:'center'}} >Pagina no Encontrada!</h3>
            <center><Link to="/">Regresar a la Pagina Principal</Link></center>
        </div>
    );
}

export default NotFound;