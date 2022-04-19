import React, { Component } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';

import '../App.css';

class Cart extends Component {
    constructor(){
        super();

        this.state = {
            items: []
        }
    }

    componentDidMount = (props) => {
        //llama a la funcion globar para obtener todos los items en el carrito
        if(window.getCart){
            const cartItems = window.getCart();

            if(cartItems && cartItems.length > 0){
                let total = 0;

                document.title = `Carrito (${cartItems.length}) | Sneaker City`;

                cartItems.forEach(item=> {
                    total += item.price;
                })

                this.setState({items: cartItems, total});
            }
            else {
                document.title = `Carrito | Sneaker City`;
            }
        }
        else {
            document.title = `Carrito | Sneaker City`;
        }
    }

    removeFromCart = (currentItem) => {
        
        const cartItems = this.state.items.filter(item => {
            if((item.id === currentItem.id) && (item.size === currentItem.size)){
                return false;
            }
            
            return true;
        });

        document.title = `Carrito (${cartItems.length}) | Sneaker City`;
        this.setState({items: cartItems});
        
        if(window.removeFromCart){
            window.removeFromCart(currentItem);
        }
    }

    render(){
        const { items, total } = this.state;

        return (
            <div className="Cart-Div">
                {items.length > 0 ?
                    <Grid container xs={12} sm={12} lg={6} spacing={24} style={{padding: 24, marginTop: 30}}>
                        <List aria-label="main mailbox folders" style={{width:'100%'}}>
                            {items.map((currentItem, index) => (
                                <div style={{width:'100%'}}>
                                <ListItem className="" style={{width:'100%'}}>
                                    <img src={currentItem.picture} alt="alt" style={{width:'100px', marginRight:'20px'}}/>
                                    
                                    <div style={{width:'100%', flexDirection:'column', justifyContent:'space-between', minHeight:'110px',display:'flex'}}>
                                        <Grid container spacing={24} style={{padding: 0}}>
                                            <Grid item lg={11} >
                                                <div>
                                                    <h6 className="Cart-Item-Name">{currentItem.name}</h6>
                                                    <h3 className="Cart-Item-Desc">{currentItem.model}</h3>
                                                    <p className="Cart-Item-Size">Talla: {currentItem.size}</p>
                                                </div>
                                            </Grid>
                                            <Grid item lg={1} >
                                                <IconButton aria-label="close" onClick={()=> this.removeFromCart(currentItem)}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={24} style={{padding: 0}}>
                                            <Grid item lg={10} >
                                                <div>
                                                    x 1
                                                </div>
                                            </Grid>
                                            <Grid item lg={2} >
                                            <p style={{width:'100%', textAlign:'right', margin:0}}> $ {currentItem.price}</p>                                                
                                            </Grid>
                                        </Grid>
                                    </div>
                                </ListItem>
                                <Divider />
                                </div>
                            ))}
                        </List>

                        <div style={{width:'100%',minHeight:'30px',display: 'flex', alignItems: 'center', flexDirection:'row', justifyContent:'space-between', paddingLeft:'16px',paddingRight:'13px'}}>
                            <p style={{display:'inline'}}>Total</p>
                            <p style={{display:'inline'}}>$ {total}</p>
                        </div>

                        <Link to={{pathname: `/checkout`, item: []}} style={{width:'100%',minHeight:'30px',display: 'flex', alignItems: 'center', flexDirection:'row', justifyContent:'center', paddingLeft:'16px',paddingRight:'13px', backgroundColor:'#ccc', textDecoration:'none', borderRadius:'5px', color:'#000', marginTop:'7px'}}>
                            <p style={{display:'inline'}}>COMPRAR</p>
                        </Link>
                    </Grid>
                    :
                    <h3>No hay items en el Carrito</h3>
                }
            </div>
        )
    }
}

export default Cart;
