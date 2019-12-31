import React from 'react';
import ProductListItem from './product-list-item';
import FeaturedCarousel from './featured-carousel';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.imgUrls = [];
    this.getMainImages = this.getMainImages.bind(this);
  }

  componentDidMount() {
    this.getFeaturedProducts();
  }

  getMainImages() {
    const { products } = this.state;
    products.forEach(product => this.imgUrls.push(product.mainImage));
  }

  getFeaturedProducts() {
    fetch(`api/products.php?filter=featured`)
      .then(res => res.json())
      .then(products => {
        this.setState({
          products
        }, this.getMainImages);
      })
      .catch(error => console.error(error));
  }

  render() {
    const { products } = this.state;
    if (products.length === 0) {
      return null;
    }
    return (
      <>
      <FeaturedCarousel setView={this.props.setView} products={products} featuredProducts={this.imgUrls} />
      <div className="container-fluid productListContainer">
        <div className="productList row">
          {this.state.products.map(product =>
            <ProductListItem
              key={product.id}
              productId={product.id}
              productMainImg={product.mainImage}
              productImg={product.images}
              productInfo={product.shortDescription}
              productName={product.name}
              productPrice={product.price}
              setViewPass={this.props.setView} />
          )}
        </div>
      </div>
      </>
    );
  }
}
