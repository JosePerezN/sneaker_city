import React, { Component } from 'react';
import NavBar from './components/NavBar';
import ItemList from './components/ItemList';
import ItemDetails from './routes/ItemDetails';
import Cart from './routes/Cart';
import CheckOut from './routes/CheckOut';
import NotFound from './routes/NotFound';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
    constructor(){
        super();
    
        this.state = {
            cartItems: []
        }

        //se agregan las funciones al objeto global window de forma 
        //que sean accesibles desde cualquier componente

        window.addToCart = (item) => {
            let temp = this.state.cartItems;
            temp.push(item);

            this.setState({cartItems: temp});
        }

        window.removeFromCart = (item) => {
            const temp = this.state.cartItems.filter(item => {
                if((item.id === item.id) && (item.size === item.size)){
                    return false;
                }
                
                return true;
            });
      
            this.setState({cartItems: temp});
            console.log(temp);
        }

        window.getCart = () => {
            return this.state.cartItems;
        }
      
        window.emptyCart = () => {
            this.setState({cartItems: []})
        }
    }

    render(){
        const { cartItems } = this.state;
    
        return (
            <Router>
                <div>
                    <NavBar cartItemsCount={cartItems.length}/>
                    
                    <Switch>
                        <Route path="/" exact component={ItemList} />
                        <Route path="/items/:brand/:id" component={ItemDetails}/>
                        <Route path="/cart" component={Cart} />
                        <Route path="/checkout" component={CheckOut} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;