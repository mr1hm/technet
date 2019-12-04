import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    return (
      <div className="col-3 productListItems">
        <div className="card cardDiv h-100">
          <img src={`${this.props.productMainImg}`} alt="image" className="cardImage card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{this.props.productName}</h5>
            <p className="productListItem-price">{`$${this.props.productPrice}`}</p>
            <p className="card-text cardShortDesc">{this.props.productInfo}</p>
            <button className="btn productDetailsBtn" onClick={() => this.props.setViewPass('details', { id: this.props.productId })}>
                Product Details
              <i className="fas fa-info-circle ml-1"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
