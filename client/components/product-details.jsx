import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch(`/api/products.php?id=${this.props.productId}`)
      .then(response => response.json())
      .then(product => {
        this.setState({
          product
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    const { product } = this.state;
    if (this.state.product === null) {
      return (
        <h1>LOADING</h1>
      );
    }
    return (
      <div className="container detailsMain">
        <article className="row single-post mt-5 no-gutters">
          <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <button className="btn btn-warning mt-3 ml-3 backToListBtn" onClick={() => this.props.setView('catalog', {})}>Back to Catalog</button>
          </div>
          <div className="image-wrapper p-3">
            <img src={this.state.product.mainImage} className="productDetailsImg" alt="product"></img>
          </div>
          <div className="col col-xs col-sm col-md single-post-content-wrapper p-3">
            <h1>{this.state.product.name}</h1>
            <br />
            <div className="priceTag">
              {`$${this.state.product.price}`}
            </div>
            <button className="btn btn-success details-addToCartBtn" onClick={() => this.props.addToCart(this.state.product)}>Add To Cart</button>
            <br /><br />
            <br />
            <div className="shortDescription">
              {this.state.product.shortDescription}
            </div>
            <br /><br />
          </div>
          <div className="row">
            <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 longDescription p-3">
              {this.state.product.longDescription}
            </div>
          </div>
          <div className="row productSpecs">
            <ul>
              {product.specs.map((spec, index) => {
                return (
                  <li key={`spec${index}`}>{spec}</li>
                );
              })}
            </ul>
          </div>
        </article>
      </div>
    );
  }
}

export default ProductDetails;
