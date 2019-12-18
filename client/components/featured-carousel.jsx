import React from 'react';

export default class FeaturedCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
      featuredItemClicked: false
    };
    this.imgUrls = this.props.featuredProducts;
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.handleFeaturedItemClick = this.handleFeaturedItemClick.bind(this);
  }

  handleFeaturedItemClick() {
    this.setState({
      featuredItemClicked: !this.state.featuredItemClicked
    });
  }

  prevSlide() {
    const lastIndex = this.props.products.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

    this.setState({ currentImageIndex: index });
  }

  nextSlide() {
    const lastIndex = this.props.products.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;

    this.setState({ currentImageIndex: index });
  }

  render() {
    const { currentImageIndex } = this.state;
    if (this.props.products.length === 0 || !this.props.featuredProducts) {
      return <div>LOADING...</div>;
    }
    return (
      <div className="container-fluid featured-carousel">
        <div className="row">
          <div className="col-sm d-flex justify-content-center">
            <span className="featured-items-header">Featured Products</span>
          </div>
        </div>
        <div className="container carouselMain">
          <div className="row">
            <ArrowLeft direction="left" clickFunction={this.prevSlide} glyph="&#9664;" />
            <ImageSlide setView={this.props.setView} currentImageIndex={this.state.currentImageIndex} products={this.props.products} handleFeaturedItemClick={this.handleFeaturedItemClick} featuredItemClicked={this.state.featuredItemClicked} url={this.props.products[currentImageIndex].mainImage} />
            <ArrowRight direction="right" clickFunction={this.nextSlide} glyph="&#9654;" />
          </div>
        </div>
      </div>
    );
  }
}

const ArrowLeft = ({ direction, clickFunction, glyph }) => (
  <div onClick={clickFunction} className={`col-sm slide-arrow ${direction}`}>
    {glyph}
  </div>
);

const ArrowRight = ({ direction, clickFunction, glyph }) => (
  <div onClick={clickFunction} className={`col-sm slide-arrow ${direction} d-flex justify-content-end`}>
    {glyph}
  </div>
);

const ImageSlide = ({ setView, currentImageIndex, products, handleFeaturedItemClick, featuredItemClicked, url }) => {
  const styles = {
    backgroundImage: `url("${url}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  };
  if (featuredItemClicked) {
    return (
      <>
        <div onClick={handleFeaturedItemClick} className="col image-slide slideFeaturedDiv" style={styles}></div>
        <div className="col- image-slide-text image-slide-text-show">
          <div className="card cardDiv h-100">
            <div className="card-body cardBody">
              <h5 className="card-title">{products[currentImageIndex].name}</h5>
              <p className="productListItem-price">{`$${products[currentImageIndex].price}`}</p>
              <p className="card-text featured-longDescription">{products[currentImageIndex].longDescription}</p>
              <ul className="row carouselSpecs">
                {products[currentImageIndex].specs.map((spec, index) => {
                  return (
                    <li key={index} className="col-6">{`•${spec}`}</li>
                  );
                })}
              </ul>
              <button className="btn productDetailsBtn" onClick={() => setView('details', { id: products[currentImageIndex].id })}>
                  Product Details
                <i className="fas fa-info-circle ml-1"></i>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
    <div onClick={handleFeaturedItemClick} className="col image-slide" style={ styles }></div>
    <div className="col image-slide-text image-slide-text-hide">
      <div className="card cardDiv h-100">
        <div className="card-body cardBody">
          <h5 className="card-title">{products[currentImageIndex].name}</h5>
          <p className="productListItem-price">{`$${products[currentImageIndex].price}`}</p>
          <p className="card-text carouselDesc carouselDesc-show">{products[currentImageIndex].longDescription}</p>
          <button className="btn productDetailsBtn" onClick={() => setView('details', { id: products[currentImageIndex].id })}>
              Product Details
            <i className="fas fa-info-circle ml-1"></i>
          </button>
        </div>
      </div>
    </div>
    </>
  );
};
