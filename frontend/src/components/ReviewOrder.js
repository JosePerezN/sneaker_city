import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: '700',
    },
    title: {
        marginTop: theme.spacing(2),
    }
}))

export default function ReviewOrder() {
    const classes = useStyles();
    
    let cartItems = [];
    let total = 0;

    //se llama a la funcion global para obtener los items en el carrito
    if(window.getCart){
        cartItems = window.getCart();

        if(cartItems && cartItems.length > 0){
            cartItems.forEach(item=> {
                total += item.price;
            })
        }
    }

    // se usa para guardar los detalles de la tarjeta de pago que estan en el objeto window
    const payments = [
        { name: 'Tipo Tarjeta', detail: 'Maestro' },
        { name: 'Titular Tarjeta', detail: (window && window.paymentCard && window.paymentCard.name) ? window.paymentCard.name : "" },
        { name: 'Numero Tarjeta', detail: (window && window.paymentCard && window.paymentCard.number) ? `xxxx-xxxx-xxxx-${window.paymentCard.number.slice(12)}` : "" },
        { name: 'Fecha Expiracion', detail: (window && window.paymentCard && window.paymentCard.expiryDate) ? window.paymentCard.expiryDate : "" },
    ];

    const address = window.address;

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Resumen de la Orden
            </Typography>

            <List disablePadding>
                {cartItems.map(item => (
                    <ListItem className={classes.listItem} key={item.name}>
                        <ListItemText primary={item.name} secondary={`${item.model} (Size: ${item.size})`} />
                        <Typography variant="body2">$ {item.price}</Typography>
                    </ListItem>
                ))}
                
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    
                    <Typography variant="subtitle1" className={classes.total}>
                        $ {total}
                    </Typography>
                </ListItem>
            </List>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Envio
                    </Typography>
                    <Typography gutterBottom>{address && `${address.firstname}`} {address && `${address.lastname}`}</Typography>
                    <Typography gutterBottom>{address && `${address.address1}`} {address && address.address2 && ` , ${address.address2}`}</Typography>
                    <Typography gutterBottom>{address && `${address.city}, ${address.zip}, ${window.address.country}`}</Typography>
                </Grid>

                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Detalles de Pago
                    </Typography>
                    
                    <Grid container>
                        {payments.map(payment => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}