import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      cardNumber: null,
      userAddress: '',
      cardValidated: true,
      nameValidated: true,
      addressValidated: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit() {
    const userInfo = {
      userName: this.state.userName,
      cardNumber: parseInt(this.state.cardNumber),
      userAddress: this.state.userAddress
    };
    this.props.placeOrder(userInfo);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    let total = this.props.cartTotal().toFixed(2);
    return (
      <form>
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
              <input onChange={this.handleChange} name="userName" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Full Name"></input>
              <small id="emailHelp" className="form-text text-muted">{`We'll never share your email with anyone else.`}</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Card Information</label>
              <input onChange={this.handleChange} name="cardNumber" type="text" className="form-control" id="exampleInputPassword1" placeholder="Credit Card Number"></input>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Shipping Address</label>
              <textarea onChange={this.handleChange} name="userAddress" className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="offset-2 col-8 d-flex justify-content-between">
            <button className="btn btn-warning backToListBtn mb-2" onClick={() => this.props.backToCatalog('catalog', {})}>Continue Shopping</button>
            <button onClick={this.handleSubmit} type="submit" className="btn btn-success mb-2">Place Order</button>
          </div>
        </div>
      </form>
    );
  }
}
