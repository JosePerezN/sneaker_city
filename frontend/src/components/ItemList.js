import React, { Component } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import Item from './Item';

import '../App.css';

import apiGetItems from '../providers/getItems';

class ItemList extends Component {
    constructor() {
        super();

        this.state = {
            items: [],
            noItemFound: false
        }

        this.mounted = true;
    }

    componentDidMount = () => {
        document.title = `Sneaker City`;
        
        this.getItems(0,10); // Obtiene los primeros 10 items

        // setear un metodo global para obtener un item previamente obtenido desde la api
        window.getItem = (id) => {
            const temp = this.state.items.filter(item => item.id === id);
            const item = temp[0];
            return item;
        }
    }

    componentWillUnmount = () => {
        this.mounted = false;
    }

    getItems = (start, end) => {            
        apiGetItems(start, end)
            .then(items => { 
                if(items.length > 0){               
                    this.mounted && this.setState({items});
                }
                else {
                    this.mounted && this.setState({noItemFound: true});
                }

                return true;
            })
            .catch(error => {
                alert('Sorry an unknown error occurred.');
                this.mounted && this.setState({noItemFound: true});
            })
    }

    render() {
        const { items, noItemFound } = this.state;

        return (
            <div>
                {items.length > 0 ? (
                        <Grid container spacing={24} style={{padding: 24}}>
                            {items.map((currentItem, index) => (
                                <Grid key={index} className="Grid" item xs={12} sm={6} lg={4} xl={3}>
                                    <Item item={currentItem} />
                                </Grid>
                            ))}
                        </Grid>
                    )
                    : noItemFound ?
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300}}>
                        <h3>No hay items Disponibles</h3>
                    </div>
                    :
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300}}>
                        <CircularProgress />
                    </div>
                }
            </div>
        )
    }
}

export default ItemList;
