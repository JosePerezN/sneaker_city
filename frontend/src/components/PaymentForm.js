import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class PaymentForm extends Component {
    constructor(){
        super();

        this.state = {
            cardname: '',
            cardnumber: '',
            expirydate: '',
            cvv: ''
        }
    }

    componentDidMount = () => {
        // se usa window.paymentCard como variable global para guardar los datos
        if(window.paymentCard){
            this.setState({
                cardname: window.paymentCard.name || '',
                cardnumber: window.paymentCard.number || '',
                expirydate: window.paymentCard.expiryDate || '',
                cvv: window.paymentCard.cvv || '',
            })
        }
    }

    render(){
        const { cardname, cardnumber, cvv, expirydate } = this.state;

        return (
            <div>
                <Typography variant="h6" gutterBottom>
                    Metodo de Pago
                </Typography>
                <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField 
                        required 
                        id="cardName" 
                        label="Titular de la Tarjeta" 
                        fullWidth
                        value={cardname} 
                        onChange={(event)=> {
                            const value = event.target.value;
                            if(/^[a-zA-Z ]+$/.test(value) || !value){
                                this.setState({cardname: value});

                                if(window.paymentCard){
                                    window.paymentCard.name = value;
                                }
                                else {
                                    window.paymentCard = {
                                        name: value
                                    }
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                        required 
                        id="cardNumber" 
                        label="Numero de la Tarjeta" 
                        fullWidth
                        value={cardnumber}
                        onChange={(event)=> {
                            const value = event.target.value;
                            if(value.length < 17 && ((/^[0-9]+$/.test(value))  || !value)){
                                this.setState({cardnumber: value});

                                if(window.paymentCard){
                                    window.paymentCard.number = value;
                                }
                                else {
                                    window.paymentCard = {
                                        number: value
                                    }
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                        required 
                        id="expDate" label="Fecha de Expiracion" 
                        fullWidth 
                        value={expirydate}
                        onChange={(event)=> {
                            const value = event.target.value;
                            if(value.length < 8 && ((/^[0-9/]+$/.test(value))  || !value)){
                                this.setState({expirydate: value});

                                if(window.paymentCard){
                                    window.paymentCard.expiryDate = value;
                                }
                                else {
                                    window.paymentCard = {
                                        expiryDate: value
                                    }
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cvv"
                        label="CVV"
                        helperText="CVV de la Tarjeta"
                        fullWidth
                        value={cvv}
                        onChange={(event)=> {
                            const value = event.target.value;
                            if(value.length < 4 && ((/^[0-9]+$/.test(value))  || !value)){
                                this.setState({cvv: value});

                                if(window.paymentCard){
                                    window.paymentCard.cvv = value;
                                }
                                else {
                                    window.paymentCard = {
                                        cvv: value
                                    }
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                        label="Recordar los detalles de esta tarjeta para la proxima compra"
                    />
                </Grid>
            </Grid>
            </div>
        )
    }
}

export default PaymentForm;