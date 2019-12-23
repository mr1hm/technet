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
    const body = { computers: 1 };
    const init = { method: 'POST', body: JSON.stringify(body) };
    fetch(`/api/products.php`, init)
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
