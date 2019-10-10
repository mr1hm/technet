import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch(`api/products.php?id=${this.props.productObj}`)
      .then(response => response.json())
      .then(productData => this.setState({
        product: productData
      }));
  }

  render() {
    if (this.state.product === null) {
      return (
        <h1>LOADING</h1>
      );
    }
    return (
      <div className="container detailsMain">
        <article className="row single-post mt-5 no-gutters">
          <div className="col-12">
            <button className="btn btn-warning mt-3 ml-3" onClick={() => this.props.setView('catalog', {})}>Back to Catalog</button>
          </div>
          <div className="image-wrapper p-3">
            <img src={this.state.product[0].images[0]} className="productDetailsImg" alt="product"></img>
          </div>
          <div className="col single-post-content-wrapper p-3">
            <h1>{this.state.product[0].name}</h1>
            <br />
            <div className="priceTag">
              {`$${this.state.product[0].price}`}
            </div>
            <br />
            <div className="shortDescription">
              {this.state.product[0].shortDescription}
            </div>
            <br /><br />
            <button className="btn btn-success" onClick={() => this.props.addToCart(this.state.product)}>Add To Cart</button>
            <br /><br /><br />
          </div>
          <div className="row">
            <div className="col-12 longDescription p-3">
              {this.state.product[0].longDescription}
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default ProductDetails;
