import React from 'react';
import ConfirmationModal from './confirmation-modal';

export default class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteItem: false
    };
    this.handleDeleteItemClick = this.handleDeleteItemClick.bind(this);
  }

  handleDeleteItemClick() {
    this.setState({ deleteItem: !this.state.deleteItem });
  }

  render() {
    let productTotal = null;
    let priceNoComma = null;
    if (this.props.cartItemCount > 1 || this.props.cartItemPrice.includes(',')) {
      priceNoComma = this.props.cartItemPrice.replace(/,/g, '');
      productTotal = parseFloat(priceNoComma) * parseInt(this.props.cartItemCount);
      productTotal = productTotal.toFixed(2);
    } else {
      productTotal = parseFloat(this.props.cartItemPrice);
      productTotal = productTotal.toFixed(2);
    }
    return (
      <>
        {this.state.deleteItem ? <ConfirmationModal deleteItem={this.state.deleteItem} product={this.props.product} handleDeleteItem={this.handleDeleteItem} cartProduct={this.props.product} deleteFromCart={this.props.deleteFromCart} productID={this.props.cartItemID} /> : null}
        <div className="offset-2 col-8 mb-3">
          <div className="card cartCard">
            <div className="card-horizontal">
              <div className="img-square-wrapper">
                <img className="cartImageDiv" src={this.props.cartItemImage} alt="image"></img>
              </div>
              <div className="card-body">
                <h4 className="card-title">{this.props.cartItemName}</h4>
                {this.props.cartItemCount > 1 ? <p className="itemCount">QUANTITY: <button onClick={() => this.props.handleDecrement(this.props.cartItemID)} className="decrementBtn"><i className="fas fa-minus-circle decrementIcon"></i></button>{this.props.cartItemCount}<button onClick={() => this.props.handleIncrement(this.props.cartItemID)} name="increment" className="incrementBtn"><i className="fas fa-plus-circle incrementIcon"></i></button></p>
                  : <p className="itemCount">QUANTITY: {this.props.cartItemCount}<button onClick={() => this.props.handleIncrement(this.props.cartItemID)} className="incrementBtn"><i className="fas fa-plus-circle incrementIcon"></i></button></p>}
                <p className="cartItemPriceTag">{`$${productTotal}`}</p>
                <p className="card-text">{this.props.cartItemInfo}</p>
                <button className="btn btn-danger" onClick={this.handleDeleteItemClick}>Remove</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
