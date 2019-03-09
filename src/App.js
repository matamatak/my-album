import React, { Component } from 'react';
import axios from 'axios';
import Lightbox from "react-images";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [],
      lightboxIsOpen: false,
      currentImage: 0
    }
  }
  componentWillMount() {
    axios.get('https://wfc-2019.firebaseapp.com/images?limit=200&offset=')
         .then(res => {
           const images = res.data.data.images.map(image => ({src: image.url, width: 4, height: 3, caption: image.description}));
           this.setState({ images: images });
         });
  }

  handleClick = () => {
    this.setState({ lightboxIsOpen: true });
  };

  closeLightbox = () => {
    this.setState({ lightboxIsOpen: false });
  };

  gotoPrevLightboxImage = () => {
    this.setState((state) => {
      if (state.currentImage <= 0) {
        return { currentImage: state.images.length };
      }
      return { currentImage: state.currentImage - 1 };
    });
  };

  gotoNextLightboxImage = () => {
    this.setState((state) => {
      if (state.currentImage >= state.images.length) {
        return { currentImage: 0 };
      }
      return { currentImage: state.currentImage + 1 };
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Open lightbox</button>
        <Lightbox
          images={this.state.images}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevLightboxImage}
          onClickNext={this.gotoNextLightboxImage}
          onClose={this.closeLightbox}
          backdropClosesModal
        />
      </div>
    );
  }
}

export default App;
