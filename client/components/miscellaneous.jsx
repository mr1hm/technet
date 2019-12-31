import React from 'react';
import ProductListItem from './product-list-item';

export default class Misc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      misc: null
    };
  }

  componentDidMount() {
    this.getMiscProducts();
  }

  getMiscProducts() {
    fetch(`/api/products.php?filter=misc`)
      .then(response => response.json())
      .then(misc => {
        this.setState({ misc });
      })
      .catch(error => console.error(error));
  }

  render() {
    const { misc } = this.state;
    if (!misc) return <div>LOADING...</div>;
    return (
      <div className="productList row">
        {misc.map(product =>
          <ProductListItem
            key={product.id}
            productId={product.id}
            productMainImg={product.mainImage}
            productImg={product.images}
            productInfo={product.shortDescription}
            productName={product.name}
            productPrice={product.price}
            setViewPass={this.props.setViewPass}
            category={product.category} />
        )}
      </div>
    );
  }
}
