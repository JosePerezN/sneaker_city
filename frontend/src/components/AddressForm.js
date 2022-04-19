import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class AddressForm extends Component {
    constructor(){
        super();

        this.state = {
            firstname: '',
            lastname: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
            country: ''
        }
    }

    componentDidMount = () => {
        // se usa window.address como variable global para guardar los datos
        if(window.address){
            this.setState({
                firstname: window.address.firstname || '',
                lastname: window.address.lastname || '',
                address1: window.address.address1 || '',
                address2: window.address.address2 || '',
                city: window.address.city || '',
                state: window.address.state || '',
                zip: window.address.zip || '',
                country: window.address.country || ''
            })
        }
    }

    render(){
        const { address1, address2, city, country, firstname, lastname, state, zip } = this.state;
        return (
            <div>
                <Typography variant="h6" gutterBottom>
                    Direccion de Envio
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="Nombre"
                            fullWidth
                            autoComplete="fname"
                            value={firstname}
                            onChange={(event)=> {
                                this.setState({firstname: event.target.value})
                                if(window.address){
                                    window.address.firstname = event.target.value;
                                }
                                else {
                                    window.address = {
                                        firstname: event.target.value
                                    }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Apellido"
                            fullWidth
                            autoComplete="lname"
                            value={lastname}
                            onChange={(event)=> {
                                this.setState({lastname: event.target.value});

                                if(window.address){
                                    window.address.lastname = event.target.value;
                                }
                                else {
                                    window.address = {
                                        lastname: event.target.value
                                    }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address1"
                            name="address1"
                            label="Direccion 1"
                            fullWidth
                            autoComplete="billing address-line1"
                            value={address1}
                            onChange={(event)=> {
                                this.setState({address1: event.target.value});

                                if(window.address){
                                    window.address.address1 = event.target.value;
                                }
                                else {
                                    window.address = {
                                        address1: event.target.value
                                    }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="address2"
                            name="address2"
                            label="Direccion 2"
                            fullWidth
                            autoComplete="billing address-line2"
                            value={address2}
                            onChange={(event)=> {
                                this.setState({address2: event.target.value});

                                if(window.address){
                                    window.address.address2 = event.target.value;
                                }
                                else {
                                    window.address = {
                                        address2: event.target.value
                                    }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="Ciudad"
                            fullWidth
                            autoComplete="billing address-level2"
                            value={city}
                            onChange={(event)=> {
                                this.setState({city: event.target.value});

                                if(window.address){
                                    window.address.city = event.target.value;
                                }
                                else {
                                    window.address = {
                                        city: event.target.value
                                    }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            id="state" 
                            name="state" 
                            label="Departamento" 
                            fullWidth
                            value={state}
                            onChange={(event)=> {
                                this.setState({state: event.target.value});

                                if(window.address){
                                    window.address.state = event.target.value;
                                }
                                else {
                                    window.address = {
                                        state: event.target.value
                                    }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="zip"
                            name="zip"
                            label="Codigo Postal"
                            fullWidth
                            autoComplete="billing postal-code"
                            value={zip}
                            onChange={(event)=> {
                                this.setState({zip: event.target.value});

                                if(window.address){
                                    window.address.zip = event.target.value;
                                }
                                else {
                                    window.address = {
                                        zip: event.target.value
                                    }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="country"
                            name="country"
                            label="Pais"
                            fullWidth
                            autoComplete="billing country"
                            value={country}
                            onChange={(event)=> {
                                this.setState({country: event.target.value});
                                
                                if(window.address){
                                    window.address.country = event.target.value;
                                }
                                else {
                                    window.address = {
                                        country: event.target.value
                                    }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Usar esta direccion para los detalles de pago"
                    />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default AddressForm;