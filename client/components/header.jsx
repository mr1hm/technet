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
    return (
      <div className="header row align-items-center">
        <div className="col-2 headerTitle">
          {this.props.text}
        </div>
        <div className="col-10 shoppingCart d-flex justify-content-end">
          <button className="btn btn-success" onClick={() => this.props.setViewCart('cart', {})}>
            <i className="cartIcon fas fa-shopping-cart"></i>
            <span className="cartBadge badge badge-light">{this.props.cartItemCount}</span>
          </button>
        </div>
      </div>
    );
  }
}
