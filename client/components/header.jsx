import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItemCount: null
    };
  }
  componentDidUpdate(prevProps) {
    const { cartItemCount } = this.props;
    if (prevProps.cartItemCount !== this.props.cartItemCount) this.setState({ cartItemCount });
  }

  render() {
    const { text, setViewCart, cartItemCount } = this.props;
    return (
      <div className="header row align-items-center">
        <div className="col-2 headerTitle">
          <a className="headerTitle" onClick={() => setViewCart('catalog', {})} href="#">{text}</a>
        </div>
        <div className="col-10 shoppingCart d-flex justify-content-end">
          <button className="btn btn-success" onClick={() => setViewCart('cart', {})}>
            <i className="cartIcon fas fa-shopping-cart"></i>
            <span className="cartBadge badge badge-light">{cartItemCount}</span>
          </button>
        </div>
        {/* <div className="col-12 d-flex align-items-center header-subTitle">
          {currentView === 'catalog' ? null : <a onClick={() => setViewCart('catalog', {})} href="#">Home</a>}
        </div> */}
      </div>
    );
  }
}
