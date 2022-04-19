import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import AddressForm from '../components/AddressForm';
import PaymentForm from '../components/PaymentForm';
import ReviewOrder from '../components/ReviewOrder';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            <Link color="inherit" href="/">
                Sneaker City {' ©'}
            </Link>{' '}
            {new Date().getFullYear()}
            {'  Derechos Reservados.'}
        </Typography>
    )
}

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        }
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        }
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    }
}));
  
const steps = ['Direccion de Envio', 'Detalles de Pago', 'Revisa tu Orden'];
  
function getStepContent(step) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <ReviewOrder />;
        default:
            throw new Error('Paso Desconosido');
    }
}

export default function Checkout() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
  
    document.title = `Checkout | Sneaker City`;

    const handleNext = () => {
        if(activeStep === steps.length - 1){
            if(window.emptyCart){
                window.emptyCart();
            }
            
            setActiveStep(activeStep + 1);
        }
        else if(activeStep === 0){
            if(window.address){
                if(!window.address.firstname  || (window.address.firstname && !window.address.firstname.trim())){
                    alert('Nombre requerido.')
                }
                else if(!window.address.lastname || (window.address.lastname && !window.address.lastname.trim())){
                    alert('Apellido requerido.')
                }
                else if(!window.address.address1 || (window.address.address1 && !window.address.address1.trim())){
                    alert('Direccion requerido.')
                }
                else if(!window.address.city || (window.address.city && !window.address.city.trim())){
                    alert('Ciudad requerido.')
                }
                else if(!window.address.zip || (window.address.zip && !window.address.zip.trim())){
                    alert('Codigo Postal requerido.')
                }
                else if(!window.address.country || (window.address.country && !window.address.country.trim())){
                    alert('Pais requerido.')
                }
                else {
                    setActiveStep(activeStep + 1);
                }
            }
            else {
                alert('Ingrese su Direccion.')
            }
        }
        else if(activeStep === 1){
            if(window.paymentCard){
                if(!window.paymentCard.name  || (window.paymentCard.name && !window.paymentCard.name.trim())){
                    alert('Titular de la Tarjeta requerido.')
                }
                else if(!window.paymentCard.number || (window.paymentCard.number && !window.paymentCard.number.trim())){
                    alert('Numero de la Tarjeta requerido.')
                }
                else if(!window.paymentCard.expiryDate || (window.paymentCard.expiryDate && !window.paymentCard.expiryDate.trim())){
                    alert('Expiracion de la Tarjeta requerido.')
                }
                else if(!window.paymentCard.cvv || (window.paymentCard.cvv && !window.paymentCard.cvv.trim())){
                    alert('CVV de la Tarjeta requerido.')
                }
                else {
                    setActiveStep(activeStep + 1);
                }
            }
            else {
                alert('Ingrese los detalles de su Tarjeta.')
            }
        }
        else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Gracias por su Compra.
                                </Typography>

                                <Typography variant="subtitle1">
                                    Su orden es la numero #5558546. Se le envio un correo electronico con los detalles de la compra
                                    y se le notificará cuando esta sea despachada.
                                </Typography>
                            </React.Fragment>
                        ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            
                            <div className={classes.buttons}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} className={classes.button}>
                                        Anterior
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}>
                                    {activeStep === steps.length - 1 ? 'Ordenar' : 'Siguiente'}
                                </Button>
                            </div>
                        </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
                
                <Copyright />
            </main>
        </React.Fragment>
    );
}