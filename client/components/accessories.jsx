import React from 'react';
import ProductListItem from './product-list-item';

export default class Accessories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessories: null
    };
  }

  componentDidMount() {
    this.getAccessories();
  }

  getAccessories() {
    // const body = { accessories: 1 };
    // const init = { method: 'POST', body: JSON.stringify(body) };
    fetch(`/api/products.php?filter=accessories`)
      .then(r => r.json())
      .then(accessories => {
        this.setState({ accessories });
      })
      .catch(e => console.error(e));
  }

  render() {
    const { accessories } = this.state;
    if (!accessories) return <div>LOADING...</div>;
    return (
      <div className="productList row">
        {accessories.map(product =>
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
