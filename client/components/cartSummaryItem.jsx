import React from 'react';

export default class CartSummaryItem extends React.Component {
  render() {
    let productTotal = null;
    if (this.props.cartItemCount > 1) {
      productTotal = this.props.cartItemPrice * this.props.cartItemCount;
    } else {
      productTotal = this.props.cartItemPrice;
    }
    return (
      <>
        <div className="offset-2 col-8 mb-3">
          <div className="card">
            <div className="card-horizontal">
              <div className="img-square-wrapper">
                <img className="cartImageDiv" src={this.props.cartItemImage} alt="Card image cap"></img>
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
