import React from 'react';
import ProductListItem from './product-list-item';

export default class Hardware extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hardware: null
    };
  }

  componentDidMount() {
    this.getHardwareProducts();
  }

  getHardwareProducts() {
    fetch(`/api/products.php?filter=hardware`)
      .then(response => response.json())
      .then(hardware => {
        this.setState({ hardware });
      })
      .catch(error => console.error(error));
  }

  render() {
    const { hardware } = this.state;
    if (hardware === null) {
      return null;
    }
    return (
      <div className="productList row">
        {hardware.map(product =>
          <ProductListItem
            key={product.id}
            productId={product.id}
            productMainImg={product.mainImage}
            productImg={product.images}
            productInfo={product.shortDescription}
            productName={product.name}
            productPrice={product.price}
            setViewPass={this.props.setViewPass} />
        )}
      </div>
    );
  }
}
