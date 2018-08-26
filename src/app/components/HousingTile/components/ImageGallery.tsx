import * as React from 'react';
import { Icon } from 'react-fa';
import { Button } from 'reactstrap';
import { IImage } from '../../../Interfaces';
import { ImageApi } from '../../../Api';

interface IState {
    currentImageIndex: number;
    imageBlob: {};
}

interface IProps {
    images: IImage[];
    style?: {}
}

export default class ImageGallery extends React.Component<IProps, IState> {
    public readonly state = {
        currentImageIndex: 0,
        imageBlob: "",
    }

    public componentDidMount() {
        const { images } = this.props;
        const { currentImageIndex } = this.state;

        if (!images || images.length < 1) {
            return;
        }

        this.loadImage(currentImageIndex)
    }

    private loadImage = (imageIndex: number) => {
        const { images } = this.props;

        const image = images[imageIndex];

        if (!image || !image.id) {
            return;
        }

        ImageApi.getById(image.id).then((imageBlob) => {
            this.setState({
                imageBlob
            })
        });
    }

    private handleNext = () => {
        const { images } = this.props;

        const currentImageIndex = (this.state.currentImageIndex + 1) % images.length;

        this.setState({
            currentImageIndex,
        });

        this.loadImage(currentImageIndex);
    }

    private handlePrevious = () => {
        const { images } = this.props;

        const currentImageIndex = (this.state.currentImageIndex + 1) % images.length;

        this.setState({
            currentImageIndex,
        });

        this.loadImage(currentImageIndex);
    }

    render() {
        const { style, images } = this.props;
        const { imageBlob } = this.state;

        return (
            <div style={{ ...style, textAlign: "center" }}>
                <img src={imageBlob} style={{ width: "100%", maxHeight: 180 }} />

                {images.length > 1 &&
                    <>
                        < div style={{ float: "left", width: "50%", marginTop: 5 }}>
                            <Button style={{ width: "90%" }} onClick={this.handlePrevious}>
                                <Icon name="backward" />
                            </Button>
                        </div>

                        <div style={{ float: "right", width: "50%", marginTop: 5 }}>
                            <Button style={{ width: "90%" }} onClick={this.handleNext}>
                                <Icon name="forward" />
                            </Button>
                        </div>
                    </>
                }
            </div >
        );
    }
}