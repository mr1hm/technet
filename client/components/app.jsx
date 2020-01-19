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
      deleteItem: false,
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
    this.getCartItems = this.getCartItems.bind(this);
    this.handleCartIncrementClick = this.handleCartIncrementClick.bind(this);
    this.handleCartDecrementClick = this.handleCartDecrementClick.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  handleCartIncrementClick(id) {
    let cart = this.state.cart.slice();
    const findIndex = cart.findIndex(item => item.id === id);
    if (~findIndex) cart[findIndex].count = parseInt(cart[findIndex].count) + 1;
    const init = {
      method: 'POST',
      body: JSON.stringify({ id: cart[findIndex].id, quantity: cart[findIndex].count })
    };
    fetch(`/api/cart.php`, init)
      .then(res => res.json())
      .then(quantity => {
        this.setState({ cart });
      })
      .catch(err => console.error(err));
  }

  handleCartDecrementClick(id) {
    let cart = this.state.cart.slice();
    const findIndex = cart.findIndex(item => item.id === id);
    if (~findIndex) cart[findIndex].count = parseInt(cart[findIndex].count) - 1;
    const init = {
      method: 'POST',
      body: JSON.stringify({ id: cart[findIndex].id, quantity: cart[findIndex].count })
    };
    fetch(`/api/cart.php`, init)
      .then(res => res.json())
      .then(quantity => {
        this.setState({ cart });
      })
      .catch(err => console.error(err));
  }

  getCartTotal() {
    return this.state.cart.reduce((acc, val) => {
      if (val.price.includes(',')) {
        let priceNoComma = val.price.replace(/,/g, '');
        let price = parseFloat(priceNoComma) * parseInt(val.count);
        return acc + price;
      } else {
        let price = parseFloat(val.price) * parseInt(val.count);
        return acc + price;
      }
    }, 0);
  }

  placeOrder(userInfo) {
    const order = { name: userInfo.userName, address: `${userInfo.userAddress} ${userInfo.userCity}, ${userInfo.userState} ${userInfo.userZip}` };
    fetch(`/api/orders.php`, { method: 'POST', body: JSON.stringify(order), header: { 'Content-Type': 'application/json' } })
      .then(res => res.json())
      .then(user => this.setState({ cart: [] }))
      .catch(err => console.error(err));
    this.setState({
      view: { name: 'catalog', params: {} }
    });
  }

  addToCart(product) {
    delete product.category;
    product = { ...product, count: 1 };
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
        const productIndex = cart.findIndex(item => item.id === productItem.id);
        ~productIndex ? cart[productIndex].count = parseInt(cart[productIndex].count) + 1 : cart.push(productItem);
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
          <ProductDetails cart={this.state.cart} getCartItems={this.getCartItems} setView={this.setView} productId={this.state.view.params.id} category={this.state.view.params.category} addToCart={this.addToCart} />
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
          <CartSummary deleteItem={this.state.deleteItem} handleDeleteItem={this.handleDeleteItemClick} handleIncrement={this.handleCartIncrementClick} handleDecrement={this.handleCartDecrementClick} getCartItems={this.getCartItems} deleteFromCart={this.deleteFromCart} cartTotal={this.getCartTotal} cartSummary={this.state.cart} clickHandler={this.setView} />
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
          <Header currentView={this.state.view.name} text="Miscellaneous" setViewCart={this.setView} cartItemCount={this.state.cart.length} />
          <Categories setViewCategory={this.setView} cartItemCount={this.state.cart.length} />
          <Misc setViewPass={this.setView} addToCart={this.addToCart} cartTotal={this.getCartTotal} cartSummary={this.state.cart} backToCatalog={this.setView} />
        </div>
      );
    } else if (this.state.view.name === 'accessories') {
      return (
        <div className="container-fluid main">
          <Header currentView={this.state.view.name} text="Accessories" setViewCart={this.setView} cartItemCount={this.state.cart.length} />
          <Categories setViewCategory={this.setView} cartItemCount={this.state.cart.length} />
          <Accessories setViewPass={this.setView} addToCart={this.addToCart} cartTotal={this.getCartTotal} cartSummary={this.state.cart} backToCatalog={this.setView} />
        </div>
      );
    }
  }
}
