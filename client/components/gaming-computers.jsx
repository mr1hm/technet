import React from 'react';
import ProductListItem from './product-list-item';

export default class GamingComputers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      computers: null
    };
  }

  componentDidMount() {
    this.getComputerProducts();
  }

  getComputerProducts() {
    fetch(`/api/products.php?filter=computers`)
      .then(response => response.json())
      .then(computers => {
        this.setState({
          computers
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    const { computers } = this.state;
    if (computers === null) {
      return <div>LOADING...</div>;
    }
    return (
      <div className="productList row">
        {this.state.computers.map(product =>
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
