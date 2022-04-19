import React, { Component } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import RemoveShoppingCart from '@material-ui/icons/RemoveShoppingCart';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import '../App.css';

import apiGetItem from '../providers/getItem';
import apiGetItemSizes from '../providers/getItemSizes';

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    }
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose } = props;
    
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
                ) 
                : 
                null
            }
        </MuiDialogTitle>
    );
});
  
const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);
  
const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

class ItemDetails extends Component {
    constructor(props){
        super();

        this.state = {
            item: props.location ? props.location.item : null,
            open: false,
            selectedItem: {},
            selectedSizes: {},
            sizes: [],
            sizesNotFound: false,
            itemNotFound: false
        }

        this.mounted = true;
    }

    componentDidMount = () => {
        if(this.props.location && this.props.location.item){
            //se llama a la funcion global para obtener todos los items del carrito
            if(window.getCart){
                const cartItems = window.getCart();
                const { item } = this.state;

                document.title = `${item.name} - ${item.model} | Sneaker City`;

                if(item && cartItems && cartItems.length > 0){
                    const newSelectedSizes = {};

                    cartItems.forEach(item=> {
                        if(item.id === item.id){
                            newSelectedSizes[`${item.id}_${item.size}`] = true;
                        }
                    })

                    this.setState({selectedSizes: newSelectedSizes});
                }
            }

            this.getItemSizes(this.props.location.item.id);
        }
        else {
            if(window && window.getItem){
                const item = window.getItem(this.props.match.params.id);

                document.title = `${item.name} - ${item.model} | Sneaker City`;

                if(item){
                    if(window.getCart){
                        const cartItems = window.getCart();
            
                        if(cartItems && cartItems.length > 0){
                            const newSelectedSizes = {};
            
                            cartItems.forEach(item=> {
                                if(item.id === item.id){
                                    newSelectedSizes[`${item.id}_${item.size}`] = true;
                                }
                            })
            
                            this.setState({selectedSizes: newSelectedSizes});
                        }
                    }

                    this.setState({item});
                    this.getItemSizes(item.id);
                }
            }
            else if(this.props.location) {
                const temp = this.props.location.pathname.split('/');
                const itemId = temp[temp.length - 1];
                
                this.getItem(itemId);
            }
        }
    }

    componentWillUnmount = () => {
        this.mounted = false;
    }

    getItem = (itemId) => {
        apiGetItem(itemId)
            .then(item => {
                if(item && item.name.length > 0){
                    document.title = `${item.name} - ${item.model} | Sneaker City`;
                    
                    this.mounted && this.setState({item});

                    if(window.getCart){
                        const cartItems = window.getCart();
            
                        if(cartItems && cartItems.length > 0){
                            const newSelectedSizes = {};
            
                            cartItems.forEach(item=> {
                                if(item.id === item.id){
                                    newSelectedSizes[`${item.id}_${item.size}`] = true;
                                }
                            })
            
                            this.setState({selectedSizes: newSelectedSizes});
                        }
                    }

                    this.getItemSizes(itemId);
                }
                else {
                    this.mounted && this.setState({itemNotFound: true});
                }
            })
            .catch(error => {
                alert(error);
                this.mounted && this.setState({itemNotFound: true});
            })
    }

    getItemSizes = (itemId) => {
        apiGetItemSizes(itemId)
            .then(sizes => {
                if(sizes && sizes.length > 0){
                    this.mounted && this.setState({sizes});
                }
                else {
                    this.mounted && this.setState({sizesNotFound: true});
                }
            })
            .catch(error => {
                alert(error);
                this.mounted && this.setState({sizesNotFound: true});
            })
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false, selectedItem: {}});
    };

    handleClickSelect = (item) => {
        this.setState({selectedItem: item, open: true});
    };

    toggleCart = () => {
        const { selectedItem, selectedSizes, item } = this.state;

        let newSelectedSizes = selectedSizes;

        if(newSelectedSizes[`${item.id}_${selectedItem.size}`]){
            delete newSelectedSizes[`${item.id}_${selectedItem.size}`];

            if(window.removeFromCart){
                window.removeFromCart({...selectedItem, ...item});
            }
        }
        else {
            if(window.addToCart){
                window.addToCart({...selectedItem, ...item});
            }

            newSelectedSizes[`${item.id}_${selectedItem.size}`] = true;
        }
    
        this.setState({selectedSizes: newSelectedSizes, open: false});
    }

    
    //Formatea el releaseDate timestamp a una fecha legible
    formatReleaseDate = (timestamp) => {
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

    render() {
        const { open, sizesNotFound, itemNotFound, item, selectedItem, selectedSizes, sizes } = this.state;
        
        return (
            item ? 
                <Grid container spacing={24} style={{padding: 24}}>
                    <Grid  item xs={12} sm={12} lg={8}>
                        <img src={item.picture} alt={item.name} style={{width:'100%'}}/>
                    </Grid>
                    
                    <Grid  item xs={12} sm={12} lg={4}>
                        <div className="">
                            <div className="">
                                <h3 className="Item-Name">{item.name}</h3>
                                <h6 className="Item-Desc">{item.model}</h6>
                                <p className="Item-Details-Price">${item.price}</p>
                                <p className="Item-Details-ReleaseDate">{this.formatReleaseDate(item.releaseDate)}</p>
                            </div>

                            <p className="Item-Details-Sizes" >Talla & Cantidad</p>
                            {sizes.length > 0 ? 
                                <List className="">
                                    {sizes.map((size,index) => {
                                        return (
                                            <ListItem key={index} role={undefined} dense button onClick={()=> this.handleClickSelect(size)}>
                                                <ListItemText id={index} primary={`Talla: ${size.size} |  Cantidad: ${size.qty}`} />
                                                {selectedSizes[`${item.id}_${size.size}`] && 
                                                    <ShoppingCart />
                                                }
                                            </ListItem>
                                        );
                                    })}
                                </List>
                                
                                : sizesNotFound  ?
                                
                                <div style={{width:'200px', height:'50px', marginTop: '20px', paddingLeft:'16px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <p style={{color:'gray', margin:0}} >No hay tallas disponibles</p>
                                </div>
                                :
                                <div style={{width:'200px', height:'50px', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <CircularProgress />
                                </div>
                            }
                        </div>
                    </Grid>

                    <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={open}>
                        <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                            {item.model.toUpperCase()} / ${item.price} / Talla: {selectedItem && selectedItem.size}
                        </DialogTitle>
                        
                        <DialogContent dividers>
                            <img src={item.picture} alt={item.name} style={{width:'100%'}}/>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={this.toggleCart} color="primary">
                                {!selectedSizes[`${item.id}_${selectedItem.size}`] ?
                                    <ShoppingCart className="Shopping-Cart-Icon" />
                                    : 
                                    <RemoveShoppingCart className="Shopping-Cart-Icon" /> 
                                }

                                {!selectedSizes[`${item.id}_${selectedItem.size}`] ?
                                    "Añadir al Carrito"
                                    : 
                                    "Quitar del Carrito"
                                }
                                
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
                
                : itemNotFound ?
                
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300}}>
                    <h3>No se encuentra el item Solicitado!</h3>
                </div>
                :
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300}}>
                    <CircularProgress />
                </div>
        )
    }
}

export default ItemDetails;