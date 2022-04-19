import React from 'react';
import { AppBar, Toolbar, Typography, Grid } from '@material-ui/core';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Grid container>
                        <Grid item xs={11} style={{paddingTop:'3px'}}>
                            <Link to="/" style={{textDecoration:'none',color:'#fff'}} >
                                <Typography style={{fontWeight:'500'}} variant="h6">
                                    Sneaker City
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid item xs={1}>
                            <Link to="/cart" className="Cart-Link">  
                                <ShoppingCart /> {props.cartItemsCount}
                            </Link>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;
