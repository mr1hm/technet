import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItemCount: null
    };
    this.stopPropagation = this.stopPropagation.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { cartItemCount } = this.props;
    if (prevProps.cartItemCount !== this.props.cartItemCount) this.setState({ cartItemCount });
  }

  stopPropagation(e) {
    e.stopPropagation();
    this.props.setViewCart('cart', {});
  }

  render() {
    const { text, setViewCart, cartItemCount } = this.props;
    return (
      <div className="container-fluid header-container">
        <div onClick={() => setViewCart('catalog', {})} className="header row align-items-center">
          <div className="col-2 headerTitle">
            {text}
          </div>
          <div className="col-10 shoppingCart d-flex justify-content-end">
            <button className="btn btn-success cartBtn" onClick={e => this.stopPropagation(e)}>
              <i className="cartIcon fas fa-shopping-cart"></i>
              <span className="cartBadge badge badge-light">{cartItemCount}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
