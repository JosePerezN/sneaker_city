import React from 'react';
import { Link } from 'react-router-dom';

import '../App.css';

//Formatea el releaseDate timestamp a una fecha legible
const formatReleaseDate = (timestamp) => {
    const date = new Date(timestamp);
    
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0'+minutes : minutes;

    let strTime = `${hours}:${minutes} ${ampm}`;

    let months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']

    return `Disponible ${months[date.getMonth()]} ${date.getDate()} a las ${strTime}`;
}

const Item = (props) => {
    const item = props.item;
    
    return (
        item ? 
            <Link to={{pathname: `/items/${item.name.toLowerCase()}/${item.id}`, item: item}} className="Item-Div">
                <img src={item.picture} alt={item.name} className="Item-Picture"/>
                <div className="Item-Price">${item.price}</div> 
                <div className="Item-Details">
                    <div className="Item-Wrapper">
                        <h3 className="Item-Name">{item.name}</h3>
                        <h6 className="Item-Desc">{item.model}</h6>
                        <p className="Item-ReleaseDate">{formatReleaseDate(item.releaseDate)}</p>
                    </div>
                </div>
            </Link>
            :
            null
    )
}

export default Item;