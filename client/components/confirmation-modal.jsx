import React from 'react';

export default class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedProduct: false
    };
  }

  render() {
    const { product, productAdded, cart } = this.props;
    const findProduct = cart.find(item => product.id === item.id);
    if (!productAdded) {
      return (
        <div className="container confirmation-modal fadeOut">
          <div className="row">
            <div className="col mt-1">
              <h5>{product.name}</h5>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <span>{`$${product.price}`}</span>
            </div>
          </div>
          <div className="row">
            <div className="col mb-2">
              <span>QUANTITY: {findProduct ? `${findProduct.count}` : 1}</span>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <br/>
              <p>Product successfully added to cart!</p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container confirmation-modal fadeIn">
        <div className="row">
          <div className="col mt-2">
            <h4>{product.name}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <span>{`$${product.price}`}</span>
          </div>
        </div>
        <div className="row">
          <div className="col mb-2">
            <span>QUANTITY: {findProduct ? `${findProduct.count}` : 1}</span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>Product succesfully added to cart!</p>
          </div>
        </div>
      </div>
    );
  }
}
