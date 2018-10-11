import * as React from "react";
import { IImage } from "App/Interfaces";
import { ImageApi } from "App/Api";
import { ImageControl } from "./ImageControl";

interface IState {
  currentImageIndex: number;
  imageBlob: {};
}

interface IProps {
  images: IImage[];
  showSingleImage?: boolean;
  style?: {};
}

export default class ImageGallery extends React.Component<IProps, IState> {
  public readonly state = {
    currentImageIndex: 0,
    imageBlob: ""
  };

  public componentDidMount() {
    const { images } = this.props;
    const { currentImageIndex } = this.state;

    if (!images || images.length < 1) {
      return;
    }

    this.loadImage(currentImageIndex);
  }

  private loadImage = (imageIndex: number) => {
    const { images } = this.props;

    const image = images[imageIndex];

    if (!image || !image.id) {
      return;
    }

    ImageApi.getById(image.id).then(imageBlob => {
      this.setState({
        imageBlob
      });
    });
  };

  private handleNext = () => {
    const { images } = this.props;

    const currentImageIndex =
      (this.state.currentImageIndex + 1) % images.length;

    this.setState({
      currentImageIndex
    });

    this.loadImage(currentImageIndex);
  };

  private handlePrevious = () => {
    const { images } = this.props;

    const currentImageIndex =
      (this.state.currentImageIndex + 1) % images.length;

    this.setState({
      currentImageIndex
    });

    this.loadImage(currentImageIndex);
  };

  render() {
    const { style, images, showSingleImage } = this.props;
    const { imageBlob } = this.state;

    return (
      <div
        style={{
          ...style,
          textAlign: "center",
          position: "relative",
          fontSize: "24px",
          color: "#FFF"
        }}
      >
        <div>
          <img src={imageBlob} style={{ width: "100%" }} />
        </div>
        {images.length > 1 && (
          <ImageControl
            imagesCount={images.length}
            handleNext={this.handleNext}
            handlePrevious={this.handlePrevious}
          />
        )}
      </div>
    );
  }
}
