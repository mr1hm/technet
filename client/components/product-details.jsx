import React from 'react';
import ConfirmationModal from './confirmation-modal';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      productAdded: false
    };
    this.handleAddProductClick = this.handleAddProductClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.productAdded) setTimeout(() => { this.setState({ productAdded: false }); }, 3000);
  }

  componentDidMount() {
    fetch(`/api/products.php?id=${this.props.productId}&filter=${this.props.category}`)
      .then(response => response.json())
      .then(product => {
        this.setState({ product });
      })
      .catch(error => console.error(error));
  }

  handleAddProductClick() {
    const { product, productAdded } = this.state;
    this.setState({ productAdded: !productAdded });
    if (product) this.props.addToCart(this.state.product);
  }

  render() {
    const { product, productAdded } = this.state;
    if (this.state.product === null) {
      return (
        <h1>LOADING</h1>
      );
    }
    return (
      <>
      {this.state.productAdded ? <ConfirmationModal cart={this.props.cart} productAdded={productAdded} product={product} /> : null}
      <div className="container detailsMain">
        <article className="row single-post mt-5 no-gutters">
          <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <button className="btn btn-warning mt-3 ml-3 backToListBtn" onClick={() => this.props.setView('catalog', {})}>Back to Catalog</button>
          </div>
          <div className="image-wrapper p-3">
            <img src={this.state.product.mainImage} className="productDetailsImg" alt="product"></img>
          </div>
          <div className="col col-xs col-sm col-md single-post-content-wrapper p-3">
            <h1 className="detailsProductTitle">{this.state.product.name}</h1>
            <br />
            <div className="priceTag">
              {`$${this.state.product.price}`}
            </div>
            <button className="btn btn-success details-addToCartBtn" onClick={this.handleAddProductClick}>Add To Cart</button>
            <br /><br />
            <br />
            <div className="shortDescription">
              {this.state.product.shortDescription}
            </div>
            <br /><br />
          </div>
          <div className="row">
            <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 details-longDescription p-3">
              {this.state.product.longDescription}
            </div>
          </div>
          <div className="row productSpecs">
            <ul>
              {!product.specs ? null : product.specs.map((spec, index) => {
                return (
                  <li key={`spec${index}`}>{spec}</li>
                );
              })}
            </ul>
          </div>
        </article>
      </div>
      </>
    );
  }
}

export default ProductDetails;
