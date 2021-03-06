import React from 'react';
import CartSummaryItem from './cartSummaryItem';

export default class CartSummary extends React.Component {

  render() {
    if (this.props.cartSummary.length === 0) {
      return (
        <div className="offset-2 col-8 cartSummaryOffset">
          <button className="btn btn-warning backToListBtn mt-2 mb-2" onClick={() => this.props.clickHandler('catalog', {})}>Back To Catalog</button>
          <h1>{this.props.text}</h1>
        </div>
      );
    } else {
      return (
        <>
        <div className="row">
          <div className="offset-2 col-8 mb-1">
            <button className="btn btn-warning backToListBtn mt-2 mb-2" onClick={() => this.props.clickHandler('catalog', {})}>Back To Catalog</button>
          </div>
        </div>
            {this.props.cartSummary.map(cartItem =>
              <CartSummaryItem
                product={cartItem}
                key={cartItem.id}
                cartItemID={cartItem.id}
                cartItemImage={cartItem.mainImage}
                cartItemInfo={cartItem.shortDescription}
                cartItemName={cartItem.name}
                cartItemPrice={cartItem.price}
                cartItemCount={cartItem.count}
                setView={this.props.clickHandler}
                deleteFromCart={this.props.deleteFromCart}
                cart={this.props.cartSummary}
                handleDecrement={this.props.handleDecrement}
                handleIncrement={this.props.handleIncrement}
                handleDeleteItem={this.props.handleDeleteItem}
                deleteItem={this.props.deleteItem}
              />
            )}
          <div className="row">
            <div className="total-price offset-2 col-8 d-flex justify-content-between mb-1">
              TOTAL: {`$${this.props.cartTotal().toFixed(2)}`}
              <button className="btn btn-primary p-1" onClick={() => this.props.clickHandler('checkout', {})}>Checkout</button>
            </div>
          </div>
        </>
      );
    }
  }
}
