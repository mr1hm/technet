import React from 'react';

export default class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedProduct: false
    };
  }

  render() {
    const { deleteFromCart, handleDeleteItem, cartProduct, product, productAdded, cart, deleteItem } = this.props;
    if (deleteItem) {
      return (
        <div className="container mt-3 mb-3 delete-confirmation-modal">
          <div className="row">
            <div className="col mt-1">
              <h5>{cartProduct.name}</h5>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <span>Are you sure you want to remove this product?</span>
            </div>
          </div>
          <div className="row">
            <div className="col mt-2">
              <button onClick={() => deleteFromCart(product.id)} className="btn btn-danger">Confirm</button>
            </div>
            <div className="col mt-2 d-flex justify-content-end">
              <button onClick={handleDeleteItem} className="btn btn-info">Cancel</button>
            </div>
          </div>
        </div>
      );
    }
    if (productAdded) {
      const findProduct = cart.find(item => product.id === item.id);
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
  }
}
