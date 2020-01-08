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
        this.setState(prevState => ({
          userInfo: { ...prevState.userInfo, [name]: value },
          cardValidated: true
        }));
      } else {
        this.setState({ cardValidated: false });
      }
    }
    if (name === 'userName') {
      if (/[^0-9!?=][a-zA-Z]{2,}/.test(value)) {
        this.setState(prevState => ({
          userInfo: { ...prevState.userInfo, [name]: value },
          nameValidated: true
        }));
      } else {
        this.setState({ nameValidated: false });
      }
    }
    if (name === 'userAddress') {
      if (/[^$!@#-=%&*][a-zA-Z0-9]{1,}/.test(value)) {
        this.setState(prevState => ({
          userInfo: { ...prevState.userInfo, [name]: value },
          addressValidated: true
        }));
      } else {
        this.setState({ addressValidated: false });
      }
    }
    if (name === 'userCity') {
      if (/[^0-9$!@#-=%&*][a-zA-Z]{1,}/.test(value)) {
        this.setState(prevState => ({
          userInfo: { ...prevState.userInfo, [name]: value },
          cityValidated: true
        }));
      } else {
        this.setState({ cityValidated: false });
      }
    }
    if (name === 'userState') {
      if (/[^0-9$!@#-=%&*][a-zA-Z]{1,}/.test(value)) {
        this.setState(prevState => ({
          userInfo: { ...prevState.userInfo, [name]: value },
          stateValidated: true
        }));
      } else {
        this.setState({ stateValidated: false });
      }
    }
    if (name === 'userZip') {
      if (/[0-9]{5,5}/.test(value)) {
        this.setState(prevState => ({
          userInfo: { ...prevState.userInfo, [name]: value },
          zipValidated: true
        }));
      } else {
        this.setState({ zipValidated: false });
      }
    }
  }

  render() {
    const { userInfo, checkout, nameValidated, cardValidated, addressValidated, cityValidated, stateValidated, zipValidated } = this.state;
    let total = this.props.cartTotal().toFixed(2);
    return (
      <form>
        {checkout ? <ConfirmationModal userInfo={userInfo} handleOrder={this.handleOrder} backToCatalog={this.props.backToCatalog} placeOrder={this.props.placeOrder} checkout={checkout} /> : null}
        <div className="row">
          <div className='col-12 order-total'>
            Order Total: {`$${total}`}
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="offset-2 col-8">
            <small id="emailHelp" className="form-text text-muted">{`All fields below are required before proceeding with placing your order.`}</small>
            <small id="emailHelp" className="form-text text-muted">{`We'll never share your information with anyone else.`}</small>
            <h4>Personal Information</h4>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Name</label>
              <br/>
              {nameValidated && userInfo.userName !== '' ? null : <span style={{ color: 'red', fontSize: '12px' }}>Please enter a valid name</span>}
              <input onChange={this.handleChange} name="userName" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Full Name"></input>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Card Information</label>
              <br/>
              {cardValidated && userInfo.cardNumber !== null ? null : <span style={{ color: 'red', fontSize: '12px' }}>Please enter a valid credit card number</span>}
              <input onChange={this.handleChange} name="cardNumber" type="text" className="form-control" id="exampleInputPassword1" placeholder="Credit Card Number"></input>
            </div>
            <h4>Shipping Information</h4>
            <div className="form-group">
              <label htmlFor="userAddress">Address</label>
              <br/>
              {addressValidated && userInfo.userAddress !== '' ? null : <span style={{ color: 'red', fontSize: '12px' }}>Please enter a valid address (Street number and Street name)</span>}
              <input onChange={this.handleChange} type="text" name="userAddress" className="form-control" id="userAddress" rows="3"></input>
            </div>
            <div className="form-group">
              <label htmlFor="userCity">City</label>
              <br />
              {cityValidated && userInfo.userCity !== '' ? null : <span style={{ color: 'red', fontSize: '12px' }}>Please enter a valid city</span>}
              <input onChange={this.handleChange} name="userCity" className="form-control" id="userCity" rows="3"></input>
            </div>
            <div className="form-group">
              <label htmlFor="userState">State</label>
              <br />
              {stateValidated && userInfo.userState !== '' ? null : <span style={{ color: 'red', fontSize: '12px' }}>Please enter a valid state</span>}
              <input onChange={this.handleChange} name="userState" className="form-control" id="userState" rows="3"></input>
            </div>
            <div className="form-group">
              <label htmlFor="userZip">Zip Code</label>
              <br />
              {zipValidated && userInfo.userZip !== '' ? null : <span style={{ color: 'red', fontSize: '12px' }}>Please enter a valid zip code</span>}
              <input onChange={this.handleChange} type="text" name="userZip" className="form-control" id="userZip" rows="3"></input>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="offset-2 col-8 d-flex justify-content-between">
            <button className="btn btn-warning backToListBtn mb-2" onClick={() => this.props.backToCatalog('catalog', {})}>Continue Shopping</button>
            {!nameValidated || !cardValidated || !addressValidated || !cityValidated || !stateValidated || !zipValidated ? <button onClick={e => e.preventDefault()} className="btn btn-danger mb-2"><i className="fas fa-exclamation-circle"></i></button> : <button onClick={this.handleOrder} type="button" className="btn btn-success mb-2">Place Order</button>}
          </div>
        </div>
      </form>
    );
  }
}
