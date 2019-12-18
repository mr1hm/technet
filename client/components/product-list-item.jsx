import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    return (
      <div className="col-xl-3 col-lg-4 col-12 productListItems">
        <div className="card cardDiv h-100">
          <div className="row no-gutters">
            <div className="col-4 h-100">
              <img src={`${this.props.productMainImg}`} alt="image" className="cardImage card-img-top" />
            </div>
            <div className="col-8">
              <div className="card-body productCardBody">
                <h5 className="card-title productCardTitle">{this.props.productName}</h5>
                <p className="productListItem-price">{`$${this.props.productPrice}`}</p>
                <p className="card-text cardShortDesc">{this.props.productInfo}</p>
                <button className="btn productDetailsBtn" onClick={() => this.props.setViewPass('details', { id: this.props.productId })}>
                  Product Details
                  <i className="fas fa-info-circle ml-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
