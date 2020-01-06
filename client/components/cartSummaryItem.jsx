import React from 'react';

export default class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
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
        <div className="offset-2 col-8 mb-3">
          <div className="card">
            <div className="card-horizontal">
              <div className="img-square-wrapper">
                <img className="cartImageDiv" src={this.props.cartItemImage} alt="image"></img>
              </div>
              <div className="card-body">
                <h4 className="card-title">{this.props.cartItemName}</h4>
                <p className="itemCount">{`QUANTITY: ${this.props.cartItemCount}`}</p>
                <p className="cartItemPriceTag">{`$${productTotal}`}</p>
                <p className="card-text">{this.props.cartItemInfo}</p>
                <button className="btn btn-danger" onClick={() => this.props.deleteFromCart(this.props.cartItemID)}>Remove</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
