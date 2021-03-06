import React from 'react';

export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
      selectedCategory: null
    };
  }

  render() {
    return (
      <div className="container-fluid categoriesContainer">
        <div className="row">
          <div className="col-3 d-flex justify-content-center">
            <a onClick={() => this.props.setViewCategory('computers', {})} className="categoriesSections">
              DESKTOPS
            </a>
          </div>
          <div className="col-3 d-flex justify-content-center">
            <a className="categoriesSections" onClick={() => this.props.setViewCategory('hardware', {})}>
              HARDWARE
            </a>
          </div>
          <div className="col-3 d-flex justify-content-center">
            <a className="categoriesSections" onClick={() => this.props.setViewCategory('accessories', {})}>
              ACCESSORIES
            </a>
          </div>
          <div className="col-3 d-flex justify-content-center">
            <a className="categoriesSections" onClick={() => this.props.setViewCategory('misc', {})}>
              MISC
            </a>
          </div>
        </div>
      </div>
    );
  }
}
