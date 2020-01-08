import React from 'react';
import ConfirmationModal from './confirmation-modal';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        userName: '',
        cardNumber: null,
        userAddress: '',
        userCity: '',
        userState: '',
        userZip: ''
      },
      cardValidated: false,
      nameValidated: false,
      addressValidated: false,
      cityValidated: false,
      stateValidated: false,
      zipValidated: false,
      checkout: false
    };
    this.handleOrder = this.handleOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleOrder() {
    this.setState({ checkout: !this.state.checkout });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'cardNumber') {
      if (/[0-9]{16,16}/.test(value)) {
        this.setState({ cardValidated: true, [name]: value });
      } else {
        this.setState({ cardValidated: false });
      }
    }
    if (name === 'userName') {
      if (/[^^0-9!?=][a-zA-Z]{2,}/.test(value)) {
        this.setState({ nameValidated: true, [name]: value });
      } else {
        this.setState({ nameValidated: false });
      }
    }
    if (name === 'userAddress') {
      if (/[a-zA-Z0-9]/.test(value)) {
        this.setState({ addressValidated: true, [name]: value });
      } else {
        this.setState({ addressValidated: false });
      }
    }
  }

  render() {
    const { checkout, nameValidated, cardValidated, addressValidated } = this.state;
    let total = this.props.cartTotal().toFixed(2);
    return (
      <form>
        {checkout ? <ConfirmationModal handleOrder={this.handleOrder} backToCatalog={this.props.backToCatalog} placeOrder={this.props.placeOrder} checkout={checkout} /> : null}
        <div className="row">
          <div className='col-12 order-total'>
            Order Total: {`$${total}`}
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="offset-2 col-8">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Name</label>
              <br/>
              {nameValidated ? null : <span style={{ color: 'red', fontSize: '12px' }}>Please enter a valid name</span>}
              <input onChange={this.handleChange} name="userName" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Full Name"></input>
              <small id="emailHelp" className="form-text text-muted">{`We'll never share your information with anyone else.`}</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Card Information</label>
              <br/>
              {cardValidated ? null : <span style={{ color: 'red', fontSize: '12px' }}>Please enter a valid credit card number</span>}
              <input onChange={this.handleChange} name="cardNumber" type="text" className="form-control" id="exampleInputPassword1" placeholder="Credit Card Number"></input>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Shipping Address</label>
              <br/>
              {addressValidated ? null : <span style={{ color: 'red', fontSize: '12px' }}>Please enter a valid address</span>}
              <textarea onChange={this.handleChange} name="userAddress" className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="offset-2 col-8 d-flex justify-content-between">
            <button className="btn btn-warning backToListBtn mb-2" onClick={() => this.props.backToCatalog('catalog', {})}>Continue Shopping</button>
            {!nameValidated || !cardValidated || !addressValidated ? <button className="btn btn-danger mb-2"><i className="fas fa-exclamation-circle"></i></button> : <button onClick={this.handleOrder} type="button" className="btn btn-success mb-2">Place Order</button>}
          </div>
        </div>
      </form>
    );
  }
}
