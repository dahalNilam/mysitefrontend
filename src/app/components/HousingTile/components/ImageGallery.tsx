import * as React from 'react';
import { Icon } from 'react-fa';
import { IImage } from '../../../interfaces';
import { ImageApi } from '../../../api';

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

        const image = images[currentImageIndex];

        if (!image || !image.id) {
            return;
        }

        ImageApi.getById(image.id).then((imageBlob) => {
            this.setState({
                imageBlob
            })
        });
    }

    render() {
        const { style } = this.props;
        const { imageBlob } = this.state;

        return (
            <div style={{ ...style, textAlign: "center" }}>
                <img src={imageBlob} style={{ width: "100%" }} />
                <Icon name="backward" style={{ float: "left" }} />
                <Icon name="forward" style={{ float: "right" }} />
            </div>
        );
    }
}