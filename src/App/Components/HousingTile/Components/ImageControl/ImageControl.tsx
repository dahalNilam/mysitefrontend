import * as React from "react";
import { Icon } from "react-fa";

interface IProps {
  imagesCount: number;
  handleNext?: () => void;
  handlePrevious?: () => void;
}

const btnStyle = {
  cursor: "pointer",
  position: "absolute",
  width: "20%",
  padding: "5px",
  height: "100%",
  top: "0px",
  vertialAlign: "center"
} as React.CSSProperties;

const iconStyle = {
  position: "absolute",
  top: "calc(50% - 10px)"
} as React.CSSProperties;

export default class ImageControl extends React.Component<IProps> {
  public readonly state = {
    currentImageIndex: 0,
    imageBlob: ""
  };

  private handleNext = (event: React.MouseEvent) => {
    event.stopPropagation();

    const { handleNext } = this.props;

    if (handleNext) {
      handleNext();
    }
  };

  private handlePrevious = (event: React.MouseEvent) => {
    event.stopPropagation();

    const { handlePrevious } = this.props;

    if (handlePrevious) {
      handlePrevious();
    }
  };

  render() {
    const { imagesCount } = this.props;

    if (imagesCount <= 1) {
      return "";
    }

    return (
      <>
        <div style={{ ...btnStyle, left: 0 }} onClick={this.handlePrevious}>
          <Icon name="backward" style={{ ...iconStyle }} />
        </div>
        <div style={{ ...btnStyle, right: 0 }} onClick={this.handleNext}>
          <Icon name="forward" style={{ ...iconStyle }} />
        </div>
      </>
    );
  }
}
