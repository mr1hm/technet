import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cartSummary';
import CheckoutForm from './checkoutForm';
import Categories from './categories';
import GamingComputers from './gaming-computers';
import Hardware from './hardware';
import Misc from './miscellaneous';
import Accessories from './accessories';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      cartTotal: null,
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.getCartTotal = this.getCartTotal.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartTotal() {
    let totalCost = 0;
    for (let i = 0; i < this.state.cart.length; i++) {
      let price = this.state.cart[i].price * this.state.cart[i].count;
      totalCost += price;
    }
    return totalCost;
  }

  placeOrder(userInfo) {
    const myInit = {
      method: 'POST',
      body: JSON.stringify(userInfo),
      header: {
        'Content-Type': 'application/json'
      }
    };
    fetch('/api/orders.php', myInit)
      .then(response => response.json())
      .then(userInfo => this.setState({
        cart: this.state.cart.concat(userInfo)
      }))
      .then(() => this.setState({
        cart: []
      }))
      .catch(error => console.error(error.message));
    this.setState({
      view: { name: 'catalog', params: {} }
    });
  }

  addToCart(product) {
    const myInit = {
      method: 'POST',
      body: JSON.stringify(product),
      header: {
        'Content-Type': 'application/json'
      }
    };
    fetch('/api/cart.php', myInit)
      .then(response => response.json())
      .then(productItem => {
        let cart = this.state.cart.slice();
        cart.push(productItem);
        this.setState({ cart });
      })
      .catch(error => console.error(error));
  }

  deleteFromCart(productID) {
    const cart = this.state.cart.slice();
    const myInit = {
      method: 'DELETE',
      body: JSON.stringify({ id: productID }),
      header: {
        'Content-Type': 'application/json'
      }
    };
    fetch('/api/cart.php', myInit)
      .then(response => response.json())
      .then(cartItem => {
        const itemIndex = cart.findIndex(item => item.id === productID);
        cart.splice(itemIndex, 1);
        this.setState({ cart });
      })
      .catch(error => console.error(error));
  }

  getCartItems() {
    fetch('/api/cart.php')
      .then(response => response.json())
      .then(cartData => this.setState({
        cart: cartData
      }))
      .catch(error => console.error(error.message));
  }

  setView(name, params) {
    this.setState({
      view: { name: name, params: params }
    });
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div className="container-fluid main">
          <Header currentView={this.state.view.name} text="techNet" setViewCart={this.setView} cartItemCount={this.state.cart.length}/>
          <Categories setViewCategory={this.setView} cartItemCount={this.state.cart.length} />
          <ProductList currentView={this.state.view.name} setView={this.setView} />
        </div>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <div className="container-fluid main">
          <Header currentView={this.state.view.name} text="techNet" setViewCart={this.setView} cartItemCount={this.state.cart.length} />
          <ProductDetails getCartItems={this.getCartItems} setView={this.setView} productId={this.state.view.params.id} addToCart={this.addToCart} />
        </div>
      );
    } else if (this.state.view.name === 'cart') {
      if (this.state.cart.length === 0) {
        return (
          <div className="container-fluid main">
            <Header currentView={this.state.view.name} text="Cart Summary" setViewCart={this.setView} cartItemCount={this.state.cart.length} />
            <CartSummary text="There are no items in your cart" cartSummary={this.state.cart} clickHandler={this.setView} />
          </div>
        );
      }
      return (
        <div className="container-fluid main">
          <Header currentView={this.state.view.name} text="Cart Summary" setViewCart={this.setView} cartItemCount={this.state.cart.length} />
          <CartSummary deleteFromCart={this.deleteFromCart} cartTotal={this.getCartTotal} cartSummary={this.state.cart} clickHandler={this.setView} />
        </div>
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <div className="container-fluid main">
          <Header currentView={this.state.view.name} text="Checkout" setViewCart={this.setView} cartItemCount={this.state.cart.length} />
          <CheckoutForm placeOrder={this.placeOrder} cartTotal={this.getCartTotal} cartSummary={this.state.cart} backToCatalog={this.setView} />
        </div>
      );
    } else if (this.state.view.name === 'computers') {
      return (
        <div className="container-fluid main">
          <Header currentView={this.state.view.name} text="Custom Desktops" setViewCart={this.setView} cartItemCount={this.state.cart.length} />
          <Categories setViewCategory={this.setView} cartItemCount={this.state.cart.length} />
          <GamingComputers setViewPass={this.setView} addToCart={this.addToCart} cartTotal={this.getCartTotal} cartSummary={this.state.cart} backToCatalog={this.setView} />
        </div>
      );
    } else if (this.state.view.name === 'hardware') {
      return (
        <div className="container-fluid main">
          <Header currentView={this.state.view.name} text="Computer Hardware" setViewCart={this.setView} cartItemCount={this.state.cart.length} />
          <Categories setViewCategory={this.setView} cartItemCount={this.state.cart.length} />
          <Hardware setViewPass={this.setView} addToCart={this.addToCart} cartTotal={this.getCartTotal} cartSummary={this.state.cart} backToCatalog={this.setView} />
        </div>
      );
    } else if (this.state.view.name === 'misc') {
      return (
        <div className="container-fluid main">
          <Header currentView={this.state.view.name} text="Computer Hardware" setViewCart={this.setView} cartItemCount={this.state.cart.length} />
          <Categories setViewCategory={this.setView} cartItemCount={this.state.cart.length} />
          <Misc addToCart={this.addToCart} cartTotal={this.getCartTotal} cartSummary={this.state.cart} backToCatalog={this.setView} />
        </div>
      );
    } else if (this.state.view.name === 'accessories') {
      return (
        <div className="container-fluid main">
          <Header currentView={this.state.view.name} text="Accessories" setViewCart={this.setView} cartItemCount={this.state.cart.length} />
          <Categories setViewCategory={this.setView} cartItemCount={this.state.cart.length} />
          <Accessories addToCart={this.addToCart} cartTotal={this.getCartTotal} cartSummary={this.state.cart} backToCatalog={this.setView} />
        </div>
      );
    }
  }
}
