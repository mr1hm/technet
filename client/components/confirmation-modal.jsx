import React from 'react';

export default class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedProduct: false
    };
  }

  handleSubmit(userInfo) {
    this.props.placeOrder(userInfo);
  }

  render() {
    const { userInfo, handleOrder, checkout, deleteFromCart, handleDeleteItem, cartProduct, product, productAdded, cart, deleteItem } = this.props;
    if (checkout) {
      return (
        <div className="container mt-3 mb-3 checkout-confirmation-modal">
          <div className="row">
            <div className="col mt-1">
              <h4 className="checkout-font" style={{ fontStyle: 'italic', letterSpacing: '0.5px' }}>THANK YOU FOR USING THIS DEMO!</h4>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p className="checkout-font">
                This website was created with the intent of demonstrating an example e-commerce website. It&#39;s in no way affiliated with any other e-commerce websites
                that may use a similar or same name.
                <br/><br/>
                Please click <span style={{ fontWeight: 600, textDecoration: 'underline' }}>confirm</span> to &quot;place&quot; your order and be redirected to the home page, or
                click <span style={{ fontWeight: 600, textDecoration: 'underline' }}>cancel</span> to maintain the items in your cart and stay on this page.
                <br/><br/>
                Your information will not be saved and there will be no charge whatsoever to any credit card number that you inputted into the Card Information field.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col mt-2">
              <button onClick={() => this.handleSubmit(userInfo)} className="btn btn-success">Confirm</button>
            </div>
            <div className="col mt-2 d-flex justify-content-end">
              <button onClick={handleOrder} className="btn btn-info">Cancel</button>
            </div>
          </div>
        </div>
      );
    }
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
